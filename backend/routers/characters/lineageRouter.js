import { Router } from 'express'
import { isAdmin, isOwner } from '../../middleware/auth.js'
import db from '../../db/connection.js'

const router = Router()

router.get('/api/lineage', async (req, res) => {
    try {
        const result = await db.query(`
      SELECT lineage.id, lineage.name, lineage.description, lineage.defining_features, lineage.required_race_id, 
      lineage.is_custom,

        json_build_object(
          'id', race.id,
          'name', race.name
        ) AS required_race

      FROM lineage
      LEFT JOIN race ON lineage.required_race_id  = race.id
    `);



        const baseLineages = result.rows

        async function getLineageBonuses(id) {
            const result = await db.query(`
            SELECT ccb.characteristic_id, c.name AS characteristic_name, ccb.bonus, ccb.is_custom
            FROM lineage_characteristic_bonus ccb
            JOIN characteristic c ON ccb.characteristic_id = c.id
            WHERE ccb.lineage_id = $1
        `, [id]);
            return result.rows;
        };

        async function getLineageAptitudes(id) {
            const result = await db.query(`
            SELECT la.aptitude_id, a.name AS aptitude_name
            FROM lineage_aptitude la
            JOIN aptitude a ON la.aptitude_id = a.id
            WHERE la.lineage_id = $1
        `, [id]);
            return result.rows;
        };


        const lineages = await Promise.all(baseLineages.map(async lineage => {
            const bonuses = await getLineageBonuses(lineage.id);
            const aptitudes = await getLineageAptitudes(lineage.id);
            return { ...lineage, bonuses, aptitudes };
        }));

        return res.status(200).send(lineages)
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.post('/api/lineage', async (req, res) => {
    try {
        const { name, description, defining_features, required_race, bonuses, aptitudes} = req.body

        if (!name) {
            return res.status(400).send({ message: 'missing fields' })
        }

        const is_custom = req.session.user?.role === 'ADMIN'

        const result = await db.query(
            `INSERT INTO lineage ("name", description, defining_features, required_race_id, is_custom) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, description, defining_features, required_race.id, is_custom]
        )
        const createdLineage = result.rows[0];

        for (const bonus of bonuses) {
            await db.query('INSERT INTO lineage_characteristic_bonus (lineage_id, characteristic_id, bonus, is_custom) VALUES ($1, $2, $3, $4)',
                [id, bonus.characteristic_id, bonus.bonus, is_custom])
        }

        for (const apptitude of aptitudes) {
            await db.query('INSERT INTO lineage_aptitude (lineage_id, aptitude_id) VALUES ($1, $2)',
                [id, apptitude.aptitude_id])
        }
        return res.status(201).send({ message: 'lineage created sucessfully', created: createdLineage })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.put('/api/lineage/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, description, defining_features, required_race, bonuses, aptitudes, is_custom} = req.body

        await db.query(`UPDATE lineage SET name = $1, description =$2, defining_features = $3, required_race_id=$4
                        WHERE id = $5`,
            [name, description, defining_features, required_race.id, id])


        await db.query('DELETE FROM lineage_characteristic_bonus WHERE lineage_id = $1', [id])

        await db.query('DELETE FROM lineage_aptitude WHERE lineage_id = $1', [id])


        for (const bonus of bonuses) {
            await db.query('INSERT INTO lineage_characteristic_bonus (lineage_id, characteristic_id, bonus, is_custom) VALUES ($1, $2, $3, $4)',
                [id, bonus.characteristic_id, bonus.bonus, is_custom])
        }

        for (const apptitude of aptitudes) {
            await db.query('INSERT INTO lineage_aptitude (lineage_id, aptitude_id) VALUES ($1, $2)',
                [id, apptitude.aptitude_id])
        }

        return res.status(200).send({ message: 'armor updated' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.delete('/api/lineage/:id', async (req, res) => {
    try {
        const { id } = req.params
        console.log('skillid?', id)

        await db.query('DELETE FROM lineage_characteristic_bonus WHERE lineage_id = $1', [id])

        await db.query('DELETE FROM lineage_aptitude WHERE lineage_id = $1', [id])

        await db.query('DELETE FROM lineage where id = $1 ', [id])

        return res.status(200).send({ message: 'armor deleted' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

export default router

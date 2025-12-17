import { Router } from 'express'
import { isAdmin, isOwner } from '../../middleware/auth.js'
import db from '../../db/connection.js'

const router = Router()

router.get('/api/race', async (req, res) => {
    try {
        const result = await db.query(`
            SELECT race.id, race.name, race.description, race.wounds, race.is_custom,

            json_build_object(
                'id', base_statline.id,
                'name', base_statline.name,
                'weapon_skill', base_statline.weapon_skill,
                'ballistic_skill', base_statline.ballistic_skill,
                'strength', base_statline.strength,
                'toughness', base_statline.toughness,
                'agility', base_statline.agility,
                'intelligence', base_statline.intelligence,
                'perception', base_statline.perception,
                'willpower', base_statline.willpower,
                'fellowship', base_statline.fellowship,
                'is_custom', base_statline.is_custom
            ) AS base_statline,

            json_build_object(
                'id', max_statline.id,
                'name', max_statline.name,
                'weapon_skill', max_statline.weapon_skill,
                'ballistic_skill', max_statline.ballistic_skill,
                'strength', max_statline.strength,
                'toughness', max_statline.toughness,
                'agility', max_statline.agility,
                'intelligence', max_statline.intelligence,
                'perception', max_statline.perception,
                'willpower', max_statline.willpower,
                'fellowship', max_statline.fellowship,
                'is_custom', max_statline.is_custom
            ) AS max_statline,

            json_build_object(
                'id', size.id,
                'name', size.name,
                'score', size.score
            ) AS size

            FROM race
            LEFT JOIN statline_race AS base_statline
            ON race.base_statline_id = base_statline.id
            LEFT JOIN statline_race AS max_statline
            ON race.max_statline_id = max_statline.id
            LEFT JOIN size
            ON race.size_id = size.id;
        `);



        const races = result.rows

        return res.status(200).send(races)
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.post('/api/race', async (req, res) => {
    try {
        const { name, description, defining_features, required_race, bonuses, aptitudes } = req.body

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
        const { name, description, defining_features, required_race, bonuses, aptitudes, is_custom } = req.body

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

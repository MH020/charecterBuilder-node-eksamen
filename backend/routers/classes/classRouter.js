import Router from 'express'
import { isAdmin, isOwner } from '../../middleware/auth.js'
import db from '../../db/connection.js'
const router = Router()

router.get('/api/classes', async (req, res) => {
    try {
        const result = await db.query(`
            SELECT c.id, c.name, c.description,
            json_build_object(
                'id', p.id,
                'name', p.name
            ) AS parent
            FROM "class" c
            LEFT JOIN "class" p ON c.parent_id = p.id;
        `);
        const classes = result.rows

        return res.status(200).send(classes)
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})


router.get('/api/classes/:id', async (req, res) => {
    try {
        const { id } = req.params

        const result = await db.query(`
        SELECT * FROM "class" WHERE id = $1
        `, [id])


        const classes = result.rows[0]



        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Class not found' })
        }

        return res.status(200).send(classes)
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})


router.get('/api/classes/:id/full', async (req, res) => {
    try {
        const { id } = req.params

        const classResult = await db.query(`
        SELECT * FROM "class" WHERE id = $1
        `, [id])


        const powerRows = await db.query(`
            SELECT cp.id, cp.class_id, cp.level,
                json_build_object(
                    'id', p.id,
                    'name', p.name,
                    'description', p.description,
                    'ascendant', p.ascendant,
                    'duration', p.duration,
                    'actions', p.actions,
                    'concentration', p.concentration,
                    'dc', p.dc,
                    'range', p.range,
                    'shape', p.shape
                ) AS power,
                (
                    SELECT json_agg(
                        json_build_object(
                            'id', pp.id,
                            'name', pp.name
                        )
                    )
                    FROM prerequisite_powers pr
                    LEFT JOIN power pp ON pr.prerequisite_powers_id = pp.id
                    WHERE pr.power_id = cp.power_id
                ) AS prerequisite_powers

            FROM class_powers cp
            LEFT JOIN power p ON cp.power_id = p.id
            WHERE cp.class_id = $1
            ORDER BY cp.level;
        `, [id]);


        const traitRows = await db.query(`
            SELECT
                ct.id,
                ct.class_id,
                ct.level,
                json_build_object(
                    'id', t.id,
                    'name', t.name,
                    'description', t.description,
                    'has_input', t.has_input,
                    'category', t.category
                ) AS trait
            FROM class_traits ct
            LEFT JOIN trait t ON ct.trait_id = t.id
            WHERE ct.class_id = $1
            ORDER BY ct.level;
        `, [id]);



        const aptitudesRows = await db.query(`
            SELECT
                ca.id,
                ca.class_id,
                json_build_object(
                    'id', a.id,
                    'name', a.name
                ) AS aptitude
            FROM class_aptitudes ca
            LEFT JOIN aptitude a ON ca.aptitude_id = a.id
            WHERE ca.class_id = $1
            ORDER BY ca.id;
        `, [id]);

        const talentsRows = await db.query(`
            SELECT
                ct.id,
                ct.class_id,
                ct.level,
                json_build_object(
                    'id', t.id,
                    'name', t.name,
                    'description', t.description,
                    'asi', t.asi
                ) AS talent
            FROM class_talents ct
            LEFT JOIN talent t ON ct.talent_id = t.id
            WHERE ct.class_id = $1
            ORDER BY ct.level;
        `, [id]);


    const weaponTrainingRows = await db.query(`
        SELECT 
            cwt.id,
            cwt.class_id,
            json_build_object(
                'id', t.id,
                'name', t.name,
                'description', t.description
            ) AS talent
        FROM class_weapon_training cwt
        LEFT JOIN talent t ON cwt.talent_id = t.id
        WHERE cwt.class_id = $1
        ORDER BY cwt.id;
    `, [id]);


        const weaponClassRows = await db.query(`
            SELECT 
                cwc.id, cwc.class_id,
                json_build_object(
                    'id', wc.id,
                    'name', wc.name,
                    'description', wc.description
                ) AS weapon_class
            FROM class_weapon_class cwc
            LEFT JOIN weapon_class wc ON cwc.weapon_class_id = wc.id
            WHERE cwc.class_id = $1
            ORDER BY cwc.id;
        `, [id]);


        const bonusesRows = await db.query(`
            SELECT 
                cb.id,
                cb.class_id,
                cb.bonus,
                json_build_object(
                    'id', ch.id,
                    'name', ch.name,
                    'description', ch.description
                ) AS characteristic
            FROM class_bonuses cb
            LEFT JOIN characteristic ch ON cb.characteristic_id = ch.id
            WHERE cb.class_id = $1
            ORDER BY cb.id;
        `, [id]);


        const powersKnownResult = await db.query(`
        SELECT * FROM class_powers_known where (class_id = $1) 
        ORDER BY class_powers_known.level
        `, [id]);


        const fullClass = {
            ...classResult.rows[0],
            powers: powerRows.rows,
            powers_known: powersKnownResult.rows,
            traits: traitRows.rows,
            aptitudes: aptitudesRows.rows,
            talents: talentsRows.rows,
            weapon_trainings: weaponTrainingRows.rows,
            weapon_classes: weaponClassRows.rows,
            bonuses: bonusesRows.rows,
        };

        if (classResult.rows.length === 0) {
            return res.status(404).json({ message: 'Class not found' })
        }

        return res.status(200).send(fullClass)
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.post('/api/classes', async (req, res) => {
    try {
        const { name, description, parent_id } = req.body

        if (!name || !description) {
            return res.status(400).send({ message: 'missing fields' })
        }


        const result = await db.query(
            `INSERT INTO "class" (name, description, parent_id)
            VALUES ($1,$2,$3) RETURNING *`,

            [name, description, parent_id]
        )
        const createdClass = result.rows[0]

        return res.status(201).send({ message: 'Trait created sucessfully', created: createdClass })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.put('/api/classes/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, description, parent_id } = req.body

        await db.query(`UPDATE "class" SET
                        name = $1, description = $2, parent_id = $3
                        WHERE id = $4`,
            [name, description, parent_id, id]
        )



        return res.status(200).send({ message: 'class updated' })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})
//wait with this one until everything else is set and then delete from all tables
router.delete('/api/classes/:id', async (req, res) => {
    try {
        const { id } = req.params

        await db.query('DELETE FROM trait where id = $1 ', [id])

        return res.status(200).send({ message: 'trait race deleted' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

export default router
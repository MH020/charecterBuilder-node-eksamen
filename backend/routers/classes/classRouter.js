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
        LEFT JOIN "class" c ON c.parent_id = p.id;
        `)
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


        const PowerResult = await db.query(`
            SELECT json_agg(
                json_build_object(
                    'id', cp.id,
                    'class_id', cp.class_id,
                    'level', cp.level,
                    'power', json_build_object(
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
                    ),
                    'prerequisite_powers', (
                        SELECT json_agg(
                            json_build_object(
                                'id', pp.id,
                                'name', pp.name
                            )
                        )
                        FROM prerequisite_powers pr
                        LEFT JOIN power pp ON pr.prerequisite_powers_id = pp.id
                        WHERE pr.power_id = cp.power_id
                    )
                )
                ORDER BY cp.level
            ) AS powers
            FROM class_powers cp
            LEFT JOIN power p ON cp.power_id = p.id
            WHERE cp.class_id = $1;
    `, [id]);


        const traitResult = await db.query(`
        SELECT json_agg(
            json_build_object(
                'id', ct.id,
                'class_id', ct.class_id,
                'level', ct.level,
                'trait', json_build_object(
                    'id', t.id,
                    'name', t.name,
                    'description', t.description,
                    'has_input', t.has_input,
                    'category', t.category
                )
            )
            ORDER BY ct.level
        ) AS traits
        FROM class_traits ct
        LEFT JOIN trait t ON ct.trait_id = t.id
        WHERE ct.class_id = $1;
        `, [id]);


        const aptitudesResult = await db.query(`
        SELECT json_agg(
            json_build_object(
                'id', ca.id,
                'class_id', ca.class_id,
                'aptitude', json_build_object(
                    'id', t.id,
                    'name', t.name
                )
            )
            ORDER BY ca.id
        ) AS aptitudes
        FROM class_apptitudes ca
        LEFT JOIN trait t ON ca.trait_id = t.id
        WHERE ca.class_id = $1;
        `, [id]);

        const talentsResult = await db.query(`
        SELECT json_agg(
            json_build_object(
                'id', ct.id,
                'class_id', ct.class_id,
                'level', ct.level,
                'talent', json_build_object(
                    'id', t.id,
                    'name', t.name,
                    'description', t.description,
                    'asi', t.asi
                )
            )
            ORDER BY ct.level
        ) AS talents
        FROM class_talents ct
        LEFT JOIN talent t ON ct.talent_id = t.id
        WHERE ct.class_id = $1;
        `, [id]);


        const weaponTrainingResult = await db.query(`
        SELECT json_agg(
            json_build_object(
                'id', cwt.id,
                'class_id', cwt.class_id,
                'talent', json_build_object(
                    'id', t.id,
                    'name', t.name,
                    'description', t.description
                )
            )
            ORDER BY cwt.id
        ) AS weapon_trainings
        FROM class_weapon_training cwt
        LEFT JOIN talent t ON cwt.talent_id = t.id
        WHERE cwt.class_id = $1;
        `, [id]);


        const weaponClassResult = await db.query(`
        SELECT json_agg(
            json_build_object(
                'id', cwc.id,
                'class_id', cwc.class_id,
                'weapon_class', json_build_object(
                    'id', wc.id,
                    'name', wc.name,
                    'description', wc.description
                )
            )
            ORDER BY cwc.id
        ) AS weapon_classes
        FROM class_weapon_class cwc
        LEFT JOIN weapon_class wc ON cwc.weapon_class = wc.id
        WHERE cwc.class_id = $1;
        `, [id]);


        const bonusesResult = await db.query(`
        SELECT json_agg(
            json_build_object(
                'id', cb.id,
                'class_id', cb.class_id,
                'bonus', cb.bonus,
                'characteristic', json_build_object(
                    'id', ch.id,
                    'name', ch.name,
                    'description', ch.description
                )
            )
            ORDER BY cb.id
        ) AS bonuses
        FROM class_bonuses cb
        LEFT JOIN characteristic ch ON cb.characteristic_id = ch.id
        WHERE cb.class_id = $1;
        `, [id]);


        const fullClass = {
            ...classResult.rows[0],
            powers: PowerResult.rows[0],
            traits: traitResult.rows[0],
            aptitudes: aptitudesResult.rows[0],
            talents: talentsResult.rows[0],
            weapon_trainings: weaponTrainingResult.rows[0],
            weapon_classes: weaponClassResult.rows[0],
            bonuses: bonusesResult.rows[0],
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
import Router from 'express'
import { isAdmin, isOwner } from '../../middleware/auth.js'
import db from '../../db/connection.js'
const router = Router()

router.get('/api/class/:id/powers', async (req, res) => {
    const { id } = req.params
    try {
        const result = await db.query(`
        SELECT
            cp.id, cp.class_id, cp.power_id, cp.level,

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
            ) AS power

            FROM class_powers cp
            LEFT JOIN power p
            ON p.id = cp.power_id
            WHERE cp.class_id = $1
            ORDER BY cp.level
        `, [id])
        const classPowers = result.rows

        return res.status(200).send(classPowers)
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.post('/api/class/:id/powers', async (req, res) => {
    const { id } = req.params
    try {
        const { level, power } = req.body

        if (!power) {
            return res.status(400).send({ message: 'missing power' })
        }

        const result = await db.query(
            `INSERT INTO power (name, description, ascendant, duration, actions, concentration,
                dc, range, shape
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,

            [power.name, power.description, power.ascendant, power.duration,
            power.actions, power.concentration, power.dc, power.range, power.shape
            ]
        )
        const createdPower = result.rows[0]

        await db.query(`INSERT INTO class_powers (class_id, power_id, level)`,
            [id, createdPower.id, level]
        );

        return res.status(201).send({ message: 'power created sucessfully', created: createdPower })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.put('/api/class/:classID/powers/:powerID', async (req, res) => {
    try {
        const { classID, powerID } = req.params
        const { level, power } = req.body

        await db.query(`UPDATE power SET
                        name = $1, description = $2, ascendant = $3, duration = $4, 
                        actions = $5, concentration = $6, dc = $7, range = $8, shape = $9
                        WHERE id = $10`,

            [power.name, power.description, power.ascendant, power.duration,
            power.actions, power.concentration, power.dc, power.range, power.shape,
            power.id
            ]
        )

        await db.query(
            `UPDATE class_powers
            SET level = $1
            WHERE class_id = $2 AND power_id = $3`,
            [level, classID, powerID]
        )



        return res.status(200).send({ message: 'power updated' })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.delete('/api/class/:classID/powers/:powerID', async (req, res) => {
    try {
        const { classID, powerID } = req.params

        await db.query('DELETE FROM class_powers where class_id = $1 AND power_id = $2', [classID, powerID])

        await db.query('DELETE FROM power where id = $1', [powerID])

        return res.status(200).send({ message: 'power deleted' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

export default router
import Router from 'express'
import { isAdmin, isOwner } from '../../middleware/auth.js'
import db from '../../db/connection.js'
const router = Router()

router.get('/api/traits', async (req, res) => {
    try {
        const result = await db.query(`
        SELECT
            t.id, t.name, t.description, t.has_input, t.is_custom, t.category,

            json_build_object(
                'id', r.id,
                'name', r.name
            ) AS race

            FROM trait t
            LEFT JOIN race r
                ON r.id = t.race_id
        `)
        const traits = result.rows

        return res.status(200).send(traits)
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.post('/api/traits', async (req, res) => {
    try {
        const {
            name, description, has_input, category, race,
        } = req.body

        if (!name) {
            return res.status(400).send({ message: 'missing fields' })
        }

        const allowedCategory = ['nothing', 'disorder', 'malignancy', 'malice', 'blessing'];
        if (!allowedCategory.includes(type)) {
            return res.status(400).send({ message: 'wrong category' });
        }

        const is_custom = req.session.user?.role === 'ADMIN'

        const result = await db.query(
            `INSERT INTO trait (name, description, has_input, race_id, is_custom, category)
            VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,

            [name, description, has_input || false, category, race.id || null, is_custom ]
        )
        const createdTrait = result.rows[0]

        return res.status(201).send({ message: 'Trait created sucessfully', created: createdTrait })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.put('/api/traits/:id', async (req, res) => {
    try {
        const { id } = req.params
        const {
            name, description, has_input, category, race,
        } = req.body

        await db.query(`UPDATE trait SET
                        name = $1, description = $2, has_input = $3, category = $4, race_id = $5
                        WHERE id = $6`,

            [name, description, has_input || false, category, race.id || null, id]
        )



        return res.status(200).send({ message: 'trait updated' })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.delete('/api/traits/:id', async (req, res) => {
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
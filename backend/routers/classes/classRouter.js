import Router from 'express'
import { isAdmin, isOwner } from '../../middleware/auth.js'
import db from '../../db/connection.js'
const router = Router()

router.get('/api/classes', async (req, res) => {
    try {
        const result = await db.query(`
        SELECT * FROM "class"  
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

router.post('/api/classes', async (req, res) => {
    try {
        const { name, description, parent_id } = req.body

        if (!name || !description) {
            return res.status(400).send({ message: 'missing fields' })
        }

        const is_custom = req.session.user?.role === 'ADMIN'

        const result = await db.query(
            `INSERT INTO "class" (name, description, parent_id)
            VALUES ($1,$2,$3) RETURNING *`,

            [name, description, parent_id]
        )
        const createdTrait = result.rows[0]

        return res.status(201).send({ message: 'Trait created sucessfully', created: createdTrait })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.put('/api/classes/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, description, parent_id } = req.body

        await db.query(`UPDATE trait SET
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
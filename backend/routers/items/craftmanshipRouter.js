import { Router } from 'express'
import { isAdmin, isOwner } from '../../middleware/auth.js'
import db from '../../db/connection.js'

const router = Router()

router.get('/api/craftsmanship', async (req, res) => {
    try {
        const result = await db.query(`
      SELECT * from craftsmanship`);
        const items = result.rows
        return res.status(200).send(items)
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.post('/api/craftsmanship', async (req, res) => {
    try {
        const { name, description, hit_modifier, damage_modifier, wt_modifier, ap_modifier, category } = req.body

        if (!name || !category) {

            return res.status(400).send({ message: 'missing fields' })
        }

        const validCategories = ['melee', 'ranged', 'armor'];

        if (!validCategories.includes(category)) {
            return res.status(400).send({ message: 'category must be melee, ranged, or armor' });
        }


        const result = await db.query(
            'INSERT INTO craftsmanship ("name",description, hit_modifier, damage_modifier, wt_modifier, ap_modifier, category) VALUES ($1, $2, $3, $4 ,$5 $6) RETURNING *',
            [name, description, hit_modifier, damage_modifier, wt_modifier, ap_modifier, category]
        )
        const createdcraftmanship = result.rows[0]
        return res.status(201).send({ message: 'craftmanship created sucessfully', created: createdcraftmanship })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.put('/api/craftsmanship/:id', async (req, res) => {
    try {
        const id = req.params.id
        const { name, description, hit_modifier, damage_modifier, wt_modifier, ap_modifier, category } = req.body


        const validCategories = ['melee', 'ranged', 'armor'];

        if (!validCategories.includes(category)) {
            return res.status(400).send({ message: 'category must be melee, ranged, or armor' });
        }

        await db.query(`UPDATE craftsmanship SET name = $1, description = $2, hit_modifier = $3, damage_modifier = $4, 
                        wt_modifier = $5, ap_modifier = $6, category =$7 
                        WHERE id = $8`,
        [name, description, hit_modifier, damage_modifier, wt_modifier, ap_modifier, category, id])

        return res.status(200).send({ message: 'craftmanship updated' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.delete('/api/craftsmanship/:id', async (req, res) => {
    try {
        const { id } = req.params


        await db.query(
            'DELETE FROM craftsmanship where id = $1 ', [id]
        )
        return res.status(200).send({ message: 'craftsmanship deleted' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

export default router

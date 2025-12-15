import { Router } from 'express'
import { isAdmin, isOwner } from '../../middleware/auth.js'
import db from '../../db/connection.js'

const router = Router()

router.get('/api/items', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM item')
    const items = result.rows
    return res.status(200).send(items)
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.post('/api/items', async (req, res) => {
  try {
    const { name, description, category_id } = req.body

    if (!name || !description || !description || !category_id) {
      return res.status(400).send({ message: 'missing fields' })
    }
    const is_custom = req.session.user?.role === 'ADMIN' || false

    const result = await db.query(
      'INSERT INTO aptitude ("name", description, category_id, is_custom) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, category_id, is_custom]
    )
    const createdItem = result.rows[0]
    return res.status(201).send({ message: 'item created sucessfully', created: createdItem })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.put('/api/items/:id', async (req, res) => {
  try {
    const id = req.params.id
    const { name, description, category_id } = req.body

    await db.query('UPDATE item SET name = $1, description =$2, category_id=$3  WHERE id = $4',
      [name, description, category_id, id])

    return res.status(200).send({ message: 'item updated' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

export default router

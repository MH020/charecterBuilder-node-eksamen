import { Router } from 'express'
import { isAdmin, isOwner } from '../../middleware/auth.js'
import db from '../../db/connection.js'

const router = Router()

router.get('/api/category', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM category')
    const categoryies = result.rows
    return res.status(200).send(categoryies)
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.post('/api/category', isOwner, async (req, res) => {
  try {
    const { name, description, category_type } = req.body

    if (!name) {
      return res.status(400).send({ message: 'missing fields' })
    }

    const result = await db.query(
      'INSERT INTO category ("name", description, category_type) VALUES ($1, $2, $3) RETURNING *',
      [name, description, category_type]
    )
    const createdCategory = result.rows[0]
    return res.status(201).send({ message: 'category created sucessfully', created: createdCategory })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.put('/api/category/:id', isOwner, async (req, res) => {
  try {
    const id = req.params.id
    const { name, description, category_type } = req.body

    await db.query('UPDATE category SET name = $1, description =$2, category_type= $3   WHERE id = $4', [name, description, category_type, id])

    return res.status(200).send({ message: 'category updated' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

export default router

import { Router } from 'express'
import { isAdmin, isOwner } from '../../middleware/auth.js'
import db from '../../db/connection.js'

const router = Router()

router.get('/api/items', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT item.id, item.name, item.description, item.is_custom,
        json_build_object(
          'id', category.id,
          'name', category.name
        ) AS category,

        json_build_object(
          'id', availability.id,
          'name', availability.name
        ) AS availability

      FROM item
      LEFT JOIN category ON item.category_id = category.id
      LEFT JOIN availability ON item.availability_id = availability.id
    `)
    const items = result.rows
    return res.status(200).send(items)
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.post('/api/items', isAdmin, async (req, res) => {
  try {
    const { name, description, category, availability } = req.body

    if (!name || !description || !category || !availability) {
      return res.status(400).send({ message: 'missing fields' })
    }
    const is_custom = req.session.user?.role === 'ADMIN'

    console.log('here?')

    const result = await db.query(
      'INSERT INTO item ("name", description, category_id, availability_id, is_custom) VALUES ($1, $2, $3, $4 ,$5) RETURNING *',
      [name, description, category.id, availability.id, is_custom]
    )
    const createdItem = result.rows[0]
    return res.status(201).send({ message: 'item created sucessfully', created: createdItem })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.put('/api/items/:id', isAdmin, async (req, res) => {
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

router.delete('/api/items/:id', isOwner, async (req, res) => {
  try {
    const { id } = req.params

    await db.query(
      'DELETE FROM item where id = $1 ', [id]
    )
    return res.status(200).send({ message: 'weapon class deleted' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

export default router

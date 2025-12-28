import { Router } from 'express'
import { isAdmin, isOwner } from '../../middleware/auth.js'
import db from '../../db/connection.js'

const router = Router()

router.get('/api/power/category', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM powers_category')
    const powersCategoryies = result.rows
    return res.status(200).send(powersCategoryies)
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.post('/api/power/category', async (req, res) => {
  try {
    const { name } = req.body

    if (!name) {
      return res.status(400).send({ message: 'missing fields' })
    }

    const result = await db.query(
      'INSERT INTO powers_category ("name") VALUES ($1) RETURNING *',
      [name]
    )
    const createdCategory = result.rows[0]
    return res.status(201).send({ message: 'power  category created sucessfully', created: createdCategory })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.put('/api/power/category/:id', async (req, res) => {
  try {
    const id = req.params.id
    const { name } = req.body

    await db.query('UPDATE powers_category SET name = $1 WHERE id = $2', [name, id])

    return res.status(200).send({ message: 'powers category updated' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.delete('/api/power/category/:id', async (req, res) => {
  try {
    const { id } = req.params
    console.log('skillid?', id)

    await db.query(
      'DELETE FROM powers_category where id = $1 ', [id]
    )

    return res.status(200).send({ message: 'powers category deleted' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

export default router

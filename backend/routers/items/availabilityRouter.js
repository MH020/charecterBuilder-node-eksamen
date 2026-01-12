import { Router } from 'express'
import { isAdmin, isOwner } from '../../middleware/auth.js'
import db from '../../db/connection.js'

const router = Router()

router.get('/api/availability', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM "availability"')
    const availabilityties = result.rows
    return res.status(200).send(availabilityties)
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.post('/api/availability', isOwner, async (req, res) => {
  try {
    const { name } = req.body

    if (!name) {
      return res.status(400).send({ message: 'missing fields' })
    }

    const result = await db.query(
      'INSERT INTO availability ("name") VALUES ($1) RETURNING *',
      [name]
    )
    const createdAvailability = result.rows[0]
    return res.status(201).send({ message: 'availability created sucessfully', created: createdAvailability })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.put('/api/availability/:id', isOwner, async (req, res) => {
  try {
    const id = req.params.id
    const { name } = req.body

    await db.query('UPDATE availability SET name = $1 WHERE id = $2', [name, id])

    return res.status(200).send({ message: 'availability updated' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.delete('/api/availability/:id', isOwner, async (req, res) => {
  try {
    const { id } = req.params
    console.log('skillid?', id)

    await db.query(
      'DELETE FROM availability where id = $1 ', [id]
    )

    return res.status(200).send({ message: 'availability deleted' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

export default router

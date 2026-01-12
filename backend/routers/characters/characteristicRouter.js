import { Router } from 'express'
import { isAdmin, isOwner } from '../../middleware/auth.js'
import db from '../../db/connection.js'

const router = Router()

router.get('/api/characteristics', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM characteristic')
    const apptitudes = result.rows
    return res.status(200).send(apptitudes)
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.post('/api/characteristics', isOwner, async (req, res) => {
  try {
    const { name, description } = req.body

    if (!name) {
      return res.status(400).send({ message: 'missing fields' })
    }

    const result = await db.query(
      'INSERT INTO characteristic ("name", description) VALUES ($1, $2) RETURNING *',
      [name, description]
    )
    const createdCharacteristic = result.rows[0]
    return res.status(201).send({ message: 'characteristic created sucessfully', created: createdCharacteristic })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.put('/api/characteristics/:id', isOwner, async (req, res) => {
  try {
    const id = req.params.id
    const { name, description } = req.body

    await db.query('UPDATE characteristic SET name = $1, description =$2  WHERE id = $3', [name, description, id])

    return res.status(200).send({ message: 'characteristic updated' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.delete('/api/characteristics/:id', isOwner, async (req, res) => {
  try {
    const { id } = req.params
    console.log('skillid?', id)

    await db.query(
      'DELETE FROM characteristic where id = $1 ', [id]
    )

    return res.status(200).send({ message: 'characteristic deleted' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

export default router

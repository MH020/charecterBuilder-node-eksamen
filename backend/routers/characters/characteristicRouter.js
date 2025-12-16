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

router.post('/api/characteristics', async (req, res) => {
  try {
    const { name, description } = req.body

    if (!name) {
      return res.status(400).send({ message: 'missing fields' })
    }

    const result = await db.query(
      'INSERT INTO characteristic ("name", description) VALUES ($1, $2) RETURNING *',
      [name, description]
    )
    const createdAptitude = result.rows[0]
    return res.status(201).send({ message: 'Aptitude created sucessfully', created: createdAptitude })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.put('/api/aptitudes/:id', async (req, res) => {
  try {
    const id = req.params.id
    const { name } = req.body

    await db.query('UPDATE aptitude SET name = $1 WHERE id = $2', [name, id])

    return res.status(200).send({ message: 'aptitude updated' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.delete('/api/aptitudes/:id', async (req, res) => {
  try {
    const { id } = req.params
    console.log('skillid?', id)

    await db.query(
      'DELETE FROM aptitude where id = $1 ', [id]
    )

    return res.status(200).send({ message: 'aptitude deleted' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

export default router

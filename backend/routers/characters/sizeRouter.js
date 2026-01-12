import { Router } from 'express'
import { isAdmin, isOwner } from '../../middleware/auth.js'
import db from '../../db/connection.js'

const router = Router()

router.get('/api/sizes', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM size')

    const sizes = result.rows

    return res.status(200).send(sizes)
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.post('/api/sizes', isAdmin, async (req, res) => {
  try {
    const { name, score } = req.body

    if (!name || !score) {
      return res.status(400).send({ message: 'missing fields' })
    }

    const result = await db.query(
      'INSERT INTO size ("name", score) VALUES ($1, $2) RETURNING *',
      [name, score]
    )
    const createdSize = result.rows[0]
    return res.status(201).send({ message: 'size created sucessfully', created: createdSize })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.put('/api/sizes/:id', isAdmin, async (req, res) => {
  try {
    const id = req.params.id
    const { name, score } = req.body

    await db.query('UPDATE size SET name = $1, score = $2 WHERE id = $3', [name, score, id])

    return res.status(200).send({ message: 'size updated' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.delete('/api/sizes/:id', isOwner, async (req, res) => {
  try {
    const { id } = req.params

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

import { Router } from 'express'
import { isAdmin, isOwner } from '../../middleware/auth.js'
import db from '../../db/connection.js'

const router = Router()

router.get('/api/skills', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM skill WHERE is_custom = false')
    const secoundResult = await db.query('SELECT * FROM aptitude')

    const skills = result.rows
    const aptitudes = secoundResult.rows
    skills.forEach(skill => {
      skill.main_aptitude = aptitudes.find(aptitude => {
        return aptitude.id === skill.main_aptitude_id
      })

      skill.secondary_aptitude = aptitudes.find(aptitude => {
        return aptitude.id === skill.secondary_aptitude_id
      })
    })
    return res.status(200).send(skills)
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.post('/api/skills', isAdmin, async (req, res) => {
  try {
    const { name, description, main_aptitude, secondary_aptitude } = req.body

    if (!name || !description || !main_aptitude || !secondary_aptitude) {
      return res.status(400).send({ message: 'missing fields' })
    }

    const is_custom = req.session.user?.role === 'ADMIN' || false
    const result = await db.query(
            `INSERT INTO skill ("name", "description", main_aptitude_id, secondary_aptitude_id, is_custom)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, description, main_aptitude.id, secondary_aptitude.id, is_custom]
    )
    console.log('result?', result)
    const createdSkill = result.rows[0]
    console.log(createdSkill)
    return res.status(201).send({ message: 'skill created sucessfully', created: createdSkill })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.put('/api/skills/:id', isOwner, async (req, res) => {
  try {
    const id = req.params.id
    const { name, description, main_aptitude, secondary_aptitude } = req.body
    await db.query('UPDATE skill SET name = $1, description = $2, main_aptitude_id = $3, secondary_aptitude_id = $4 WHERE id = $5',
      [name, description, main_aptitude.id, secondary_aptitude.id, id]
    )

    return res.status(200).send({ message: 'skill updated' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.delete('/api/skills/:id', isOwner, async (req, res) => {
  try {
    const { id } = req.params

    await db.query(
      'DELETE FROM skill where id = $1 ', [id]
    )

    return res.status(200).send({ message: 'skill deleted' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

export default router

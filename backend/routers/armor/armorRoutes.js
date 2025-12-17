import { Router } from 'express'
import { isAdmin, isOwner } from '../../middleware/auth.js'
import db from '../../db/connection.js'

const router = Router()

router.get('/api/armor', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT armor.id, armor.name, armor.description, armor.head_ap, armor.body_ap, 
      armor.right_arm_ap, armor.left_arm_ap, armor.right_leg_ap, armor.left_leg_ap, armor.wt, armor.is_custom,

        json_build_object(
          'id', availability.id,
          'name', availability.name
        ) AS availability

      FROM armor
      LEFT JOIN availability ON armor.availability_id = availability.id
    `)
    const armors = result.rows
    return res.status(200).send(armors)
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})
router.post('/api/armor', async (req, res) => {
  try {
    const {
      name, description, head_ap, body_ap,
      right_arm_ap, left_arm_ap, right_leg_ap, left_leg_ap, wt, availability
    } = req.body

    if (!name) {
      return res.status(400).send({ message: 'missing fields' })
    }

    const is_custom = req.session.user?.role === 'ADMIN'

    const result = await db.query(
            `INSERT INTO armor ("name", description, head_ap, body_ap, right_arm_ap, left_arm_ap, right_leg_ap, left_leg_ap, wt, 
      availability_id, is_custom) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
            [name, description, head_ap, body_ap, right_arm_ap, left_arm_ap, right_leg_ap, left_leg_ap, wt, availability.id, is_custom]
    )
    const createdArmor = result.rows[0]
    return res.status(201).send({ message: 'armor created sucessfully', created: createdArmor })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.put('/api/armor/:id', async (req, res) => {
  try {
    const id = req.params.id
    const {
      name, description, head_ap, body_ap,
      right_arm_ap, left_arm_ap, right_leg_ap, left_leg_ap, wt, availability
    } = req.body

    await db.query(`UPDATE armor SET name = $1, description =$2, head_ap = $3, body_ap=$4, right_arm_ap = $5, left_arm_ap = $6,
                        right_leg_ap = $7, left_leg_ap = $8, wt = $9, availability_id = $10
                        WHERE id = $11`,
    [name, description, head_ap, body_ap,
      right_arm_ap, left_arm_ap, right_leg_ap, left_leg_ap, wt, availability.id, id])

    return res.status(200).send({ message: 'armor updated' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.delete('/api/armor/:id', async (req, res) => {
  try {
    const { id } = req.params
    console.log('skillid?', id)

    await db.query('DELETE FROM armor where id = $1 ', [id]
    )

    return res.status(200).send({ message: 'armor deleted' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

export default router

import Router from 'express'
import { isAdmin, isOwner } from '../../middleware/auth.js'
import db from '../../db/connection.js'
const router = Router()

router.get('/api/class/:id/powers', async (req, res) => {
  const { id } = req.params
  try {
    const result = await db.query(`
        SELECT
            p.id,
            p.name,
            p.description,
            p.ascendant,
            p.duration,
            p.actions,
            p.concentration,
            p.dc,
            p.range,
            p.shape,
            json_build_object(
                'id', pc.id,
                'name', pc.name
            ) AS category
        FROM class_powers cp
        JOIN power p ON p.id = cp.power_id
        JOIN powers_category pc ON pc.id = p.powers_category_id
        WHERE cp.class_id = $1
        ORDER BY cp.level;
        `, [id])
    const classPowers = result.rows

    return res.status(200).send(classPowers)
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.post('/api/class/:id/powers', isOwner, async (req, res) => {
  const { id } = req.params
  try {
    const { level, power } = req.body
    console.log(req.body)
    if (!power) {
      return res.status(400).send({ message: 'missing power' })
    }

    const result = await db.query(
            `INSERT INTO power (name, description, powers_Category_id, ascendant, duration, actions, concentration,
                dc, range, shape
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,

            [power.name, power.description, power.category.id, power.ascendant, power.duration,
              power.actions, power.concentration, power.dc, power.range, power.shape
            ]
    )
    const createdPower = result.rows[0]

    const classPowerResult = await db.query(
      'INSERT INTO class_powers (class_id, power_id, level) VALUES ($1, $2, $3) RETURNING *',
      [id, createdPower.id, level]
    )

    const classPowerRow = classPowerResult.rows[0]

    const classPower = {
      id: classPowerRow.id,
      class_id: classPowerRow.class_id,
      level: classPowerRow.level,
      power: {
        id: createdPower.id,
        name: createdPower.name,
        description: createdPower.description,
        ascendant: createdPower.ascendant,
        duration: createdPower.duration,
        actions: createdPower.actions,
        concentration: createdPower.concentration,
        dc: createdPower.dc,
        range: createdPower.range,
        shape: createdPower.shape,
        category: {
          id: power.category.id,
          name: power.category.name
        }
      },
      prerequisite_powers: null
    }

    return res.status(201).send({ message: 'power created sucessfully', created: classPower })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.put('/api/class/:classID/powers/:powerID', isOwner, async (req, res) => {
  try {
    const { classID, powerID } = req.params
    const { level, power } = req.body

    await db.query(`UPDATE power SET
                        name = $1, description = $2, powers_Category_id = $3, ascendant = $4, duration = $5, 
                        actions = $6, concentration = $7, dc = $8, range = $9, shape = $10
                        WHERE id = $11`,

    [power.name, power.description, power.category.id, power.ascendant, power.duration,
      power.actions, power.concentration, power.dc, power.range, power.shape,
      power.id
    ]
    )

    await db.query(
            `UPDATE class_powers
            SET level = $1
            WHERE class_id = $2 AND power_id = $3`,
            [level, classID, powerID]
    )

    return res.status(200).send({ message: 'power updated' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.delete('/api/class/:classID/powers/:powerID', isOwner, async (req, res) => {
  try {
    const classID = Number(req.params.classID)
    const powerID = Number(req.params.powerID)

    console.log(classID, powerID)

    const result = await db.query(
      'DELETE FROM class_powers WHERE class_id = $1 AND power_id = $2 RETURNING *',
      [classID, powerID]
    )
    console.log('deleted rows:', result.rowCount)

    await db.query('DELETE FROM "power" where id = $1', [powerID])

    return res.status(200).send({ message: 'power deleted' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

export default router

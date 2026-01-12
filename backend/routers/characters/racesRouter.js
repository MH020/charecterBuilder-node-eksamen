import { Router } from 'express'
import { isAdmin, isOwner } from '../../middleware/auth.js'
import db from '../../db/connection.js'

const router = Router()

router.get('/api/races', async (req, res) => {
  try {
    const result = await db.query(`
            SELECT race.id, race.name, race.description, race.wounds, race.is_custom,

            json_build_object(
                'id', base_statline.id,
                'name', base_statline.name,
                'weapon_skill', base_statline.weapon_skill,
                'ballistic_skill', base_statline.ballistic_skill,
                'strength', base_statline.strength,
                'toughness', base_statline.toughness,
                'agility', base_statline.agility,
                'intelligence', base_statline.intelligence,
                'perception', base_statline.perception,
                'willpower', base_statline.willpower,
                'fellowship', base_statline.fellowship,
                'is_custom', base_statline.is_custom
            ) AS base_statline,

            json_build_object(
                'id', max_statline.id,
                'name', max_statline.name,
                'weapon_skill', max_statline.weapon_skill,
                'ballistic_skill', max_statline.ballistic_skill,
                'strength', max_statline.strength,
                'toughness', max_statline.toughness,
                'agility', max_statline.agility,
                'intelligence', max_statline.intelligence,
                'perception', max_statline.perception,
                'willpower', max_statline.willpower,
                'fellowship', max_statline.fellowship,
                'is_custom', max_statline.is_custom
            ) AS max_statline,

            json_build_object(
                'id', size.id,
                'name', size.name,
                'score', size.score
            ) AS size

            FROM race
            LEFT JOIN statline_race AS base_statline
            ON race.base_statline_id = base_statline.id
            LEFT JOIN statline_race AS max_statline
            ON race.max_statline_id = max_statline.id
            LEFT JOIN size
            ON race.size_id = size.id;
        `)

    const races = result.rows

    return res.status(200).send(races)
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.post('/api/races', async (req, res) => {
  try {
    const { name, description, wounds, base_statline, max_statline, size } = req.body

    if (!name || description || wounds || base_statline || max_statline || size) {
      return res.status(400).send({ message: 'missing fields' })
    }

    const is_custom = req.session.user?.role === 'ADMIN'

    const result = await db.query(
            `INSERT INTO race 
            ("name", description, size_id, wounds, base_statline_id, max_statline_id, is_custom) 
            VALUES ($1, $2, $3, $4, $5, $6, $7 RETURNING *)`,
            [name, description, size.id, wounds, base_statline.id, max_statline.id, is_custom]
    )
    const createdRace = result.rows[0]

    return res.status(201).send({ message: 'race created sucessfully', created: createdRace })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.put('/api/races/:id', isOwner, async (req, res) => {
  try {
    const { id } = req.params
    const { name, description, wounds, base_statline, max_statline, size } = req.body

    await db.query(`UPDATE race SET name = $1, description =$2, size_id = $3, wounds=$4, 
                        base_statline_id = $5, max_statline_id = $6
                        WHERE id = $7`,
    [name, description, size.id, wounds, base_statline.id, max_statline.id, id])

    return res.status(200).send({ message: 'race updated' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.delete('/api/races/:id', isOwner, async (req, res) => {
  try {
    const { id } = req.params
    console.log('skillid?', id)

    await db.query('DELETE FROM race where id = $1 ', [id])

    return res.status(200).send({ message: 'race deleted' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

export default router

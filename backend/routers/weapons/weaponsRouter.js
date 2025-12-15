import { Router } from 'express'
import { isAdmin, isOwner } from '../../middleware/auth.js'
import db from '../../db/connection.js'

const router = Router()

router.get('/api/weapons', async (req, res) => {
  try {
    const result = await db.query(`
        SELECT 
            weapon.id, weapon.type, weapon.name, weapon.range, weapon.hands, weapon.rof, 
            weapon.damage, weapon.pen, weapon.clip, weapon.reload, weapon.wt, weapon.is_custom,

            json_build_object(
                'id', category.id,
                'name', category.name
            ) AS category,

            json_build_object(
                'id', availability.id,
                'name', availability.name
            ) AS availability,

            (
                SELECT json_agg(
                    jsonb_build_object(
                        'id', weapon_class.id,
                        'name', weapon_class.name,
                        'description', weapon_class.description
                    )
                )
                FROM weapon_weapon_class 
                JOIN weapon_class 
                    ON weapon_class.id = weapon_weapon_class.weapon_class_id
                WHERE weapon_weapon_class.weapon_id = weapon.id
            ) AS classes,

            (
                SELECT json_agg(
                    jsonb_build_object(
                        'id', weapon_trait.id,
                        'name', weapon_trait.name,
                        'description', weapon_trait.description
                    )
                )
                FROM weapon_weapon_traits 
                JOIN weapon_trait 
                    ON weapon_trait.id = weapon_weapon_traits.weapon_trait_id
                WHERE weapon_weapon_traits.weapon_id = weapon.id
            ) AS traits

        FROM weapon
        JOIN category ON weapon.category_id = category.id
        JOIN availability ON weapon.availability_id = availability.id

        GROUP BY 
            weapon.id,
            category.id,
            availability.id;
    `)

    const weapons = result.rows

    return res.status(200).json(weapons)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'server error', error: error.message })
  }
})

router.post('/api/weapons', async (req, res) => {
  try {
    const { type, name, range, hands, rof, damage, pen, clip, reload, wt, category, availability, classes, traits } = req.body

    if (!name) { // add more
      return res.status(400).send({ message: 'missing fields' })
    }

    const is_custom = req.session.user?.role === 'ADMIN' || false

    const result = await db.query(
            `INSERT INTO weapon (type, category_id, "name", range, hands, rof, damage, pen, clip, reload, wt, availability_id, is_custom) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
            [type, category.id, name, range, hands, rof, damage, pen, clip, reload, wt, availability.id, is_custom]
    )
    const createdWeapon = result.rows[0]

    for (const weaponClass of classes) {
      await db.query('INSERT INTO weapon_weapon_class (weapon_class_id, weapon_id) VALUES ($1, $2)', [weaponClass.id, createdWeapon.id])
    }

    for (const trait of traits) {
      await db.query('INSERT INTO weapon_weapon_traits (weapon_trait_id, weapon_id) VALUES ($1, $2)', [trait.id, createdWeapon.id])
    }

    return res.status(201).send({ message: 'weapon created sucessfully', created: createdWeapon })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.put('/api/weapons/:id', async (req, res) => {
  try {
    const id = req.params.id
    console.log(id)
    const { type, name, range, hands, rof, damage, pen, clip, reload, wt, category, availability, classes, traits } = req.body

    const is_custom = req.session.user?.role === 'ADMIN' || false

    const result = await db.query(
            `UPDATE weapon SET type = $1, category_id = $2, name = $3, range = $4, hands = $5, rof = $6, damage = $7, pen = $8, clip = $9,
                reload = $10, wt = $11, availability_id = $12, is_custom = $13 WHERE id = $14
            RETURNING *`,
            [type, category.id, name, range, hands, rof, damage, pen, clip, reload, wt, availability.id, is_custom, id]
    )

    const updatedWeapon = result.rows[0]

    await db.query('DELETE FROM weapon_weapon_class WHERE weapon_id = $1', [id])

    await db.query('DELETE FROM weapon_weapon_traits WHERE weapon_id = $1', [id])

    for (const weaponClass of classes) {
      await db.query('INSERT INTO weapon_weapon_class (weapon_class_id, weapon_id) VALUES ($1, $2)', [weaponClass.id, updatedWeapon.id])
    }

    for (const trait of traits) {
      await db.query('INSERT INTO weapon_weapon_traits (weapon_trait_id, weapon_id) VALUES ($1, $2)', [trait.id, updatedWeapon.id])
    }

    return res.status(200).send({ message: 'aptitude updated' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.delete('/api/weapons/:id', async (req, res) => {
  try {
    const { id } = req.params
    console.log('skillid?', id)

    await db.query('DELETE FROM weapon where id = $1 ', [id]
    )

    await db.query('DELETE FROM weapon_weapon_class WHERE weapon_id = $1', [id])

    await db.query('DELETE FROM weapon_weapon_traits WHERE weapon_id = $1', [id])

    return res.status(200).send({ message: 'aptitude deleted' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

export default router

import Router from 'express'
import { isAdmin, isLoggedIn, isOwner } from '../../middleware/auth.js'
import db from '../../db/connection.js'
const router = Router()

router.get('/charactersheets', isLoggedIn, async (req, res) => {

    try {
        const result = await db.query(`
            SELECT * FROM charactersheet WHERE player_id = $1 
        `[req.session.user.id])




        return res.status(200).send(result.rows)

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})


router.get('/charactersheets/:id/full', isLoggedIn, async (req, res) => {

    const { id } = req.params

    try {
        const result = await db.query(`
            SELECT * FROM charactersheet WHERE player_id = $1 AND id = $2 
        `, [req.session.user.id, id])

        const charecterweaponsResult = await db.query(
            `
  SELECT
      cw.id,
      cw.charactersheet_id,
      cw.hands,
      cw.bullets,
      cw.note,
      json_build_object(
          'id', w.id,
          'type', w.type,
          'category_id', w.category_id,
          'name', w.name,
          'range', w.range,
          'hands', w.hands,
          'rof', w.rof,
          'damage', w.damage,
          'pen', w.pen,
          'clip', w.clip,
          'reload', w.reload,
          'wt', w.wt,
          'availability_id', w.availability_id,
          'projectile_id', w.projectile_id,
          'is_custom', w.is_custom
      ) AS weapon,
      json_build_object(
          'id', c.id,
          'name', c.name,
          'description', c.description,
          'hit_modifier', c.hit_modifier,
          'damage_modifier', c.damage_modifier,
          'wt_modifier', c.wt_modifier,
          'ap_modifier', c.ap_modifier,
          'category', c.category
      ) AS craftsmanship
  FROM character_weapon cw
  JOIN weapon w ON w.id = cw.weapon_id
  LEFT JOIN craftsmanship c ON c.id = cw.craftsmanship_id
  WHERE cw.charactersheet_id = $1
  `,
            [id]);

        const characterClasses = await db.query(`
        SELECT * FROM character_classes WHERE charactersheet_id = $1 
        `[req.session.user.id, id])


        const characterApptitudes = await db.query(` 
        SELECT
        ca.id,
        ca.charactersheet_id,
        json_build_object(
          'id', a.id,
          'name', a.name
        ) AS aptitude
        FROM character_aptitudes ca
        JOIN aptitude a ON a.id = ca.aptitude_id
        WHERE ca.charactersheet_id = $1
        `,
        [id]);

    const charecterSkills = await db.query(`
    SELECT
        cs.id,
        cs.charactersheet_id,
        cs.training_level,
        cs.talent_bonus,

        json_build_object(
            'id', s.id,
            'name', s.name,
            'description', s.description,
            'is_custom', s.is_custom,
            'main_aptitude', json_build_object(
                'id', a1.id,
                'name', a1.name
            ),
            'secondary_aptitude', json_build_object(
                'id', a2.id,
                'name', a2.name
            )
        ) AS skill
    FROM character_skills cs
    JOIN skill s ON s.id = cs.skill_id
    JOIN aptitude a1 ON a1.id = s.main_aptitude_id
    JOIN aptitude a2 ON a2.id = s.secondary_aptitude_id
    WHERE cs.charactersheet_id = $1
    `,
    [id]);

    const charecterCharacteristics = await db.query(`
    SELECT
        cc.id,
        cc.charactersheet_id,
        cc.stat_amount,
        json_build_object(
            'id', c.id,
            'name', c.name,
            'description', c.description
        ) AS characteristic
    FROM character_characteristics cc
    JOIN characteristic c ON c.id = cc.characteristic_id
    WHERE cc.charactersheet_id = $1
  `,
  [id]);

        const charectersheet = {
            sheet: result.rows, 
            charecter_weapons: charecterweaponsResult.rows, 
            classes: characterClasses.rows, 
            character_apptitudes: characterApptitudes.rows,
            charecter_skills: charecterSkills.rows,
            charecter_characteristics: charecterCharacteristics.rows
        }


    return res.status(200).send(charectersheet)

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})



router.post('/charactersheets', async (req, res) => {
    try {
        const { basesheet,  apptitudes, characteristics, clss, lineage, race, skills} = req.body

        if (!name || !description) {
            return res.status(400).send({ message: 'missing fields' })
        }

    const newSheetResult = await db.query(
    `INSERT INTO charactersheet (
        name,
        level,
        race_id,
        lineage_id,
        player_id,
        campaign_id,
        damage,
        dm_shared,
        fate_points,
        fortitude,
        insanity,
        corruption,
        sanctification,
        primary_slots,
        large_slots,
        small_slots,
        updated
    ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17
    ) RETURNING id`,
  [ basesheet.name, basesheet.level, basesheet.race_id, basesheet.lineage_id, basesheet.player_id, 
    basesheet.campaign_id, basesheet.damage, false, basesheet.fate_points, basesheet.fortitude, 
    basesheet.insanity, basesheet.corruption, basesheet.sanctification, 
    basesheet.primary_slots,basesheet.large_slots, basesheet.small_slots, Date.now().toLocaleString()         
  ]);
  const sheetId = newSheetResult.rows[0].id;



        apptitudes.forEach(async apptitude => {
            await db.query(
                `INSERT INTO character_aptitudes (charactersheet_id, aptitude_id)
                VALUES ($1, $2)`,

                [sheetId, apptitude.id]
            )
        });

        characteristics.forEach(async characteristic => {
            await db.query(
                `INSERT INTO character_characteristics (charactersheet_id, aptitude_id, stat_amount)
                VALUES ($1, $2 $3)`,

                [sheetId, characteristic.id, characteristic.value]
            )
        });

        return res.status(201).send({ message: 'class created sucessfully', created: createdClass })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.post('/api/classes/:id/subclasses', async (req, res) => {
    try {
        const { id } = req.params
        const { name, description } = req.body

        if (!name || !description) {
            return res.status(400).send({ message: 'missing fields' })
        }

        const result = await db.query(
            `INSERT INTO "class" (name, description, parent_id)
            VALUES ($1, $2, $3) RETURNING *`,

            [name, description, id]
        )
        const createdClass = result.rows[0]

        return res.status(201).send({ message: 'subclass created sucessfully', created: createdClass })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.post('/api/classes/:id/bonuses', async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const { bonus, characteristic } = req.body
        console.log(req.body)

        if (!bonus || !characteristic) {
            return res.status(400).send({ message: 'missing fields' })
        }

        const characteristicResult = await db.query(
            'SELECT * FROM class_bonuses WHERE class_id = $1 AND characteristic_id = $2',
            [id, characteristic.id]
        )

        if (characteristicResult.rows.length > 0) {
            await db.query('DELETE FROM class_bonuses WHERE class_id = $1 AND characteristic_id = $2', [id, characteristic.id])
        }

        const result = await db.query(
            `INSERT INTO class_bonuses (class_id, characteristic_id, bonus)
            VALUES ($1, $2, $3) RETURNING *`,

            [id, characteristic.id, bonus]
        )
        const createdClass = result.rows[0]

        return res.status(201).send({ message: 'bonus added to class', created: createdClass })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.post('/api/classes/:classID/apptitudes', async (req, res) => {
    try {
        const { classID } = req.params
        const { id, name } = req.body

        console.log(req.body)

        if (!id || !name) {
            return res.status(400).send({ message: 'missing fields' })
        }

        const classAptitudesResult = await db.query(
            'SELECT * FROM class_aptitudes WHERE class_id = $1 AND aptitude_id = $2',
            [classID, id]
        )

        if (classAptitudesResult.rows.length > 0) {
            return res.status(400).send({ message: 'apptitude allready on this class' })
        }

        const result = await db.query(
            `INSERT INTO class_aptitudes (class_id, aptitude_id)
            VALUES ($1, $2) RETURNING *`,

            [classID, id]
        )
        const createdclassApptitude = result.rows[0]

        return res.status(201).send({ message: 'apptitude added to class', created: createdclassApptitude })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.post('/api/classes/:classID/weapon-class', async (req, res) => {
    try {
        const { classID } = req.params
        const { id } = req.body

        console.log(req.body)

        if (!id) {
            return res.status(400).send({ message: 'missing fields' })
        }

        const classWeaponClassResult = await db.query(
            'SELECT * FROM class_weapon_class WHERE class_id = $1 AND weapon_class_id = $2',
            [classID, id]
        )

        if (classWeaponClassResult.rows.length > 0) {
            return res.status(400).send({ message: 'weapon_class allready on this class' })
        }

        const result = await db.query(
            `INSERT INTO class_weapon_class (class_id, weapon_class_id)
            VALUES ($1, $2) RETURNING *`,

            [classID, id]
        )

        return res.status(201).send({ message: 'weapon class added to class', created: result.rows[0] })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})


router.post('/api/classes/:classID/weapon-training', async (req, res) => {
    try {
        const { classID } = req.params
        const { id } = req.body

        console.log(req.body)

        if (!id) {
            return res.status(400).send({ message: 'missing fields' })
        }

        const classWeaponClassResult = await db.query(
            'SELECT * FROM class_weapon_training WHERE class_id = $1 AND talent_id = $2',
            [classID, id]
        )

        if (classWeaponClassResult.rows.length > 0) {
            return res.status(400).send({ message: 'weapon trainning allready on this class' })
        }

        const result = await db.query(
            `INSERT INTO class_weapon_training (class_id, talent_id)
            VALUES ($1, $2) RETURNING *`,

            [classID, id]
        )

        return res.status(201).send({ message: 'weapon class added to class', created: result.rows[0] })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.post('/api/classes/:classID/items', async (req, res) => {
    try {
        const { classID } = req.params
        const { id } = req.body

        console.log(req.body)

        if (!id) {
            return res.status(400).send({ message: 'missing fields' })
        }

        const classWeaponClassResult = await db.query(
            'SELECT * FROM class_items WHERE class_id = $1 AND item_id = $2',
            [classID, id]
        )

        if (classWeaponClassResult.rows.length > 0) {
            return res.status(400).send({ message: 'item allready on this class' })
        }

        const result = await db.query(
            `INSERT INTO class_items (class_id, item_id)
            VALUES ($1, $2) RETURNING *`,

            [classID, id]
        )

        return res.status(201).send({ message: 'class item added to class', created: result.rows[0] })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})


router.post('/api/classes/:classID/traits', async (req, res) => {
    try {
        const { classID } = req.params
        const { id } = req.body

        console.log(req.body)

        if (!id) {
            return res.status(400).send({ message: 'missing fields' })
        }

        const classWeaponClassResult = await db.query(
            'SELECT * FROM class_traits WHERE class_id = $1 AND trait_id = $2',
            [classID, id]
        )

        if (classWeaponClassResult.rows.length > 0) {
            return res.status(400).send({ message: 'trait allready on this class' })
        }

        const result = await db.query(
            `INSERT INTO class_traits (class_id, trait_id, "level")
            VALUES ($1, $2, $3) RETURNING *`,

            [classID, id, 1]
        )

        return res.status(201).send({ message: 'class trait added to class', created: result.rows[0] })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.post('/api/classes/:classID/powers-known', async (req, res) => {
    try {
        const { classID } = req.params
        const { powers_known, level } = req.body


        if (!classID || !powers_known) {
            return res.status(400).send({ message: 'missing fields' })
        }

        const result = await db.query(
            `INSERT INTO class_powers_known (class_id, powers_known, level)
            VALUES ($1, $2, $3 ) RETURNING *`,

            [classID, powers_known, level]
        )

        return res.status(201).send({ message: 'added new powers known added to class', created: result.rows[0] })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.put('/api/classes/:classID/powers-known/:id', async (req, res) => {
    try {
        const { classID, id } = req.params
        const { powers_known, level } = req.body
        console.log(req.body)

        await db.query(`UPDATE class_powers_known SET
                        powers_known = $1, "level" = $2 
                        WHERE id = $3`,
            [powers_known, level, id]
        )

        return res.status(200).send({ message: 'powers-known updated' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.put('/api/classes/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, description, parent_id } = req.body

        await db.query(`UPDATE "class" SET
                        name = $1, description = $2, parent_id = $3
                        WHERE id = $4`,
            [name, description, parent_id, id]
        )

        return res.status(200).send({ message: 'class updated' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

// wait with this one until everything else is set and then delete from all tables
router.delete('/api/classes/:id', async (req, res) => {
    try {
        const { id } = req.params

        await db.query('DELETE FROM trait where id = $1 ', [id])

        return res.status(200).send({ message: 'trait race deleted' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.delete('/api/classes/:parrent_id/bonuses/:id', async (req, res) => {
    try {
        const { parrent_id, id } = req.params

        await db.query('DELETE FROM class_bonuses WHERE class_id = $1 AND id= $2', [parrent_id, id])

        return res.status(200).send({ message: 'bonus race deleted' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.delete('/api/classes/:parrent_id/apptitudes/:id', async (req, res) => {
    try {
        const { parrent_id, id } = req.params

        await db.query('DELETE FROM class_aptitudes WHERE class_id = $1 AND id= $2', [parrent_id, id])

        return res.status(200).send({ message: 'apptitudes  deleted' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.delete('/api/classes/:parrent_id/weapon-class/:id', async (req, res) => {
    try {
        const { parrent_id, id } = req.params

        await db.query('DELETE FROM class_weapon_class WHERE class_id = $1 AND id= $2', [parrent_id, id])

        return res.status(200).send({ message: 'class_weapon_class  deleted' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.delete('/api/classes/:parrent_id/weapon-training/:id', async (req, res) => {
    try {
        const { parrent_id, id } = req.params

        await db.query('DELETE FROM class_weapon_training WHERE class_id = $1 AND id= $2', [parrent_id, id])

        return res.status(200).send({ message: 'class_weapon_training  deleted' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.delete('/api/classes/:parrent_id/items/:id', async (req, res) => {
    try {
        const { parrent_id, id } = req.params

        await db.query('DELETE FROM class_items WHERE class_id = $1 AND id= $2', [parrent_id, id])

        return res.status(200).send({ message: 'class_item  deleted' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.delete('/api/classes/:parrent_id/traits/:id', async (req, res) => {
    try {
        const { parrent_id, id } = req.params

        await db.query('DELETE FROM class_traits WHERE class_id = $1 AND id= $2', [parrent_id, id])

        return res.status(200).send({ message: 'class_traits  deleted' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

export default router

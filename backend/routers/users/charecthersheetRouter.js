import Router from 'express'
import { isAdmin, isLoggedIn } from '../../middleware/auth.js'
import db from '../../db/connection.js'
const router = Router()

router.get('/api/charectersheets', isLoggedIn, async (req, res) => {

    try {
        const result = await db.query(`
            SELECT * FROM charactersheet WHERE player_id = $1 
        `, [req.session.user.id])

        return res.status(200).send(result.rows)

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})


router.get('/api/charectersheets/:id/full', isLoggedIn, async (req, res) => {

    const { id } = req.params

    try {
        const result = await db.query(`
            SELECT * FROM charactersheet WHERE player_id = $1 AND id = $2 
        `, [req.session.user.id, id])

        if (result.rows.length === 0) {
            return res.status(404).send({ message: 'No sheet found for this user' })
        }
        const charecterweaponsResult = await db.query(`
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
        `, [id]);

        const characterClasses = await db.query(`
            SELECT * FROM character_classes WHERE charactersheet_id = $1
            `, [id])


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
            `, [id]);

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
        `, [id]);

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
        `,[id]);

        const charectersheet = {
            sheet: result.rows[0],
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



router.post('/api/charectersheets', isLoggedIn, async (req, res) => {
    try {
        const { baseSheet, apptitudes, characteristics, clss, lineage, race, skills } = req.body

        if (!baseSheet || !skills) {
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
        updated
    ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
    ) RETURNING id`,
            [baseSheet.name, baseSheet.level, race.id, lineage.id, req.session.user.id,
                1, 0, false, baseSheet.fate_points, baseSheet.fortitude,
            baseSheet.insanity, baseSheet.corruption, baseSheet.sanctification,
            new Date()
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
                `INSERT INTO character_characteristics (charactersheet_id, characteristic_id, stat_amount)
                VALUES ($1, $2, $3)`,

                [sheetId, characteristic.id, characteristic.value]
            )
        });

        skills.forEach(async skill => {
            await db.query(
                `INSERT INTO character_skills (charactersheet_id, skill_id, training_level, talent_bonus)
                VALUES ($1, $2, $3, $4)`,

                [sheetId, skill.id, skill.training_level, skill.talent_bonus]
            )
        });

        await db.query(
            `INSERT INTO character_classes (charactersheet_id, class_id, level)
            VALUES ($1, $2, $3)`,
            [sheetId, clss.id, baseSheet.level]
        )

        return res.status(201).send({ message: 'class created sucessfully', created: sheetId })
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


        return res.status(201).send({ message: 'sheet has been created', created: sheetId })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})


router.delete('/api/charectersheets/:id', isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params
    console.log('charactersheet id?', id)

    const result = await db.query(
      `SELECT id FROM charactersheet WHERE player_id = $1 AND id = $2`,
      [req.session.user.id, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).send({ message: 'character sheet not found' })
    }

    const sheetId = result.rows[0].id

    await db.query(`DELETE FROM character_weapon WHERE charactersheet_id = $1`, [sheetId])
    await db.query(`DELETE FROM character_skills WHERE charactersheet_id = $1`, [sheetId])
    await db.query(`DELETE FROM character_characteristics WHERE charactersheet_id = $1`, [sheetId])
    await db.query(`DELETE FROM character_aptitudes WHERE charactersheet_id = $1`, [sheetId])
    await db.query(`DELETE FROM character_classes WHERE charactersheet_id = $1`, [sheetId])

    await db.query(`DELETE FROM charactersheet WHERE id = $1`, [sheetId])

    return res.status(200).send({ message: 'character sheet deleted' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})


export default router
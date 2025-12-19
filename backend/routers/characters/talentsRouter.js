import Router from 'express'
import { isAdmin, isOwner } from '../../middleware/auth.js'
import db from '../../db/connection.js'
const router = Router()

router.get('/api/talents', async (req, res) => {
    try {
        const result = await db.query(`
        SELECT
            t.id, t.name, t.description, t.type, t.asi, t.is_custom,

            json_build_object(
                'id', pt.id,
                'name', pt.name
            ) AS prerequisite_talent,

            json_build_object(
                'id', r.id,
                'name', r.name
            ) AS required_race,

            json_build_object(
                'id', l.id,
                'name', l.name
            ) AS required_lineage,
            (
                SELECT json_agg(
                    jsonb_build_object(
                        'id', a.id,
                        'name', a.name
                    )
                )
                FROM talent_aptitude ta
                JOIN aptitude a ON a.id = ta.aptitude_id
                WHERE ta.talent_id = t.id
            ) AS aptitudes

        FROM talent t

        LEFT JOIN talent pt
            ON pt.id = t.prerequisite_talent_id

        LEFT JOIN race r
            ON r.id = t.required_race_id

        LEFT JOIN lineage l
            ON l.id = t.lineage_id;
        `)
        const talents = result.rows

        return res.status(200).send(talents)
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.post('/api/talents', async (req, res) => {
    try {
        const {
            name, description, type, asi, prerequisite_talent, required_race,
            required_lineage, aptitudes
        } = req.body

        if (!name) {
            return res.status(400).send({ message: 'missing fields' })
        }

        if (type !== 'Half Talent' || 'Full Talent' || 'Class Feature Only' || 'Expert Talent') {
            return res.status(400).send({ message: 'wrong type' })
        }

        const is_custom = req.session.user?.role === 'ADMIN'

        const result = await db.query(
            `INSERT INTO statline_race (
        name, weapon_skill, ballistic_skill, strength,toughness, agility, intelligence, perception,
        willpower, fellowship, is_custom)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,

            [name, weapon_skill, ballistic_skill, strength, toughness, agility,
                intelligence, perception, willpower, fellowship, is_custom
            ]
        )
        const createdRace = result.rows[0]

        return res.status(201).send({ message: 'statline created sucessfully', created: createdRace })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

router.put('/api/statlines/:id', async (req, res) => {
    try {
        const { id } = req.params
        const {
            name, weapon_skill, ballistic_skill, strength, toughness, agility,
            intelligence, perception, willpower, fellowship
        } = req.body

        await db.query(`UPDATE statline_race SET
                        name = $1, weapon_skill = $2, ballistic_skill = $3, strength = $4, toughness = $5,
                        agility = $6, intelligence = $7, perception = $8, willpower = $9, fellowship = $10 
                        WHERE id = $11`,
            [name, weapon_skill, ballistic_skill, strength, toughness, agility,
                intelligence, perception, willpower, fellowship, id
            ])

        return res.status(200).send({ message: 'statline updated' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})
// needs to check if race has statline before delete
router.delete('/api/statlines/:id', async (req, res) => {
    try {
        const { id } = req.params

        await db.query('DELETE FROM statline_race where id = $1 ', [id])

        return res.status(200).send({ message: 'statline race deleted' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }
})

export default router
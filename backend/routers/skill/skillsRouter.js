import { Router } from "express";
import {isAdmin } from '../../middleware/auth.js'
import db from '../../db/connection.js'


const router = Router()



router.get("/api/skills", isAdmin, async (req,res) => {
    try {
        const result = await db.query('SELECT * FROM skill WHERE is_custom = false')
        const secoundResult = await db.query('SELECT * FROM aptitude')

        const skills = result.rows
        const aptitudes = secoundResult.rows
        skills.forEach(skill =>{
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

router.post("/api/skills", isAdmin, async (req,res) => {
    try {

        const { name, description, main_aptitude_id,secondary_aptitude_id } = req.body

        if (!name || !description || !main_aptitude_id || !secondary_aptitude_id) {
        return res.status(400).send({ message: 'missing fields' })
        }

        const is_custom = req.session.user.role === "ADMIN"
            await db.query(
            `INSERT INTO skill ("name", "description", main_aptitude_id, secondary_aptitude_id, is_custom)
             VALUES ($1, $2, $3, $4, $5)`,
            [name, description, main_aptitude_id, secondary_aptitude_id, is_custom]
        )
            return res.status(201).send({ message: 'skill created sucessfully' })
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })  
    }
})


export default router



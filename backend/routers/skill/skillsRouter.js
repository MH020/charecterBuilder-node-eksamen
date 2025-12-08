import { Router } from "express";
import {isAdmin } from '../../middleware/auth.js'
import db from '../../db/connection.js'


const router = Router()



router.get("/api/skills", async (req,res) => {
    const result = await db.query('SELECT * FROM skill')
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
    return res.status(200).send({skills})
})


export default router



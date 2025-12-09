import { Router } from "express";
import {isAdmin, isOwner } from '../../middleware/auth.js'
import db from '../../db/connection.js'


const router = Router()



router.get("/api/aptitudes", async (req,res) => {
    try {
        const result = await db.query('SELECT * FROM aptitude')
        const apptitudes = result.rows
        return res.status(200).send(apptitudes)   

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }   
})

export default router
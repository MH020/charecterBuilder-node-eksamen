import { Router } from "express";
import {isAdmin, isOwner } from '../../middleware/auth.js'
import db from '../../db/connection.js'


const router = Router()



router.get("/api/weapon/classes", async (req,res) => {
    try {
        const result = await db.query('SELECT * FROM weapon_class')
        const weaponClasses = result.rows
        return res.status(200).send(weaponClasses)   

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }   
})

router.post("/api/weapon/classes", async (req,res) => {
    try {
        const { name, description } = req.body

        if (!name || !description ) {
        return res.status(400).send({ message: 'missing fields' })
        }

            const result = await db.query(
            `INSERT INTO weapon_class ("name", description) VALUES ($1, $2) RETURNING *`,
            [name, description]
        )
        const createdClass = result.rows[0];
        return res.status(201).send({ message: 'weapon class created sucessfully', created: createdClass})
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })  
    }
})

router.put("/api/weapon/classes/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description } = req.body;

        await db.query(`UPDATE weapon_class SET name = $1, description = $2 WHERE id = $3`, [name, description, id]);

        return res.status(200).send({ message: 'weapon class updated' })
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })       
    }
})

router.delete("/api/weapon/classes/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await db.query(
            `DELETE FROM weapon_weapon_class where weapon_class_id = $1 `, [id],
        )


        await db.query(
            `DELETE FROM weapon_class where id = $1 `, [id],
        )

        return res.status(200).send({ message: 'weapon class deleted' })
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })     
    }
})

export default router
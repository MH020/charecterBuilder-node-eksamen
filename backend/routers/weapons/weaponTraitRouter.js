import { Router } from "express";
import {isAdmin, isOwner } from '../../middleware/auth.js'
import db from '../../db/connection.js'


const router = Router()



router.get("/api/weapon/traits", async (req,res) => {
    try {
        const result = await db.query('SELECT * FROM weapon_trait')
        const weaponTraits = result.rows
        return res.status(200).send(weaponTraits)   

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })
    }   
})

router.post("/api/weapon/traits", async (req,res) => {
    try {
        const { name, description } = req.body

        if (!name || !description ) {
        return res.status(400).send({ message: 'missing fields' })
        }
        const is_custom = req.session.user?.role === "ADMIN" || false
        const result = await db.query(
            `INSERT INTO weapon_trait ("name", description, is_custom) VALUES ($1, $2, $3) RETURNING *`,
            [name, description, is_custom]
        )
        const createdTrait = result.rows[0];
        return res.status(201).send({ message: 'weapon trait created sucessfully', created: createdTrait})
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })  
    }
})

router.put("/api/weapon/traits/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description } = req.body;

        await db.query(`UPDATE weapon_trait SET name = $1, description = $2 WHERE id = $3`, [name, description, id]);

        return res.status(200).send({ message: 'weapon trait updated' })
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })       
    }
})

router.delete("/api/weapon/traits/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await db.query(
            `DELETE FROM weapon_weapon_traits where weapon_trait_id = $1 `, [id],
        )


        await db.query(
            `DELETE FROM weapon_trait where id = $1 `, [id],
        )

        return res.status(200).send({ message: 'weapon class deleted' })
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })     
    }
})

export default router
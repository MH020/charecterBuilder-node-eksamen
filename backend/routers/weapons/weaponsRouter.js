import { Router } from "express";
import {isAdmin, isOwner } from '../../middleware/auth.js'
import db from '../../db/connection.js'


const router = Router()



router.get("/api/weapons", async (req, res) => {
    try {
        const query = `
            SELECT 
                weapon.id, weapon.type, weapon.name, weapon.range, weapon.hands, weapon.rof, weapon.damage, weapon.pen, 
                weapon.clip, weapon.reload, weapon.wt, weapon.is_custom,

                json_build_object(
                    'id', weapon_class.id,
                    'name', weapon_class.name
                ) AS weapon_class,

                json_build_object(
                    'id', category.id,
                    'name', category.name
                ) AS category,

                json_build_object(
                    'id', availability.id,
                    'name', availability.name
                ) AS availability

            FROM weapon
            JOIN weapon_class ON weapon.weapon_class_id = weapon_class.id
            JOIN category ON weapon.category_id = category.id
            JOIN availability ON weapon.availability_id = availability.id;
        `;

        const result = await db.query(query);
        const weapons = result.rows;

        return res.status(200).json(weapons);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'server error', error: error.message });
    }
});

router.post("/api/weapons", async (req,res) => {
    try {
        const { name } = req.body

        if (!name ) {
        return res.status(400).send({ message: 'missing fields' })
        }

        const is_custom = req.session.user?.role === "ADMIN" || false

            const result = await db.query(
            `INSERT INTO aptitude ("name") VALUES ($1) RETURNING *`,
            [name]
        )
        const createdAptitude = result.rows[0];
        return res.status(201).send({ message: 'weapon created sucessfully', created: createdAptitude})
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })  
    }
})

router.put("/api/weapons/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;

        await db.query(`UPDATE aptitude SET name = $1 WHERE id = $2`, [name, id]);

        return res.status(200).send({ message: 'aptitude updated' })
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })       
    }
})

router.delete("/api/weapons/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log("skillid?", id)

        await db.query(
            `DELETE FROM aptitude where id = $1 `, [id],
        )

        return res.status(200).send({ message: 'aptitude deleted' })
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })     
    }
})

export default router
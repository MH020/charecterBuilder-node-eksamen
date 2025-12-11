import { Router } from "express";
import {isAdmin, isOwner } from '../../middleware/auth.js'
import db from '../../db/connection.js'


const router = Router()



router.get("/api/weapons", async (req, res) => {
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

            json_agg(
                jsonb_build_object(
                    'id', weapon_class.id,
                    'name', weapon_class.name,
                    'description', weapon_class.description
                )
            ) AS classes

        FROM weapon
        JOIN category ON weapon.category_id = category.id
        JOIN availability ON weapon.availability_id = availability.id
        JOIN weapon_weapon_class wwc ON wwc.weapon_id = weapon.id
        JOIN weapon_class ON weapon_class.id = wwc.weapon_class_id

        GROUP BY weapon.id, category.id, availability.id
    `);

        const weapons = result.rows;

        return res.status(200).json(weapons);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'server error', error: error.message });
    }
});

router.post("/api/weapons", async (req,res) => {
    try {
        const { weapon_class, type, category, name, hands, rof, damage, pen, clip, reload, wt, availability, projectile} = req.body;

        if (!name ) { //add more 
        return res.status(400).send({ message: 'missing fields' })
        }

        const is_custom = req.session.user?.role === "ADMIN" || false

            const result = await db.query(
            `INSERT INTO weapon (weapon_class_id, type, category_id, "name", hands, rof, damage, pen, clip, reload, wt, availability_id , projectile_id) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 ,$12 ,$13, $14) RETURNING *`,
            [weapon_class.id, type, category.id, name, hands, rof, damage, pen, clip, reload, wt, availability.id, projectile.id , is_custom]
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
        const { weapon_class_id,type, category, name, hands, rof, damage, pen, clip, reload, wt, availability, projectile } = req.body;


        const is_custom = req.session.user?.role === "ADMIN" || false

        await db.query( `UPDATE weapon SET weapon_class_id = $1, type = $2, category_id = $3, name = $4, hands = $5, rof = $6, damage = $7, pen = $8,
        clip = $9, reload = $10, wt = $11, availability_id = $12, projectile_id = $13, is_custom =$14, WHERE id = $15 RETURNING *`, 
        [weapon_class.id, type, category.id, name, hands, rof, damage, pen, clip, reload, wt, availability.id, projectile.id , is_custom, id]);

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
            `DELETE FROM weapon where id = $1 `, [id],
        )

        return res.status(200).send({ message: 'aptitude deleted' })
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'server error', error: error.message })     
    }
})

export default router
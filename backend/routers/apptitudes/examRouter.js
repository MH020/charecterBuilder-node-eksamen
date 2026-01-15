import { Router } from "express";

const router = Router()


router.get("/exam", (req,res) => {
    res.send({data:  Date.now().toLocaleString()} )
   
})
export default router
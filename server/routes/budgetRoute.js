const express=require("express")
const MaxBudget=require("../models/MaxBudget")
const router=express.Router();

router.post("/maxbudget",async(req,res)=>{
    try{
const newBudget=new MaxBudget(req.body)
await newBudget.save();
res.send("Budget added successfully")

    }
    catch(error){
        res.status(500).json(error)
    }
})


module.exports=router;
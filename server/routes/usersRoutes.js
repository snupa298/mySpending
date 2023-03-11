const express=require("express")
const User=require("../models/User")
const router=express.Router();

router.post("/login",async(req,res)=>{
    try{
const result = await User.findOne({
    email:req.body.email,
    password:req.body.password
})
if(result){
    // localStorage.setItem("SnupaSpending",JSON.stringify({...result.data,password:""}))
res.send(result)
}else{
res.status(500).json("Error")
}
    }
    catch(error){
        res.status(500).json(error)
    }
})

router.post("/register",async(req,res)=>{
    try{
const newUser=new User(req.body)
await newUser.save();
res.send("User registered successfully")

    }
    catch(error){
        res.status(500).json(error)
    }
})

module.exports=router;
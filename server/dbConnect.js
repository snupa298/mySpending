const mongoose=require("mongoose")

mongoose.connect('mongodb://localhost:27017/snupaspending',{useNewUrlParser:true,useUnifiedTopology:true})

const connection= mongoose.connection
connection.on('error',err=>console.log(err))

connection.on('connected',()=>console.log("Mongo db connected"))
const express=require("express")
const dbConnect=require("./dbConnect")
const app=express()
const PORT=8000
 const userRoute = require("./routes/usersRoutes")
const transactionRoute = require("./routes/transactionsRoute")
const maxbudgetRoute = require("./routes/budgetRoute")

app.use(express.json())

app.use('/api/users',userRoute)
app.use('/api/tr',transactionRoute)
app.use('/api/max',maxbudgetRoute)

//app.get("/",(req,res)=>res.send("Hello wrldo"))
app.listen(PORT,()=>console.log("Server started")) 
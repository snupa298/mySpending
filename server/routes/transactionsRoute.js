const express=require("express")
const Transaction=require("../models/Transaction")
const User=require("../models/User")
const MaxBudget=require("../models/MaxBudget");
const TotalSavings=require("../models/TotalSavings")
const moment = require("moment/moment");
const router=express.Router();



router.post("/addtrans",async(req,res)=>{
    try{
const newTran=new Transaction(req.body)
await newTran.save();
res.send("User registered successfully")

    }
    catch(error){
        res.status(500).json(error)
    }
})

router.post("/edit-transaction", async function (req, res) {
    try {
      await Transaction.findOneAndUpdate({_id : req.body.transactionId} , req.body.payload)
      res.send("Transaction Updated Successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  });

  router.post("/delete-transaction", async function (req, res) {
    try {
      await Transaction.findOneAndDelete({_id : req.body.transactionId})
      res.send("Transaction Deleted Successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  });

router.post("/getalltrans",async(req,res)=>{
    const{frequency}=req.body;
    try{
        const transactions = await Transaction.find({
            userId:req.body.userId,
            ...frequency && {
                date:{
                    $gt:moment().subtract(Number(req.body.frequency),'d').toDate()
                }
            }
        })
        res.status(200).json({
            success: true,
           transactions
   
    })
}
    catch(error){
        res.status(500).json(error)
    }
})

router.post("/transofmonth",async(req,res)=>{
    try{
      
        const transactions = await Transaction.find({userId:req.body.userId})

        const d = new Date();
let month = d.getMonth();

const transInThisMonth = transactions.filter(transaction=>
    transaction.date.getMonth() === month
)

       let totalAmount = 0;

        transInThisMonth.forEach(transaction => {
            totalAmount += transaction.amount
        })

        const maxBudget=await MaxBudget.find({userId:req.body.userId})
         const thisMonthMaxBudget=maxBudget.find(max=> max.date.getMonth()=== month)
      monthlyBudget=thisMonthMaxBudget.budget

         const remAmount=monthlyBudget-totalAmount;
      
        res.status(200).json({
            success: true,
           
           totalAmount,
           thisMonthMaxBudget,
   monthlyBudget,
   remAmount,
   
        })
    }
    catch(error){
        res.status(500).json(error)
    }
})

router.post("/transoflastmonth",async(req,res)=>{
    try{
      
        const transactions = await Transaction.find({userId:req.body.userId})

        const date = new Date()
        date.setMonth(date.getMonth() - 1);
        date.setFullYear(date.getFullYear())
 const month=date.getMonth()
 const year=date.getFullYear()

// console.log(month)
// console.log(year)

if(month === 11){
     transInLastMonth = transactions.filter(transaction=>
        (transaction.date.getMonth() === month && transaction.date.getFullYear() === year)
    )
}
else{
     transInLastMonth = transactions.filter(transaction=>
        transaction.date.getMonth() === month
    )
}

//console.log(transInLastMonth)
       let totalAmount = 0;

        transInLastMonth.forEach(transaction => {
            totalAmount += transaction.amount
        })
//console.log(totalAmount)
        const maxBudget=await MaxBudget.find({userId:req.body.userId})
         const lastMonthMaxBudget=maxBudget.find(max=> max.date.getMonth()  === month)
      monthlyBudget=lastMonthMaxBudget.budget


         const remAmount=monthlyBudget-totalAmount;
         

        res.status(200).json({
            success: true,
           transInLastMonth,
           totalAmount,
           lastMonthMaxBudget,
   monthlyBudget,
   remAmount,
   
        })
    }
    catch(error){
        res.status(500).json(error)
    }
})

router.post("/updatetotalsavings",async(req,res)=>{
  

    //check if user already exists
const user=await TotalSavings.findOne({userId:req.body.userId})

//if new user add new entry to total saving table
if(!user){
const maxBudget=await MaxBudget.findOne({userId:req.body.userId})
const total=maxBudget.budget-req.body.newSpending

const saving=new TotalSavings({userId:req.body.userId,savings:total,lastUpdatedDate:new Date(),firstUsedDate:new Date()})
await saving.save();

}
//If user exists
else{
const totalSaving = await TotalSavings.findOne({userId:req.body.userId})

const monthdiff=getmonthdiff(totalSaving.lastUpdatedDate)
//console.log(monthdiff)
//check new trn in same month
let newSaving
if(monthdiff === 0){
     newSaving = totalSaving.savings - req.body.newSpending
}

else{
     newSaving = (totalSaving.savings * monthdiff) - req.body.newSpending
}
//update table
totalSaving.savings = newSaving


const newvalues =  {$set:{ savings: newSaving },} ;
console.log(newvalues)

 await TotalSavings.updateOne({userId:req.body.userId},newvalues)

  //console.log(newSaving)
  res.json({
    success:true,
    savings: newSaving,

   
})
}


})


router.post("/gettotalsavings",async(req,res)=>{

    try{
        const totalSavings = await TotalSavings.findOne({
            userId:req.body.userId
        })
        res.status(200).json({
            success: true,
           totalSavings
   
    })
}
    catch(error){
        res.status(500).json(error)
    }
})

const getmonthdiff = function(past_date){

    var current_date = new Date();
    
    return (current_date.getFullYear()*12 + current_date.getMonth()) - (past_date.getFullYear()*12 + past_date.getMonth());
    }


module.exports=router;
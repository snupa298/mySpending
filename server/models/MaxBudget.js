const mongoose=require("mongoose")

const budgetSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    budget:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
})

const budgetModel = mongoose.model('Budget',budgetSchema)

module.exports=budgetModel;
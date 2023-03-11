const mongoose=require("mongoose")

const totalSavingsSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    savings:{
        type:Number,
        required:true
    },
    lastUpdatedDate:{
        type:Date,
        required:true
    },
    firstUsedDate:{
        type:Date,
        required:true
    }
})

const totalSavingsModel = mongoose.model('TotalSavings',totalSavingsSchema)

module.exports=totalSavingsModel;
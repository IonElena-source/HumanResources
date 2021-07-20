const mongoose=require("mongoose")
const cerereSchema=mongoose.Schema({
    Denumire_Raport:{
        type:String
    },
    An:{
        type:Number
    },
    Analiza:{
        type:String
    }
})
module.exports=mongoose.model("Raport",cerereSchema)
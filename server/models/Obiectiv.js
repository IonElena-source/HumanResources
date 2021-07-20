const mongoose=require("mongoose")
const obiectiveSchema=mongoose.Schema({
    Id_Angajat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Angajat"
    },
    Nume:{
        type:String
    },
    Rezultate:{
        type:Array
    },
    Data:{
        type:String
    }
   
})

module.exports=mongoose.model("Obiectiv",obiectiveSchema)
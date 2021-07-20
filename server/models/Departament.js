const mongoose=require("mongoose")
const departamentSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    Nume:{
        type:String,
        require:true
    },
    Numar_Angajati:{
        type:Number,
        require:true
    },
    Nume_Reprezentant:{
        type:String
    },
    Prenume_Reprezentant:{
        type:String
    }
}) 
module.exports=mongoose.model("Departament",departamentSchema)
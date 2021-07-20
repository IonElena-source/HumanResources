const mongoose=require("mongoose")
const contractSchema=mongoose.Schema({
    Id_Angajat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Angajat"
    },
    Norma:{
        type:String
    },
    Tura_Inceput:{
        type:String
    },
    Tura_Sfarsit:{
        type:String
    },
    Data_Salariu:{
        type:String
    },
    Data_Angajare:{
        type:String
    },
    Cod_Angajat_Acces:{
        type:String
    }
})

module.exports=mongoose.model("Contract",contractSchema)
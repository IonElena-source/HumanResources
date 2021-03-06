const mongoose=require("mongoose")
const jobSchema=mongoose.Schema({
    Departament:{
        type:String
    },
    Titlu:{
        type:String
    },
    Descriere:{
        type:String
    },
    Responsabilitati:{
        type:Array
    },
    Cerinte:{
        type:Array
    },
    Experienta:{
        type:String
    },
    Locatie:{
        type:String
    },
    Tip_Job:{
        type:String
    },
    Nivel_Studii:{
        type:String
    },
    Salariu_Net:{
        type:String
    },
    Perioada_Aplicare_Inceput:{
        type:String
    },
    Perioada_Aplicare_Sfarsit:{
        type:String
    },
    Perioada_Postare:{
        type:String
    },
    Nr_Locuri:{
        type:Number
    },
    Algoritm:{
        type:String
    },
    Algoritm_Romana:{
        type:String
    },
  
})
module.exports=mongoose.model("Job",jobSchema)
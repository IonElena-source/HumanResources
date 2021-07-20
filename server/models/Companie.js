const mongoose=require("mongoose")

const companieSchema=mongoose.Schema({
    NumeCompanie:{
        type:String
    },
    MijlocTransport:{
        type:String
    },
    Locatie:{
        type:String
    },
    Adresa:{
        type:String
    },
    Numar_Angajati:{
        type:Number
    },
    Cifra_Afaceri:{
        type:Number
    },
    Ora_Inceput_Restrictie:{
        type:"String"
    },
    Ora_Sfarsit_Restrictie:{
        type:String
    },
    Motiv:{
        type:Boolean
    }

})
module.exports=mongoose.model("Companie",companieSchema)
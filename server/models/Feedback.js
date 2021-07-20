const mongoose=require("mongoose")
const feedbackSchema=mongoose.Schema({
    Data_Incident:{
        type:String
    },
    Ora_Incident:{
        type:String
    },
    Locatie_Incident:{
        type:String
    },
    Incident_Detalii:{
        type:String
    },
    Martori_Incident:{
        type:String
    },
    Sugestii:{
        type:String
    },
    Comentarii:{
        type:String
    },
    Angajat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Angajat",
    }



})
module.exports=mongoose.model("Feedback",feedbackSchema)
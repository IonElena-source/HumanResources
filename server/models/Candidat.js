const mongoose=require("mongoose")
const candidatSchema=mongoose.Schema({
    Id_Job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job"
    },
    Nume_Complet:{
        type:String
    },
    Data_Aplicare:{
        type:String
    },
    Email:{
        type:String
    },
    Cv:{
        type:String
    },
    Scor:{
        type:String
    },
    Tip_Cv:{
        type:String
    },
    Status:{
        type:String
    }

})

module.exports=mongoose.model("Candidat",candidatSchema)
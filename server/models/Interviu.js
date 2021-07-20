const mongoose=require("mongoose")
const interviuSchema=mongoose.Schema({
    Nume_Candidat:{
        type:String,
      
    },
    Email_Candidat:{
        type:String,
       
    },
    Data:{
        type:String,
        require:true
    },
    Ora:{
        type:String,
        
    },
    Tip_Interviu:{
        type:String
    },
    Locatie:{
        type:String,
       
    }
 

})

module.exports=mongoose.model("Interviu",interviuSchema)
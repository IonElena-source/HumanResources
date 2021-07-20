const mongoose=require("mongoose")
const evenimentSchema=mongoose.Schema({
    Tip_Eveniment:{
        type:String
    },
    Data:{
        type:String
    },
    Ora:{
        type:String
    },
    Locatie:{
        type:String
    },
    Descriere:{
        type:String
    },
    Participanti:{
        type:Array
    },
   

})

module.exports=mongoose.model("Eveniment",evenimentSchema)
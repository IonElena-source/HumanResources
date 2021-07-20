const mongoose=require("mongoose")
const utilizatorSchema=mongoose.Schema({
    Email:{
        type:String,
        required:true,
        unique:true
        
    },
    Parola:{
        type:String,
        required:true
    }
  
})

module.exports=mongoose.model("Utilizator",utilizatorSchema)
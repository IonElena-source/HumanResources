const mongoose=require("mongoose")
const semnaturaSchema=mongoose.Schema({
    Id_Angajat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Angajat"
    },
    dataURL:{
        type:String
    },
    dataSemnatura:{
        type:String
    }
})

module.exports=mongoose.model("Semnatura",semnaturaSchema)
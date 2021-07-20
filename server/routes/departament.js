const express=require("express")
const Departament=require("../models/Departament")
const mongoose=require("mongoose")

const departamenteRouter=express.Router()

departamenteRouter.post("/",(req,res,next)=>{
    const departament=new Departament({
        _id:new mongoose.Types.ObjectId(),
        Nume:req.body.Nume_Departament,
        Numar_Angajati:req.body.Numar_Angajati,
        Nume_Reprezentant:req.body.Nume_Reprezentant,
        Prenume_Reprezentant:req.body.Prenume_Reprezentant
        
    })
    departament.save().then(result=>res.json(result)).catch(err=>{res.json({error:err})})
})

departamenteRouter.get("/",(req,res,next)=>{
    Departament.find().exec().then(result=>res.json(result)).catch(err=>console.log(err))
})

module.exports=departamenteRouter
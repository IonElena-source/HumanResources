const express = require("express")
const Interviu = require("../models/Interviu")
const interviuriRouter = express.Router()


//adaugarea interviui
interviuriRouter.post("/",(req,res)=>{
    let interviu=new Interviu({
        Nume_Candidat:req.body.Nume_Candidat,
        Email_Candidat:req.body.Email_Candidat,
        Data:req.body.Data,
        Ora:req.body.Ora,
        Tip_Interviu:req.body.Tip_Interviu,
        Locatie:req.body.Locatie
    })
    interviu.save().then((result)=>{
        return res.status(200).json({
            succes:true,
            interviu:result
        })
    }).catch((err)=>{console.log(err)})
})

interviuriRouter.get("/",(req,res)=>{
    Interviu.find().then((result)=>{
            return res.status(200).json({
                succes:true,
                interviuri:result
            })
    })
})

module.exports=interviuriRouter
const express = require("express")
const Companie = require("../models/Companie")
const companieRouter = express.Router()


//introducere date despre companie si restrictii
companieRouter.post("/",(req,res)=>{
    let companie=new Companie({
        NumeCompanie:req.body.NumeCompanie,
        MijlocTransport:req.body.MijlocTransport,
        Locatie:req.body.MijlocTransport,
        Adresa:req.body.Adresa,
        Ora_Inceput_Restrictie:req.body.Ora_Inceput_Restrictie,
        Ora_Sfarsit_Restrictie:req.body.Ora_Sfarsit_Restrictie,
        Motiv:req.body.Motiv
    })
    companie.save().then((result)=>{
        return res.status(200).json({
            succes:true,
            companie:result
        })
    }).catch((err)=>{console.log(err)})
})

//regaseste toate inregistrarile cu detaliile companiei
companieRouter.get("/",(req,res)=>{
    Companie.find({}).then((response)=>{
        return res.status(200).json({
            succes:true,
            istoric:response
        })
    }).catch((err)=>{console.log(err)})
})

module.exports=companieRouter
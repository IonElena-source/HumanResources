const express = require("express")
const Obiectiv = require("../models/Obiectiv")
const obiectiveRouter = express.Router()


//adaugarea interviui
obiectiveRouter.post("/", (req, res) => {
    let obiectiv = new Obiectiv({
        Id_Angajat: req.body.Id_Angajat,
        Nume:req.body.Nume,
        Data: req.body.Data,
        Rezultate:req.body.Rezultate
        
    })
    obiectiv.save().then((result) => {
        return res.status(200).json({
            succes: true,
            obiectiv: result
        })
    }).catch((err) => { console.log(err) })
})

obiectiveRouter.get("/",(req,res)=>{
    Obiectiv.find().then((result)=>{
        return res.status(200).json({
            succes:true,
            obiective:result
        })
    })
})

obiectiveRouter.get("/:id_angajat",(req,res)=>{
    Obiectiv.find({Id_Angajat:req.params.id_angajat}).then((result)=>{
        return res.status(200).json({
            succes:true,
            obiective:result
        })
    }).catch((err)=>{
        return res.status(400).json({
            succes:false
        })
    })
})


obiectiveRouter.patch("/actualizeazaScor/:id_obiectiv",(req,res)=>{
    Obiectiv.findOneAndUpdate({_id:req.params.id_obiectiv},{
        Nume:req.body.Nume,
        Data:req.body.Data,
        Rezultate:req.body.Rezultate
    }).then(()=>{
        return res.status(200).json({
            succes:true
        })
    })
})
module.exports = obiectiveRouter
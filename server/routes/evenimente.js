const express = require("express")
const Eveniment = require("../models/Eveniment")
const evenimenteRouter = express.Router()


//adaugarea interviui
evenimenteRouter.post("/", (req, res) => {
    let eveniment = new Eveniment({
        Tip_Eveniment: req.body.Tip_Eveniment,
        Data: req.body.Data,
        Ora: req.body.Ora,
        Locatie: req.body.Locatie,
        Participanti: req.body.Participanti,
        Descriere:req.body.Descriere
    })
    eveniment.save().then((result) => {
        return res.status(200).json({
            succes: true,
            eveniment: result
        })
    }).catch((err) => { console.log(err) })
})

evenimenteRouter.get("/",(req,res)=>{
    Eveniment.find().then((result)=>{
        return res.status(200).json({
            succes:true,
            evenimente:result
        })
    })
})

//put pt event, astfel incat sa pot vectorul de participanti din fiecare eveniment
evenimenteRouter.put("/:id",(req,res)=>{
    Eveniment.findOneAndUpdate({_id:req.params.id},{
        Tip_Eveniment:req.body.Tip_Eveniment,
        Data:req.body.Data,
        Ora:req.body.Ora,
        Locatie:req.body.Locatie,
        Descriere:req.body.Descriere,
        Participanti:req.body.Participanti
    }).then((result)=>{
        return res.status(200).json({
            succes:true,
            evenimente:result
        })
    })
})
module.exports = evenimenteRouter
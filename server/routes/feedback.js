const express = require("express")
const Feedback = require("../models/Feedback")
const feedbackRouter = express.Router()


feedbackRouter.post("/adaugaFeedback", (req, res) => {
    let feedback = new Feedback({
        Data_Incident:req.body.Data_Incident,
        Ora_Incident:req.body.Ora_Incident,
        Locatie_Incident:req.body.Locatie_Incident,
        Martori_Incident:req.body.Martori_Incident,
        Incident_Detalii:req.body.Incident_Detalii,
        Sugestii:req.body.Sugestii,
        Comentarii:req.body.Comentarii,
        Angajat:req.body.Angajat

    })
    feedback.save().then(() => {
        return res.status(200).json({
            title: "cerere inserata"
        })
    }).catch(err => {
        return res.status(400).json({
            title: "error",
            error: "Cererea neinserata"
        })

    })
})

feedbackRouter.get("/",(req,res)=>{
    Feedback.find().populate("Angajat").then((result) => {
        return res.status(200).json({
            succes: true,
            feedbacks: result
        })
    }).catch(err => {
        console.log(err)
    })
})

feedbackRouter.get("/:id_angajat",(req,res)=>{
    Feedback.find({Angajat:req.params.id_angajat}).then((result) => {
        return res.status(200).json({
            succes: true,
            feedbacks: result
        })
    }).catch(err => {
        console.log(err)
    })
})





module.exports = feedbackRouter
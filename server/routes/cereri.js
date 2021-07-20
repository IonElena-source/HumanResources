const express = require("express")
const Cerere = require("../models/Cerere")
const cereriRouter = express.Router()


cereriRouter.post("/adaugaCerere", (req, res) => {
    let cerere = new Cerere({
        Tip_Cerere: req.body.Tip_Cerere,
        Angajat: req.body.Angajat,
        Data_Inceput: req.body.Data_Inceput,
        Data_Sfarsit: req.body.Data_Sfarsit,
        Data_Trimitere: req.body.Data_Trimitere,
        Cauza_Concediu: req.body.Cauza_Concediu,
        Mesaj: req.body.Mesaj,
        Status: req.body.Status

    })
    cerere.save().then(() => {
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

//regaseste  toate cererile
cereriRouter.get("/regasesteCereri", (req, res) => {
    Cerere.find().populate("Angajat").then((result) => {
        return res.status(200).json({
            succes: true,
            cereri: result
        })
    }).catch(err => {
        console.log(err)
    })
})

//regaseste cereri dupa angajat
cereriRouter.get("/regasesteCereri/:Id_Angajat", (req, res) => {
    Cerere.find({ Angajat: req.params.Id_Angajat }).then(result => {
        return res.status(200).json({ cereri: result })
    })
})


//ruta de filtrare a cererilor
cereriRouter.get("/filtrareCereri/:Id_Angajat/:Status", (req, res) => {
    Cerere.find({ Angajat: req.params.Id_Angajat, Status: req.params.Status }).then(result => {
        return res.status(200).json({ cereri: result })
    })
})

//regaseste cereri in asteptare pentru manager
cereriRouter.get("/regasesteCereriNeverificate", (req, res) => {
    Cerere.find({ Status: "In asteptare" }).populate("Angajat").then((result) => {
        return res.status(200).json({
            succes: true,
            cereri: result
        })
    }).catch(err => {
        console.log(err)
    })
})


///ruta de aprobare a cererii-daca aprob cererea o si sterg din lista
cereriRouter.put("/aprobaCerere/:Id_Cerere", (req, res) => {
    Cerere.findOneAndUpdate({ _id: req.params.Id_Cerere }, { Status: "Aprobata" }).then(() => {
        return res.status(200).json({
            mesaj:"Cerere aprobata"
        })
    })
})

//cerere pentru respingere
cereriRouter.put("/respingeCerere/:Id_Cerere", (req, res) => {
    Cerere.findOneAndUpdate({ _id: req.params.Id_Cerere }, { Status: "Respinsa" }).then(() => {
        return res.status(200).json({
            mesaj:"Cerere aprobata"
        })
    })
})




module.exports = cereriRouter
const mongoose = require("mongoose")
const express = require("express")
const fs = require('fs');
var mammoth = require("mammoth")
const pdf = require('pdf-parse');
const nodemailer = require('nodemailer');
const Raport = require("../models/Raport")
const rapoarteRouter = express.Router()
const multer = require("multer");
const { response } = require("express");
const { spawn } = require('child_process');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../server');
        cb(null, '../client/public/files');
    },
    filename: function (req, file, cb) {
        cb(null, req.params.An + file.originalname);

    }
});

var upload = multer({ storage: storage })


rapoarteRouter.post("/adaugaRaport/:An", upload.single('file'), (req, res) => {

    const raport = new Raport({
        Denumire_Raport: req.params.An + req.file.originalname,
        An: req.body.An,
        Analiza:""

    })

    raport.save().then(() => {

        res.json({ cool: "yeah" })
    }).catch((err) => console.log(err))

})
rapoarteRouter.get("/", (req, res) => {
    Raport.find().then((result) => {
        return res.status(200).json({
            succes: true,
            rapoarte: result
        })
    })
})


rapoarteRouter.get("/gasesteDupaAn/:An", (req, res) => {
    Raport.findOne({ An: req.params.An }).then((result) => {
        return res.status(200).json({
            raportGasit: result
        })
    })
})

// rapoarteRouter.get("/previziune/:numeFisier", (req, res) => {
//     const childPython = spawn('python', ['./routes/predictie.py', `${req.params.numeFisier}`]);
//     childPython.stdout.on('data', (data) => {
//         console.log(data.toString())
//         return res.status(200).json({
//             dataPy: data.toString()
//         })
//     });

//     childPython.stderr.on('data', (data) => {
//         console.error(`stderr: ${data}`);
//     });


//     childPython.on('close', (code) => {
//         console.log(`child process exited with code ${code}`);
//     });

// })

//trimit anul si mi analizeaza raportul

rapoarteRouter.put("/actualizeazaAnaliza/:id",(req,res)=>{
    Raport.findOne({ _id: req.params.id },{
        Denumire_Raport: req.body.Denumire_Raport,
        An: req.body.An,
        Analiza:JSON.stringify(req.body.Analia)
    }).then((result) => {
        return res.status(200).json({
            raportGasit: result
        })
    })
})
module.exports = rapoarteRouter
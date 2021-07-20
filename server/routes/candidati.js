const mongoose = require("mongoose")
const express = require("express")
const fs = require('fs');
var mammoth = require("mammoth")
const pdf = require('pdf-parse');
const nodemailer = require('nodemailer');

const candidatiRouter = express.Router()
const multer = require("multer")
var storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, '../client/public/files');
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname);
   }
});

var upload = multer({ storage: storage })

const Candidat = require("../models/Candidat");


candidatiRouter.post("/:Id_Job", upload.single('file'), (req, res) => {
   var tip_cv = ""
   if (req.file.mimetype == "application/pdf") {
      tip_cv = "PDF"
   }
   else {
      tip_cv = "WORD"
   }
   const candidat = new Candidat({
      Id_Job: req.params.Id_Job,
      Nume_Complet: req.body.NumeComplet,
      Email: req.body.Email,
      Cv: req.file.originalname,
      Scor: JSON.stringify({}),
      Tip_Cv: tip_cv,
      Status: req.body.Status
   })


   candidat.save().then(() => {
      console.log(req.file)
      console.log("body")
      console.log(req.body)
      res.json({ cool: "yeah" })
   }).catch((err) => console.log(err))

})


//regasire candidati

candidatiRouter.get("/:Id_Job", (req, res) => {
   Candidat.find({ Id_Job: req.params.Id_Job, Status: "In asteptare" }).then((result) => {
      return res.status(200).json({ candidati: result })
   }).catch((err) => console.log(err))
})

//regasire candidati filtrati
candidatiRouter.get("/", (req, res) => {
   Candidat.find({ Status: "Programat pentru interviu" }).then((result) => {
      return res.status(200).json({ candidati: result })
   }).catch((err) => console.log(err))
})


//trimitere candidat la manager

candidatiRouter.patch("/editCandidat/:Id_Candidat", (req, res) => {
   Candidat.findOneAndUpdate({ _id: req.params.Id_Candidat }, {
      Status: "Programat pentru interviu",
      Scor:JSON.stringify(req.body.Scor)
   }).then((result) => {
      return res.status(200).json({
         succes: true,
         candidat:result,
       
      })
   })
})



//transformarea cv-ului candidatatului in text
candidatiRouter.get("/extractText/:Id_Candidat", (req, res) => {
   Candidat.findOne({ _id: req.params.Id_Candidat }).then((candidat) => {
      
      var textCv = ""
      if (candidat.Tip_Cv == "PDF") {
         let dataBuffer = fs.readFileSync(`../client/public/files/${candidat.Cv}`);
         pdf(dataBuffer).then(function (data) {
            return res.json({
               text: data.text
            })
         });
      }
      else {
         var textWord = ""
         mammoth.extractRawText({ path: `../client/public/files/${candidat.Cv}` })
            .then(function (result) {
               var text = result.value; 
               console.log(text);
               textWord = text
               var messages = result.messages;
               return res.json({
                  text: textWord
               })
            })

      }

   })
})

//primesc candidatul carui ii dau mail
candidatiRouter.patch("/trimiteMail", (req, res) => {
   var nodemailer = require('nodemailer');

   var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: 'ionelenaemp99@gmail.com',
         pass: 'licenta1234'
      }
   });

   var mailOptions = {
      from: 'ionelenaemp99@gmail.com',
      to: 'ionelena18@stud.ase.ro',
      subject: 'Sending Email using Node.js',
      text: '!Bună, Îți mulțumim că vrei să lucrezi la Ab4 Systems și pentru timpul acordat discuției noastre telefonice.M-am bucurat să aflu mai multe despre tine și despre experiența ta profesională.Îmi pare rău să îți spun, totuși, că nu vom continua cu aplicația ta pentru rolul acesta. Până atunci, îți urez mult success în găsirea unui job care să-ți scoată calitățile în evidență.Cu drag, Ion Elena Cristina-angajat HR'
   };

   transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
         console.log(error);
      } else {
         console.log('Email sent: ' + info.response);
      }
   });
})

//stergere candidat
candidatiRouter.delete("/respingeCandidat/:Id_Candidat",(req,res)=>{
   Candidat.findByIdAndDelete({_id:req.params.Id_Candidat}).then(()=>{
      return res.status(200).json({
         succes:true
      })
   }).catch((err)=>console.log(err))
})

candidatiRouter.get("/findCandidat/:Id_Candidat",(req,res)=>{
   Candidat.findOne({_id:req.params.Id_Candidat}).then((result)=>{
      return res.status(200).json({
         succes:true,
         candidat:result
      })
   }).catch((err)=>console.log(err))
})


module.exports = candidatiRouter
const express = require("express")
const mongoose = require("mongoose")
const manageriRouter = express.Router()
const bycript = require("bcryptjs")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const passport = require("passport")
const key = require("../config/keys").secret
const Utilizator = require("../models/Utilizator")
const Angajat = require("../models/Angajat")
const Semnatura =require("../models/Semnatura")
//-------------------inregistrare si autentificare--------
//register
manageriRouter.post("/register", (req, res, next) => {
    const newUser = new Utilizator({
        NumeUtilizator: req.body.NumeUtilizator,
        Email: req.body.Email,
        Parola: bcrypt.hashSync(req.body.Parola, 10)
    })

    newUser.save().then(() => {
        return res.status(200).json({
            title: "signup succes"
        })
    }).catch(err => {
        return res.status(400).json({
            title: "error",
            error: "Email deja inregistrat"
        })
    })


})

//login
manageriRouter.post("/login", (req, res, next) => {
    Utilizator.findOne({ Email: req.body.Email }, (err, user) => {
        if (err) {
            return res.status(500).json({
                title: "Server error",
                error: err
            })
        }
        if (!user) {
            return res.status(401).json({
                title: "User not found",
                error: "Email ul nu a fost gasit"
            })
        }
        if (!bcrypt.compareSync(req.body.Parola, user.Parola)) {
            return res.status(401).json({ title: "login failed", error: "Parola incorecta" })
        }
        else {
            let token = jwt.sign({ userId: user._id }, "myTopSecret")
            return res.status(200).json({
                title: "Login succes",
                token: token
            })
        }
    })
})

//ruta de profile
manageriRouter.get('/profileManager', (req, res, next) => {
    console.log("Token")
    console.log(req.headers.token)
    let token = req.headers.token; //token
    jwt.verify(token, 'myTopSecret', (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthorized',
            error: err
        })
        //token is valid
        Utilizator.findOne({ _id: decoded.userId }, (err, user) => {
            if (err) return console.log(err)
            return res.status(200).json({
                title: 'user grabbed',
                utilizator: user
            })
        })
         
    })
})



//-------------------inregistrare si autentificare--------/



//ruta de adaugare a unui manager
manageriRouter.post("/", (req, res, next) => {
    const managerNou = new Angajat({
        _id: mongoose.Types.ObjectId(),
        Nume: req.body.Nume,
        Prenume: req.body.Prenume,
        Adresa: req.body.Adresa,
        Telefon: req.body.Telefon,
        Sex: req.body.Sex,
        CNP: req.body.CNP,
        Data_Nastere: req.body.Data_Nastere,
        Email: req.body.Email,
        Functie: req.body.Functie,
        Departament: req.body.Departament,
        Salariu_Incadrare: req.body.Salariu_Incadrare

    })
    Angajat.findOne({ CNP: req.body.CNP }).then(gasit => {
        if (gasit) {
            return res.status(401).json({
                succes: false,
                msg: "Acest angajat exista deja"
            })
        }
        else {
            managerNou.save().then(result => res.json(managerNou))
                .catch(err => console.log(err))

        }
    })


})

//gasire managel dupa Email
manageriRouter.get("/findByEmail/:Email", (req, res) => {
    Angajat.findOne({ Email: req.params.Email }).then(angajat => {
        if (angajat) {
            return res.status(200).json({
                status: true,
                angajatGasit: angajat
            })
        }
        else
        {
            return res.status(401).json({ title: "login failed", error: "Email-ul nu a fost gasit" })
        }

    }).catch(err => console.log(err))
})


manageriRouter.post("/adaugaSemnatura",(req,res)=>{
    const semnatura=new Semnatura({
        Id_Angajat:req.body.Id_Angajat,
        dataURL:bycript.hashSync(req.body.dataURL,10),
        dataSemantura:req.body.dataSemantura
    })
    Semnatura.findOne({
        dataURL:req.body.dataURL
    }).then(semanturaGasita=>{
        if(semanturaGasita)
        {
            return res.status(401).json({succes:false,error:"Semnatura deja inserata"})
        }
        else{

            semnatura.save().then(result=>res.json({semnaturaInserata:result}))
        }
    })
})


//regaseste ultima semnatura
manageriRouter.get("/semnatura/:Id_Angajat",(req,res)=>{
    Semnatura.find({Id_Angajat:req.params.Id_Angajat}).exec().then(result=>{
        bycript.compare()
        let semnatura=result.pop()
        let semanturaDecriptata=bycript.decodeBase64(semnatura.dataURL,10)
        return res.status(200).json({semnaturi:semanturaDecriptata})
    })
})

manageriRouter.put("/update/:Email",(req,res)=>{
    Angajat.findOneAndUpdate({Email:req.params.Email},{
        Nume:req.body.Nume,
        Prenume:req.body.Prenume,
        Telefon:req.body.Telefon,
        Adresa:req.body.Adresa,
        Email:req.body.Email,
        Semnatura:req.body.Semnatura
    }).then(result=>{
        return res.status(200).json({succes:true,modificat:result})
    }).catch(err=>console.log(err))

    Utilizator.findOneAndUpdate({Email:req.params.Email},{Email:req.body.Email}).then(result=>{
        console.log(result)
    })
})


module.exports = manageriRouter
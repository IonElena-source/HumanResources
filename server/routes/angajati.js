const mongoose = require("mongoose")
const express = require("express")
const angajatiRouter = express.Router()
const bycript = require("bcryptjs")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const passport = require("passport")
const Utilizator = require("../models/Utilizator")
const Angajat = require("../models/Angajat")

//-------------------inregistrare si autentificare--------/


angajatiRouter.post("/register", (req, res, next) => {

    Angajat.findOne({ Email: req.body.Email }).then(angajatGasit => {
        if (!angajatGasit) {
            return res.status(201).json({
                succes: false,
                title: "error",
                error: "Nu sunteti angajat in aceasta firma"
            })
        }
        else {
            const newUser = new Utilizator({
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

        }
    })


})

//login
angajatiRouter.post("/login", (req, res, next) => {
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
                error: "Email-ul nu a fost gasit"
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
angajatiRouter.get('/profileAngajat', (req, res, next) => {
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


//adaugare angajat
angajatiRouter.post("/", (req, res, next) => {
    const angajatNou = new Angajat({
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
        Salariu_Incadrare: req.body.Salariu_Incadrare,
        Poza_Profil: req.body.Poza_Profil,
        Semnatura: req.body.Semnatura
    })

    angajatNou.save().then(angajatNou => {
        return res.status(200).json({
            succes: true,
            msg: "Angajat inserat",
            angajatInserat: angajatNou
        })
    })
        .catch(err => console.log(err))





})


//ruta de regasire angajat dupa id
angajatiRouter.get("/:id", (req, res) => {
    Angajat.findById({ _id: req.params.id }).then(angajat => {
        return res.status(200).json({
            status: true,
            angajatGasit: angajat
        })
    })
})

angajatiRouter.get("/findByEmail/:Email", (req, res) => {
    Angajat.findOne({ Email: req.params.Email }).then(angajat => {
        if (angajat) {
            return res.status(200).json({
                status: true,
                angajatGasit: angajat
            })
        }
        else {
            return res.status(401).json({
                succes: false,
                msg: "Email-ul nu a fost gasit"
            })
        }

    }).catch(err => console.log(err))
})

//regasesteAngajati
angajatiRouter.get("/", (req, res) => {
    Angajat.find({}).then((response) => {

        return res.status(200).json({
            succes: true,
            angajati: response.filter(angajat=> angajat.Functie!="Manager")
        })
    })
        .catch(err => console.log(err))


})


//ruta de a edita poza profil
const multer = require("multer")
const { response } = require("express")
var storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, '../client/src/profiles');
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname);
   }
});
var upload = multer({ storage: storage })

angajatiRouter.patch("/:id_angajat",upload.single('file'),(req,res)=>{
    Angajat.findOneAndUpdate({_id:req.params.id_angajat},{
            Poza_Profil:req.file.originalname
    }).then(()=>{
        return res.status(200).json({
            succes:true
        })
    })
    .catch((err)=>console.log(err))
})

//regasire manager
angajatiRouter.put("/managerSemnatura",(req,res)=>{
    Angajat.find().then((response)=>{
        return res.status(200).json({
            succes: true,
            manageri: response.filter(angajat=> angajat.Functie=="Manager")
        })
    })
})

module.exports = angajatiRouter
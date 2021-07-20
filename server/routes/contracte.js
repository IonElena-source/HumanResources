const mongoose = require("mongoose")
const express = require("express")
const contracteRouter = express.Router()
const Angajat=require("../models/Angajat")
const Contract=require("../models/ContractAngajat")

//adaugareContract
contracteRouter.post("/",(req,res)=>{
    let contract=new Contract({
        Id_Angajat:req.body.Id_Angajat,
        Norma:req.body.Norma,
        Tura_Inceput:req.body.Tura_Inceput,
        Tura_Sfarsit:req.body.Tura_Sfarsit,
        Data_Salariu:req.body.Data_Salariu,
        Data_Angajare:req.body.Data_Angajare,
        Cod_Angajat_Acces:req.body.Cod_Angajat_Acces
    })

    Contract.findOne({Id_Angajat:req.body.Id_Angajat}).then(gasit=>{
        if(gasit){
            return res.status(401).json({
                title:"Acest contract apartine deja unui angajat",
                succes:false
            })
        }
        else{
            contract.save().then(contract=>{
                return res.status(200).json({
                    succes:true,
                    msg:"Contract inserat",
                    contractInserat:contract
                })
            }).catch(err=>console.log(err))
        }
    })
})



//regasire contract dupa idAngajat
contracteRouter.get("/:Id_Angajat",(req,res)=>{
    Contract.findOne({Id_Angajat:req.params.Id_Angajat}).then(contract=>{
        return res.status(200).json({
            succes:true,
            msg:"Contract gasit",
            contractGasit:contract
        })
    })
})
module.exports=contracteRouter
const mongoose = require("mongoose")
const express = require("express")
const jobRouter=express.Router()

const Job=require("../models/Joburi")

jobRouter.post("/",(req,res)=>{
    const job=new Job({
        Departament:req.body.Departament,
        Titlu:req.body.Titlu,
        Descriere:req.body.Descriere,
        Responsabilitati:req.body.Responsabilitati,
        Cerinte:req.body.Cerinte,
        Experienta:req.body.Experienta,
        Locatie:req.body.Locatie,
        Tip_Job:req.body.Tip_Job,
        Nivel_Studii:req.body.Nivel_Studii,
        Salariu_Net:req.body.Salariu_Net,
        Perioada_Aplicare_Inceput:req.body.Perioada_Aplicare_Inceput,
        Perioada_Aplicare_Sfarsit:req.body.Perioada_Aplicare_Sfarsit,
        Perioada_Postare:req.body.Perioada_Postare,
        Nr_Locuri:req.body.Nr_Locuri,
        Algoritm:JSON.stringify({}),
        Algoritm_Romana:JSON.stringify({})
    })

    job.save().then((result)=>{
        return res.status(200).json({
            succes:true,
            msg:"job adaugat",
            job:result
        })
    }).catch(err=>console.log(err))
})

//adaugare de algorit pt job
jobRouter.patch("/:Id_Job",(req,res)=>{
    Job.findOneAndUpdate({_id:req.params.Id_Job},{
        Algoritm:JSON.stringify(req.body.Algoritm)
    }).then(()=>console.log("succes")).catch(err=>console.log(err))
})
//adaugare de algoritm in Romana pt job
jobRouter.patch("/algoritmRomana/:Id_Job",(req,res)=>{
    Job.findOneAndUpdate({_id:req.params.Id_Job},{
        Algoritm_Romana:JSON.stringify(req.body.Algoritm_Romana)
    }).then(()=>console.log("succes")).catch(err=>console.log(err))
})

jobRouter.get("/",(req,res)=>{
    Job.find({}).then((result)=>{
        return res.status(200).json({
            succes:true,
            joburi:result
        })
    }).catch(err=>console.log(err))
})




//sterge job
jobRouter.delete("/:id",(req,res)=>{
    Job.findOneAndDelete({_id:req.params.id}).then(()=>{
        return res.status(200).json({
            succes:true
        })
    }).catch((err=>console.log(err)))
})


//ruta de editare a jobului
jobRouter.put("/:id",(req,res)=>{
    Job.findOneAndUpdate({
        _id:req.params.id
    },{
        Departament:req.body.Departament,
        Titlu:req.body.Titlu,
        Descriere:req.body.Descriere,
        Experienta:req.body.Experienta,
        Locatie:req.body.Locatie,
        Tip_Job:req.body.Tip_Job,
        Nivel_Studii:req.body.Nivel_Studii,
        Salariu_Net:req.body.Salariu_Net,
        Perioada_Aplicare_Inceput:req.body.Perioada_Aplicare_Inceput,
        Perioada_Aplicare_Sfarsit:req.body.Perioada_Aplicare_Sfarsit

    }).then((result)=>{
        return res.status(200).json({
            succes:true,
            result:result
        })
    }).catch(err=>console.log(err))
})


//regasire Job dupa id

jobRouter.get("/findJob/:Id_Job",(req,res)=>{
    Job.findOne({_id:req.params.Id_Job}).then((result)=>{
        return res.status(200).json({
            job:result
        })
    }).catch((err)=>console.log(err))
})


//editare algoritm

module.exports=jobRouter
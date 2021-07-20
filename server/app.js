const expres = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const path = require("path")
const passport = require("passport")
const cors = require("cors")
const angajatiRouter = require("./routes/angajati")
const manageriRouter = require("./routes/manageri")
const departamenteRouter = require("./routes/departament")
const cereriRouter = require("./routes/cereri")
const jobRouter = require("./routes/joburi")
const companieRouter = require("./routes/companie")
const candidatiRouter = require("./routes/candidati")
const interviuriRouter = require("./routes/interviuri")
const evenimenteRouter = require("./routes/evenimente")
const rapoarteRouter = require("./routes/rapoarte")
const obiectiveRouter=require("./routes/obiective")
const feedback=require("./routes/feedback")
const { spawn } = require('child_process');
const app = expres()

app.use(bodyParser.json())

app.use(cors())
const db = require("./config/keys").mongoURL
const contracteRouter = require("./routes/contracte")

mongoose.connect(db, { useNewUrlParser: true }, { useUnifiedTopology: true }).then(() => { console.log("database connected succesfully") })
    .catch(err => {
        console.log("Unable to connect with the database")
    });
app.use(passport.initialize())

app.use("/angajati", angajatiRouter)
app.use("/manageri", manageriRouter)
app.use("/departamente", departamenteRouter)
app.use("/angajati/contracte", contracteRouter)
app.use("/cereri", cereriRouter)
app.use("/joburi", jobRouter)
app.use("/candidati", candidatiRouter)
//companie detalii pt companie
app.use("/companie", companieRouter)
app.use("/interviuri", interviuriRouter)
app.use("/evenimente", evenimenteRouter)
app.use("/rapoarte", rapoarteRouter)
app.use("/obiective", obiectiveRouter)
app.use("/feedback", feedback)

app.get("/previziune/:numeFisier", (req, res) => {

  
    const childPython = spawn('python', ['predictie.py',`${req.params.numeFisier}`]);
    
    childPython.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`)

        return res.status(200).json({
            dataPy:data.toString()
           
        
        })
    });

    childPython.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });


    childPython.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });

  
})


const PORT = 5000;
app.listen(PORT, () => { console.log("Server running") })
import Vue from "vue"
import Router from "vue-router"
import AuthManager from "./ViewsManager/AuthManager"
import AuthAngajat from "./ViewsAngajat/AuthAngajat"
import Home from "./components/Home"
import HomeAngajat from "./ViewsAngajat/HomeAngajat"
import CereriAngajat from "./ViewsAngajat/CereriAngajat"
import Recrutare from "./ViewsAngajat/Recrutare"
import HomeManager from "./ViewsManager/HomeManager"
import General from "./ViewsManager/General"
import CandidatiFiltrati from "./ViewsAngajat/CandidatiFiltrati"
import Cereri from "./ViewsManager/Cereri"
import Setari from "./ViewsManager/Setari"
import GeneralAng from "./ViewsAngajat/GeneralAng"
import Feedback from "./ViewsAngajat/Feedback"
import Candidati from "./ViewsAngajat/Candidati"
import Calendar from "./ViewsManager/Calendar"
import ProgramareInterviu from "./ViewsAngajat/ProgramareInterviu"
import Evenimente from "./ViewsAngajat/Evenimente"
import Rapoarte from "./ViewsManager/Rapoarte"
import Angajati from "./ViewsManager/Angajati"
import AdaugaAngajat from "./ViewsManager/AdaugaAngajat"
Vue.use(Router)
const router = new Router({
    mode: "history",
    routes: [
        { path: "/", name: Home, component: Home },
        { path: "/angajat/auth", name: AuthAngajat, component: AuthAngajat },
        { path: "/manager/logRegister", name: AuthManager, component: AuthManager },
        {
            path: "/HomeAngajat", name: HomeAngajat, component: HomeAngajat,
            children: [
                {
                    path: "/general",
                    component: GeneralAng
                },
                {
                    path: "/cereriAngajat",
                    component: CereriAngajat
                },
                {
                    path: "/recrutare",
                    component: Recrutare
                },
                {
                    path: "/feedback",
                    component: Feedback
                },
                {
                    path: "/evenimente",
                    component: Evenimente
                },
                {
                    path: "/candidati/:id_job",
                    component: Candidati
                },
                {
                    path: "/candidatiFiltrati",
                    component: CandidatiFiltrati
                },
                {
                    path: "/programareInterviu/:id_candidat",
                    component: ProgramareInterviu
                },

            ]
        },
        {
            path: "/AcasaManager", name: HomeManager, component: HomeManager,
            children: [
                {
                    path: "/generalManager",
                    component: General
                },
               
                {
                    path: "/cereriManager",
                    name:"CereriManager",
                    component: Cereri,
               
                },
                {
                    path: "/setari",
                    component: Setari
                },
                {
                    path: "/calendar",
                    component: Calendar
                },
                {
                    path: "/rapoarte",
                    component: Rapoarte
                },
                {
                    path: "/angajati",
                    component: Angajati
                },
                {
                    path: "/adaugaAngajat",
                    component: AdaugaAngajat
                }
                
               

            ]
        },




    ]
})
export default router
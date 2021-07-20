import Vue from "vue"
import Vuex from "vuex"
import cereriNeverificate from "./modules/cereriNeverificate"
import cereriAsteptare from "./modules/cereriAsteptare"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {

    },
    mutations: {

    },
    actions: {

    },
    getters: {

    },
    modules: {
        cereriNeverificate,cereriAsteptare
    }
   
})
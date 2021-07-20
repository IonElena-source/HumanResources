
import axios from 'axios'

//to handle state
const state = {
    cereriAsteptare: []
}

//to handle state
const getters = { cereriAsteptare: (state) => { return state.cereriAsteptare }}

//to handle actions
const actions = {
    async getCereriAsteptare({commit},id) {
                axios
                    .get(`http://localhost:5000/cereri/filtrareCereri/${id}/In asteptare`)
                    .then((response) => {
                        
                        commit('setCereriAsteptare',response.data.cereri)
                    });
            }
}

//to handle mutations
const mutations = {
    setCereriAsteptare: (state, cereriAsteptare) => {
        state.cereriAsteptare = cereriAsteptare
    }
}

//export store module
export default {
    state,
    getters,
    actions,
    mutations
}
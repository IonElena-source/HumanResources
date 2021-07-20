
import axios from 'axios'

//to handle state
const state = {
    cereriNeverificate: []
}

//to handle state
const getters = { toateCererileNeverificate: (state) => { return state.cereriNeverificate }}

//to handle actions
const actions = {
    async getCereri({commit}) {
                axios
                    .get("http://localhost:5000/cereri/regasesteCereriNeverificate")
                    .then((response) => {
                        // this.requests = response.data.cereri;
                        // console.log("cerere")
                        // console.log(this.requests)
                        commit('setCereriNeverificate',response.data.cereri)
                    });
            }
}

//to handle mutations
const mutations = {
    setCereriNeverificate: (state, cereriNeverificate) => {
        state.cereriNeverificate = cereriNeverificate
    }
}

//export store module
export default {
    state,
    getters,
    actions,
    mutations
}
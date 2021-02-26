const axios = require("axios")

// const URL_PREFIX = 'https://radcats-karaoke-backend.herokuapp.com'
const URL_PREFIX = 'http://localhost:8080'

const API = {
    login: userData => {
        return axios.post(`${URL_PREFIX}/api/login`, userData)
    },
    signup: userData => {
        return axios.post(`${URL_PREFIX}/api/signup`, userData)
    },
    checkWebToken: token => {
        return axios.get(`${URL_PREFIX}/`, {
            headers: {
                authorization: `Bearer: ${token}`
            }
        })
    },
    search: query => {
        return axios.get(`${URL_PREFIX}/api/search`, query)
    },


    //TODO: if user selects song return selection for backewnd 
}

export default API
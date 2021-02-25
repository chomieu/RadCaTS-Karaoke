const axios = require("axios")

const url = 'http://'

const API = {
    login: userData => {
        return axios.post(`${url}/login`, userData)
    },
    signup: userData => {
        return axios.post(`${url}/signup`, userData)
    },
    getSecretClub: token => {
        return axios.get(`${url}/secretclub`, {
            headers: {
                authorization: `Bearer: ${token}`
            }
        })
    },
    search: query => {
        return axios.post(`${url}/search`, query)
    }
}

export default API
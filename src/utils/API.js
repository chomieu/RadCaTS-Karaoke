const axios = require("axios")

// const URL_PREFIX = 'https://radcats-karaoke-backend.herokuapp.com'
const URL_PREFIX = 'http://localhost:8080'

const API = {
    signup: userData => {
        return axios.post(`${URL_PREFIX}/api/signup`, userData)
    },
    login: userData => {
        return axios.post(`${URL_PREFIX}/api/login`, userData)
    },
    searchNewSong: query => {
        return axios.post(`${URL_PREFIX}/api/download`, query)
    },
    getAllSongs: () => {
        return axios.get(`${URL_PREFIX}/api/song`)
    },
    createSession: data => {
        return axios.post(`${URL_PREFIX}/api/session`, data)
    },
    startSession: id => {
        return axios.get(`${URL_PREFIX}/api/session/${id}`)
    },
    checkWebToken: token => {
        return axios.get(`${URL_PREFIX}/`, {
            headers: {
                authorization: `Bearer: ${token}`
            }
        })
    },
}

export default API
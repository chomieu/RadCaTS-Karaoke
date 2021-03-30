const axios = require("axios")


const URL_PREFIX = 'https://radcatskaraokeapi.herokuapp.com' // radcats heroku 
// const URL_PREFIX = 'https://radcats-karaoke-api.herokuapp.com' // chomie heroku
// const URL_PREFIX = 'https://radcats-karaoke-backend.herokuapp.com' // rita heroku
// const URL_PREFIX = 'http://localhost:8080';



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
    finishSession: (id, data) => {
        return axios.put(`${URL_PREFIX}/api/session/${id}`, data)
    },
    checkWebToken: token => {
        return axios.get(`${URL_PREFIX}/`, {
            headers: {
                authorization: `Bearer: ${token}`
            }
        })
    },
    getLyricsBySong: songId => {
        return axios.get(`${URL_PREFIX}/api/lyrics/${songId}`)
    },
    getLyricsById: id => {
        return axios.get(`${URL_PREFIX}/api/lyric/${id}`)
    },
    uploadLyrics: lyrics => {
        return axios.post(`${URL_PREFIX}/api/lyrics`, lyrics)
    },
    updateLyrics: lyrics => {
        return axios.put(`${URL_PREFIX}/api/lyrics`, lyrics)
    },
    addLyricsToSession: data => {
        return axios.put(`${URL_PREFIX}/api/session/lyrics/${data.sessionId}`, data)
    },
    updateProfilePicture: data => {
        return axios.put(`${URL_PREFIX}/api/pfp/${data.id}`, data)
    }
}

export default API
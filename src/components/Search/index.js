import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-materialize';
import { Redirect } from 'react-router-dom';
import AddSongModal from "../AddSongModal"
import UserHighScores from "../UserHighScores"
import Preloader from "../Preloader"
import Select from 'react-select';
import API from '../../utils/API';
import "./style.css"

function Search({ userData, search, setSearch }) {

    const [formInputs, setFormInputs] = useState({ label: '', value: '', })
    const [message, setMessage] = useState(`What's your favorite song?`)
    const [highScores, setHighScores] = useState({ available: false })
    const [redirectPage, setRedirectPage] = useState()
    const [loading, setLoading] = useState({ search: false, highScores: true })

    useEffect(() => { getSongs() }, [userData])
    useEffect(() => { if (loading.search) { setMessage('searching') } }, [loading])


    const handleInputChange = e => {
        // console.log(e)
        if (e) { setFormInputs({ ...formInputs, label: e.label, value: e.value, }) }
        else { setFormInputs({ ...formInputs, label: null, value: null, }) }
    }

    const handleSelectClick = () => { getSongs() }


    const getSongs = (e) => {
        if (e) { e.preventDefault() }
        API.getAllSongs()
            .then(data => {
                const formatted = []
                data.data.map(song => {
                    let obj = { label: `${song.name} - ${song.artist}`, value: song._id }
                    formatted.push(obj)
                })
                setSearch(formatted)
                formatHighScores(data.data)
            })
            .catch(err => { console.error(err) })
    }

    const formatHighScores = (songs) => {
        if (userData.records) {

            const userSessionData = [] // store high scores for user here
            userData.records.map(data => { // loop through session records for this user
                const thisSongsData = { // new object for each song id and score for the song
                    songId: data.karaokeSong // id# of song
                }
                if (data.scores) { // array of objects with userid#:score, ex-> [{ userId: score }, { userId: score }, ...]
                    data.scores.map(x => {
                        if (x[userData.id] > 0) { // if object key matches this userId & is greater then 0
                            thisSongsData.score = x[userData.id] // add the score to thisSongsData
                            userSessionData.push(thisSongsData) // add the object to userSessionData array
                        }
                    })
                }
            })
            const userHighestScores = [userSessionData[0]] // preload high scores with the first object
            userSessionData.map((session, idx) => { // iterate through session scores
                for (let i = 0; i < userHighestScores.length; i++) { // iterate through high scores
                    if (session.songId === userHighestScores[i].songId) { // if matching id is found, compare scores
                        if (session.score < userHighestScores[i].score) { return } // if current high score is greater, disreguard and exit the loop
                        else {
                            userHighestScores[i].score = session.score // if session score is greater, update high score with session score and exit the loop
                            return
                        }
                    }
                }
                userHighestScores.push(session) // if no matches were found above, add session data to high scores
            })

            if (userHighestScores.length > 1) { // if there are scores
                userHighestScores.map((highScore) => {  // loop through each score data
                    songs.map(song => { // loop through available songs
                        if (song._id === highScore.songId) { // find the song the score belongs to
                            highScore.artist = song.artist // add the artist and song name to score data
                            highScore.name = song.name
                        }
                    })
                })

                setHighScores({ scores: userHighestScores, available: true }) // set high score data
                setLoading({ ...loading, highScores: false }) // turn off preloader

            } else setLoading({ ...loading, highScores: false }) // turn off preloader
        }
    }


    const handleCreateSession = e => {
        e.preventDefault()
        const newSessionObj = { host: userData.id, karaokeSong: formInputs.value }
        createNewSession(newSessionObj)

    }


    const createNewSession = (newSessionObj => {
        API.createSession(newSessionObj)
            .then(sessionId => { setRedirectPage(<Redirect to={`/lyrics/${sessionId.data}`} />) })
            .catch(err => { console.log(err) })

    })

    return (

        <Container className="center-align">
            { loading.search ? <Preloader /> : null}

            <Row>
                {loading.highScores

                    ? <Preloader /> // display while scores attempt to load
                    : highScores.available
                        ? <UserHighScores  // display if scores are available
                            highScores={highScores}
                            search={search}
                            userData={userData}
                        />

                        : <h5 className="search__title">{message}</h5> // display if no scores are available
                }

            </Row>
            <form className="search__container">

                <span className="searchInput">

                    {highScores.available ? <h5>What do you want to sing next?</h5> : null}

                    <Select
                        onChange={handleInputChange}
                        onClick={handleSelectClick}
                        classNamePrefix="select"
                        className="searchInput"
                        isSearchable={true}
                        isClearable={true}
                        options={search}
                        name="searchBox"
                    />

                    <AddSongModal
                        userData={userData}
                        setLoading={setLoading}
                        setMessage={setMessage}
                        createNewSession={createNewSession}
                    />

                    {/* <Button onClick={getSongs} >refresh results</Button> */}

                    {formInputs.value
                        ? <Button className="btn_purple" onClick={handleCreateSession}>Get started!</Button>
                        : <Button className="btn_purple" disabled>Select a song</Button>
                    }

                </span>
            </form>

            {redirectPage}

        </Container >
    )
}

export default Search;
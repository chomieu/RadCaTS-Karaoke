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
    const [highScores, setHighScores] = useState({ loaded: false })
    const [redirectPage, setRedirectPage] = useState()
    const [loading, setLoading] = useState(false)


    useEffect(() => { getSongs() }, [userData])

    useEffect(() => { if (loading) { setMessage('searching') } }, [loading])


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
            const thisUsersSessionScores = [] // store high scores for user here
            userData.records.map(data => { // loop through session records for this user
                const allUsersScores = data.scores // array of objects with userid:score key value pairs ex-> [{ userId: score }, { userId: score }, ...]
                const thisSongsData = { // new object for each song id and score for the song
                    songId: data.karaokeSong
                }

                if (data.scores) {
                    data.scores.map(x => {
                        if (x[userData.id] > 0) { // if object key matches this userId & is greater then 0
                            thisSongsData.score = x[userData.id] // add the score to thisSongsData
                            thisUsersSessionScores.push(thisSongsData) // add the object to thisUsersSessionScores array
                        }
                    })
                }
            })
            const thisUsersHighScores = [thisUsersSessionScores[0]] // preload high scores with the first object
            // loop through thisUsersSessionScores
            // if song is not in thisUsersHighScores yet, add it
            // if song is in thisUsersHighScores, compare scores
            // if less then, skip
            // if greater then, update it
            thisUsersSessionScores.map((session, idx) => {
                // loop through highscores
                for (let i = 0; i < thisUsersHighScores.length; i++) {
                    // if session id matches an id in high scores, compare scores
                    // if stored score in high score is greater, exit the loop
                    // if session score is greater, update high score with session score and exit the loop
                    if (session.songId === thisUsersHighScores[i].songId) {
                        if (session.score < thisUsersHighScores[i].score) { return }
                        else {
                            thisUsersHighScores[i].score = session.score
                            return
                        }
                    }
                }
                // if loop wasn't exited above, no matching song was found, add this session data to high scores
                thisUsersHighScores.push(session)
            })
            // if highscores have loaded & searchdata has loaded
            // loop through high scores songs, compare to search data
            // when matching Id's are found, add the label data from search to the highscores objects

            thisUsersHighScores.map((highScore) => {
                songs.map(song => {
                    if (highScore) {
                        if (song._id === highScore.songId) {
                            highScore.artist = song.artist
                            highScore.name = song.name
                        }
                    }
                })
            })

            if (thisUsersHighScores.length > 1) {
                setHighScores({
                    scores: thisUsersHighScores,
                    loaded: true
                })
            }
        }
    }


    const handleLyrics = e => {
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

            <h5 className="search__title">{message}</h5>

            { loading

                ? <Preloader />
                : null

            }

            {highScores.loaded

                ? <UserHighScores highScores={highScores} search={search} />
                : <Preloader />
            }





            <form className="search__container">

                <span className="searchInput">

                    <p>What do you want to sing next?</p>

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

                        ? <Button className="btn_purple" onClick={handleLyrics}>Get started!</Button>
                        : <Button className="btn_purple" disabled>Select a song</Button>

                    }

                </span>
            </form>

            {redirectPage}

        </Container >
    )
}

export default Search;
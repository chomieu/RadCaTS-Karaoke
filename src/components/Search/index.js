import React, { useState, useEffect } from 'react'
import { Container, Button } from 'react-materialize';
import { Redirect } from 'react-router-dom';
import AddSongModal from "../AddSongModal"
import Preloader from "../Preloader"
import Select from 'react-select';
import API from '../../utils/API';
import "./style.css"

function Search({ userData }) {
    const [formInputs, setFormInputs] = useState({ label: '', value: '', })
    const [message, setMessage] = useState(`What's your favorite song?`)
    const [redirectPage, setRedirectPage] = useState()
    const [search, setSearch] = useState(['search'])
    const [loading, setLoading] = useState(false)

    useEffect(() => { getSongs() }, [])

    useEffect(() => { if (loading) { setMessage('searching') } }, [loading])


    const handleInputChange = e => {
        if (e) { setFormInputs({ ...formInputs, label: e.label, value: e.value, }) }
        else { setFormInputs({ ...formInputs, label: null, value: null, }) }
    }

    const handleSelectClick = () => {
        getSongs()
    }

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
            })
            .catch(err => { console.error(err) })
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

            <h4 className="search__title">{message}</h4>

            {loading

                ? <Preloader />
                : null

            }

            <form className="search__container">

                <span className="searchInput">

                    <p>search for an existing karaoke track</p>

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
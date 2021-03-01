import React, { useState, useEffect, Fragment } from 'react'
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { Container, Row, Col, TextInput, Button, Icon, Autocomplete } from 'react-materialize';
import AddSongModal from "../AddSongModal"
import "./style.css"
import API from '../../utils/API';
import LyricsContainer from '../LyricsContainer';

function Search({ userState, search, sessionData, setSessionData, display, setDisplay }) {

    const [formInputs, setFormInputs] = useState({
        isClearable: true,
        isSearchable: true,
        label: '',
        value: '',
    })

    const handleInputChange = e => {
        console.log(e)

        if (e) {
            setFormInputs({
                ...formInputs,
                label: e.label,
                value: e.value,
            })
        } else {
            setFormInputs({
                ...formInputs,
                label: null,
                value: null,
            })
        }
    }


    const handleSearch = e => {
        e.preventDefault()

        // set loading screen
        setDisplay({
            ...display,
            search: false,
            logout: false,
            loading: true
        })

        // prepard data object for api call.
        // call API to create session
        const data = {
            host: userState.id,
            karaokeSong: formInputs.value
        }
        API.createSession(data)
            .then(data => {
                // second api call to start session with session id
                const id = data.data
                API.startSession(id)
                    .then(data => {

                        // parse strigified lyrics to an object array
                        // format the data we need to start our session.
                        let x = data.data
                        let parsed = JSON.parse(x.lyrics)
                        let lyricsArr = parsed.lines
                        let formatted = {
                            sessionId: id,
                            songId: x._id,
                            artist: x.artist,
                            name: x.name,
                            lyrics: lyricsArr
                        }

                        // save the formatted data to sessionData
                        setSessionData(formatted)
                        // hide loading screen
                        // mount audio player now that sessionData is available in state
                        setDisplay({
                            ...display,
                            loading: false,
                            search: false,
                            audioPlayer: true,
                            logout: true
                        })
                    })
                    .catch(err => { console.log(err) })
            })
            .catch(err => { console.log(err) })







    }



    return (

        <Container className="center-align">
            <h4 className="search__title">What's <span className="underline">your</span> favorite song?</h4>
            <form className="search__container">

                <span className="searchInput">
                    <p>search for an existing karaoke track</p>
                    <Select
                        isSearchable={formInputs.isSearchable}
                        isClearable={formInputs.isClearable}
                        onChange={handleInputChange}
                        classNamePrefix="select"
                        className="searchInput"
                        options={search}
                        name="searchBox"
                    />
                </span>

                <AddSongModal
                    display={display}
                    setDisplay={setDisplay}
                />

                {formInputs.value
                    ? <Button
                        onClick={handleSearch}
                    >start session
                </Button>

                    : <Button disabled>...</Button>
                }

            </form>
        </Container>
    )
}

export default Search;
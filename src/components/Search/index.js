import React, { useState, useEffect, Fragment } from 'react'
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { Container, Row, Col, TextInput, Button, Icon, Autocomplete } from 'react-materialize';
import AddSongModal from "../AddSongModal"
import "./style.css"
import API from '../../utils/API';
import LyricsContainer from '../LyricsContainer';
import { Redirect } from 'react-router-dom';

function Search({ userData, setSessionData }) {

    const [search, setSearch] = useState([])
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

    const handleSelectClick = () => {
        API.getAllSongs()
        .then(data => {
            formatAutoComplete(data.data)
        })
        .catch(err => { console.error(err) })    
    }
    
    const formatAutoComplete = (data) => {
        const formatted = []
        data.map(song => {
            let obj = {
            label: `${song.name} - ${song.artist}`,
            value: song._id
            }
            formatted.push(obj)
        })
        setSearch(formatted)
    }

    const handleSearch = e => {
        e.preventDefault()

        // prepard data object for api call.
        // call API to create session
        const data = {
            host: userData.id,
            karaokeSong: formInputs.value
        }
        API.createSession(data)
            .then(data => {
                // second api call to start session with session id
                const id = data.data
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
                        onClick={handleSelectClick}
                        classNamePrefix="select"
                        className="searchInput"
                        options={search}
                        name="searchBox"
                    />
                </span>

                <AddSongModal />

                { formInputs.value ?
                <Button onClick={handleSearch}>start session</Button>
                : <Button disabled>...</Button> }

            </form>
        </Container>
    )
}

export default Search;
import React, { useState, useEffect, Fragment } from 'react'
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { Container, Row, Col, TextInput, Button, Icon, Autocomplete } from 'react-materialize';
import AddSongModal from "../AddSongModal"
import "./style.css"

function Search({ userState, search, songData, setSongData, display, setDisplay }) {

    const [formInputs, setFormInputs] = useState({
        isClearable: true,
        isDisabled: false,
        isLoading: false,
        isRtl: false,
        isSearchable: true,
        searchBox: '',
        label: null,
        value: null
    })

    const handleInputChange = e => {
        setFormInputs({
            ...formInputs,
            searchBox: e
        })
    }

    const handleSelection = e => {
        if (e) {
            setFormInputs({
                ...formInputs,
                label: e.label,
                value: e.value
            })
            console.log(`selected ${e.label}`)
        } else {
            setFormInputs({
                ...formInputs,
                label: null,
                value: null
            })
            console.log('cleared')
        }
    }




    const handleSearch = e => {
        e.preventDefault()
        setSongData(formInputs)
        setDisplay({
            ...display,
            search: false,
            logout: false,
            loading: true
        })
        setTimeout(() => {
            setDisplay({
                ...display,
                loading: false,
                search: false,
                audioPlayer: true,
                logout: true
            })
        }, 3000);
    }



    return (

        <Container className="center-align">
            <h4 className="search__title">What's <span className="underline">your</span> favorite song?</h4>
            <form className="search__container">

                <span className="searchInput">
                    <p>search for an existing karaoke track</p>
                    <Select
                        className="searchInput"
                        classNamePrefix="select"
                        defaultValue={search[0]}
                        isDisabled={formInputs.isDisabled}
                        // isLoading={formInputs.isLoading}
                        isClearable={formInputs.isClearable}
                        // isRtl={formInputs.isRtl}
                        isSearchable={formInputs.isSearchable}
                        name="searchBox"
                        inputValue={formInputs.searchBox}
                        onInputChange={handleInputChange}
                        onChange={handleSelection}
                        options={search}
                    />
                </span>

                <AddSongModal
                    display={display}
                    setDisplay={setDisplay}
                />

            </form>
        </Container>
    )
}

export default Search;
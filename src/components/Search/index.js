import React, { useState } from 'react'
import { Container, Row, Col, TextInput, Button, Icon } from 'react-materialize';
import API from "../../utils/API"
import "./style.css"

function Search({ userState, songData, setSongData, display, setDisplay }) {

    const [formInputs, setFormInputs] = useState({ artist: '', song: '' })

    const handleFormInputs = e => {
        const { name, value } = e.target
        setFormInputs({ ...formInputs, [name]: value })
    }

    const handleSearch = e => {
        e.preventDefault()

        const search = { token: userState.token, search: formInputs }
        API.search(search).then(data => {
            console.log(data)
            setSongData(data)
        })

        //mock successful search
        setDisplay({ ...display, search: false, logout: false, loading: true })

        setTimeout(() => {
            setDisplay({ ...display, loading: false, search: false, audioPlayer: true, logout: true })
        }, 3000);
    }

    return (
        <Container className="center-align">
            <h4 className="search__title">What's <span className="underline">your</span> favorite song?</h4>
            <form className="search__container">
                <TextInput
                    icon="album"
                    id="song"
                    label="song"
                    name="song"
                    value={formInputs.song}
                    onChange={handleFormInputs}
                />
                <TextInput
                    icon="person"
                    id="artist"
                    label="artist"
                    name="artist"
                    value={formInputs.artist}
                    onChange={handleFormInputs}
                />

                <Button
                    node="button"
                    type="submit"
                    waves="orange"
                    onClick={handleSearch}
                >
                    Search
                    <Icon right>send</Icon>
                </Button>
            </form>
        </Container>
    )
}

export default Search;
import React, { useState, useEffect } from 'react'
import { Container, Row, Col, TextInput, Button, Icon, Autocomplete } from 'react-materialize';
// import API from "../../utils/API"
import "./style.css"

function Search({ userState, songData, setSongData, display, setDisplay }) {

    const [formInputs, setFormInputs] = useState({
        artist: '',
        song: ''
    })

    const handleFormInputs = e => {
        const { name, value } = e.target
        setFormInputs({
            ...formInputs,
            [name]: value
        })


    }



    const handleSearch = e => {
        e.preventDefault()
        //mock successful search
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
        <>
            <Container className="center-align">
                <h4 className="search__title">What's <span className="underline">your</span> favorite song?</h4>
                <form className="search__container">

                    {/* <TextInput
                        // className="orange"
                        icon="person"
                        id="artist"
                        label="artist"
                        name="artist"
                        value={formInputs.artist}
                        onChange={handleFormInputs}
                    /> */}

                    {/* <TextInput
                        icon="album"
                        id="song"
                        label="song"
                        name="song"
                        value={formInputs.song}
                        onChange={handleFormInputs}
                    /> */}

                    <Autocomplete
                        // icon="album"
                        // onChange={handleFormInputs}
                        id="song"
                        name="song"
                        // value={formInputs.song}
                        options={{
                            data: songData[0]
                        }}
                        placeholder="Insert here"
                    />

                    {/* <Row>
                        <div>{`${formInputs.artist} ${formInputs.song}`}</div>
                    </Row> */}

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
        </>
    )
}

export default Search;
import { AirlineSeatReclineNormalOutlined } from '@material-ui/icons';
import React, { useState, useEffect } from 'react'
import { Container, Row, Col, TextInput, Button, Icon, Autocomplete } from 'react-materialize';
// import API from "../../utils/API"
import "./style.css"

function Search({ userState, search, songData, setSongData, display, setDisplay }) {

    const [formInputs, setFormInputs] = useState({ autocomplete: '' })

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

                    <span className="songSearch">

                        <Autocomplete
                            icon={<Icon className="songSearch">album</Icon>}
                            value={formInputs.autocomplete}
                            onChange={handleFormInputs}
                            placeholder="search here"
                            name="autocomplete"
                            options={{
                                data: search,
                                limit: 5
                            }}
                        />

                    </span>

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
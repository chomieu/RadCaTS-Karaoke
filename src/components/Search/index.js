import React, { useState, useEffect } from 'react'
import { Container, Button } from 'react-materialize';
import { Redirect } from 'react-router-dom';
import AddSongModal from "../AddSongModal"
import Preloader from "../Preloader"
import Select from 'react-select';
import API from '../../utils/API';
import "./style.css"

function Search({ userData, setSessionData }) {

    const [formInputs, setFormInputs] = useState({ label: '', value: '', })
    const [loading, setLoading] = useState(false)
    const [redirectPage, setRedirectPage] = useState()
    const [message, setMessage] = useState(`What's your favorite song?`)
    const [search, setSearch] = useState(['search'])

    // useEffect(() => { getSongs() }, [])

    useEffect(() => {
        if (loading) {
            setMessage('searching')
            // loadingMessage()
        }
    }, [loading])

    useEffect(() => {
        getSongs()
    }, [])


    // const loadingMessage = () => {
    //     setTimeout(() => {
    //         setMessage('loading .')
    //         setTimeout(() => {
    //             setMessage('loading . .')
    //             setTimeout(() => {
    //                 setMessage('loading . . .')
    //             }, 1000)
    //         }, 1000)
    //     }, 1000)
    //     setMessage(`What's your favorite song ?`)
    // }

    const handleInputChange = e => {
        console.log(e)
        if (e) { setFormInputs({ ...formInputs, label: e.label, value: e.value, }) }
        else { setFormInputs({ ...formInputs, label: null, value: null, }) }
    }

    const handleSelectClick = () => {
        console.log('clicked')
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



    const handleSearch = e => {
        e.preventDefault()
        const data = { host: userData.id, karaokeSong: formInputs.value }
        API.createSession(data)
            .then(sessionId => { setRedirectPage(<Redirect to={`/api/lyrics/${sessionId.data}`} />) })
            .catch(err => { console.log(err) })

    }

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

                        loading={loading}
                        message={message}
                        getSongs={getSongs}
                        setLoading={setLoading}
                        setMessage={setMessage}

                    />

                    <Button onClick={getSongs} >refresh results</Button>

                    {formInputs.value

                        ? <Button onClick={handleSearch}>start session</Button>
                        : <Button disabled>...</Button>

                    }

                </span>
            </form>

            {redirectPage}

        </Container >
    )
}

export default Search;
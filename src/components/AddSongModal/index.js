import React, { useState } from 'react';
import { Modal, Button } from 'react-materialize';
import SearchNewSong from "../SearchNewSong"
import Preloader from "../Preloader"
import API from "../../utils/API"
import "./style.css";


export default function AddSongModal({ display, setDisplay }) {

    const trigger = <Button>can't find your song?</Button>
    const [inputs, setInputs] = useState({
        header: 'maybe we can find it!',
        message: '',
        title: '',
        artist: '',
        loading: false,
        tryAgain: false,
    })

    // control form inputs for search
    const handleInputChange = e => {
        const { name, value } = e.target
        setInputs({ ...inputs, [name]: value })
    }

    // control form submit for search
    // activate loading visual to await api response
    const handleInputSubmit = e => {
        e.preventDefault();
        setInputs({ ...inputs, loading: true })

        // send title and artist search as one string with the key of name
        let data = { name: `${inputs.title} ${inputs.artist}` }
        API.searchNewSong(data)
            .then(data => {
                let x = data.data
                console.log(x)
                // clear form inputs, 
                setInputs({ ...inputs, artist: "", title: "" })

                //  if theres an error, set the message and display to user.
                if (x.errorMessage) {
                    console.log('!!!!!')

                    setInputs({ ...inputs, header: 'oops..', tryAgain: true })
                    if (x.errorMessage === "this song already existed!") {
                        console.log(x.errorMessage)
                        setInputs({
                            ...inputs,
                            message: `${x.title} by ${x.artist} is already in the database.`
                        })
                    } else {
                        setInputs({
                            ...inputs,
                            message: `${x.title} by ${x.artist} is not available for karaoke yet.`,
                        })
                    }
                }
            })
            .catch(err => { console.log(err) })
    }

    // if the previous search failed and user clicks button to search again
    const handleTryAgain = () => {
        setInputs({ ...inputs, header: 'Lets try again', tryAgain: false })
    }


    return (
        <Modal
            className="center-align"
            header={inputs.header}
            trigger={trigger}
        >

            <form>
                {/* search new song inputs */}
                {!inputs.loading && !inputs.tryAgain

                    ? < SearchNewSong
                        inputs={inputs}
                        handleInputChange={handleInputChange}
                    />
                    : null
                }

                {/* button for search */}
                {inputs.title && inputs.artist && !inputs.tryAgain
                    ? <Button
                        className="login__btn"
                        type="submit"
                        // modal="close"
                        onClick={handleInputSubmit}
                    >Search
                    </Button>

                    : !inputs.loading
                        ? <Button
                            disabled
                            className="login__btn"
                            type="submit"
                        >...
                    </Button>
                        : null
                }

                {/* waiting for search results */}
                {inputs.loading
                    ? <Preloader />
                    : null
                }
                {inputs.tryAgain
                    ? <>
                        <p>{inputs.message}</p>
                        <Button
                            onClick={handleTryAgain}
                        >New Search
                        </Button>
                    </>
                    : null
                }
            </form>

        </Modal >
    )
}
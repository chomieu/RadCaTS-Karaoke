import React, { useState } from 'react';
import { Modal, Button } from 'react-materialize';
import SearchNewSong from "../SearchNewSong"
import Preloader from "../Preloader"
import API from "../../utils/API"
import "./style.css";



function AddSong({ display, setDisplay }) {

    const trigger = <Button>can't find your song?</Button>
    const [inputs, setInputs] = useState({
        header: 'maybe we can find it!',
        message: '',
        title: '',
        artist: '',
        loading: false,
        tryAgain: false,

    })
    const handleInputChange = e => {
        const { name, value } = e.target
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const handleInputSubmit = e => {
        e.preventDefault();
        setInputs({
            ...inputs,
            title: "",
            artist: "",
            loading: true
        })

        let data = { name: `${inputs.title} ${inputs.artist}` }
        API.searchNewSong(data)
            .then(data => {
                console.log(data)
                let x = data.data

                if (x.errorMessage === "this song already existed!") {
                    setInputs({
                        ...inputs,
                        header: 'oops..',
                        message: `${x.title} by ${x.artist} is already in the database.`,
                        title: "",
                        artist: "",
                        tryAgain: true
                    })
                } else if (x.errorMessage) {
                    setInputs({
                        ...inputs,
                        header: 'oops..',
                        message: `${x.title} by ${x.artist} is not available for karaoke yet.`,
                        title: "",
                        artist: "",
                        tryAgain: true
                    })
                }
            })
            .catch(err => { console.log(err) })
    }

    const handleTryAgain = () => {
        setInputs({
            ...inputs,
            header: 'Lets try again',
            tryAgain: false

        })
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
                    : !inputs.loading && !inputs.tryAgain
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

export default AddSong;
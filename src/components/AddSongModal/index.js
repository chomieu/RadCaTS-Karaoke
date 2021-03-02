import React, { useState } from 'react';
import { Modal, Button } from 'react-materialize';
import Preloader from "../Preloader"
import API from "../../utils/API"
import "./style.css";


export default function AddSongModal({ loading, setLoading, getSongs, message, setMessage }) {

    const trigger = <Button>can't find your song?</Button>
    const [inputs, setInputs] = useState({
        header: 'maybe we can find it!',
        tryAgain: false,
        message: '',
        artist: '',
        title: '',
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
        setLoading(true)

        // send title and artist search as one string with the key of name
        let data = { name: inputs.title }
        API.searchNewSong(data)
            .then(data => {
                let x = data.data
                console.log(x)
                setLoading(false)

                //  if theres an error, set the message and display to user.
                if (x.errorMessage) {
                    console.log(x.errorMessage)
                    setInputs({ ...inputs, header: 'oops..', tryAgain: true })

                    if (x.errorMessage === "this song already existed!") {
                        setInputs({ ...inputs, message: `${x.title} by ${x.artist} is already in the database.` })
                    } else {
                        setInputs({ ...inputs, message: `${x.title} by ${x.artist} is not available for karaoke yet.` })
                    }
                }
                getSongs()
                setInputs({ ...inputs, artist: "", title: "" })
            })
            .catch(err => {
                setMessage('search Error')
                setLoading(false)
                console.log(err)
            })
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
                < div className="form-group left-align">
                    <input
                        type="text"
                        name="title"
                        value={inputs.title}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="title">title / artist</label>
                </div>

                {inputs.title

                    ? <Button
                        onClick={handleInputSubmit}
                        className="login__btn"
                        type="submit"
                        modal="close"
                    >Search
                    </Button>

                    : <Button disabled>...</Button>
                }
            </form>

        </Modal >
    )
}
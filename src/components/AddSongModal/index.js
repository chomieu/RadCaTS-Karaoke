import React, { useState } from 'react';
import { Modal, Button } from 'react-materialize';
import Preloader from "../Preloader"
import API from "../../utils/API"


export default function AddSongModal({ setLoading, setMessage, userData, createNewSession }) {

    const trigger = <Button className="btn_purple">can't find your song?</Button>
    // const [inputs, setInputs] = useState({ title: '' })
    const [inputs, setInputs] = useState({})

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
        // let data = { name: inputs.title }
        // API.searchNewSong(data)
        //     .then(data => {

        //         const newSessionObj = { host: userData.id, karaokeSong: data.data }
        //         createNewSession(newSessionObj)

        //         setLoading(false)
        //         setInputs({ title: "" })

        //     })
        //     .catch(err => {

        //         setInputs({ title: "" })
        //         setMessage('Song is not available yet, please try another song')
        //         setLoading(false)
        //         console.log(err)
        //     })
        API.uploadSong(inputs)
            .then(() => {
                setInputs({});
            })
            .catch(err => {
                console.log(err)
            })
    }

    const widget = window.cloudinary.createUploadWidget({
        cloudName: 'drdwcvbe8',
        uploadPreset: 'dtcz40vk'
    }, (error, result) => {
        if (!error && result && result.event === "success") {
            setInputs({ ...inputs, mixed: result.info.secure_url })
        }
    })

    const openWidget = (e) => {
        e.preventDefault()
        widget.open()
    }

    return (
        <Modal
            className="center-align"
            header="Maybe we can find it!"
            trigger={trigger}
        >

            <form>
                < div className="form-group left-align">
                    <input
                        type="text"
                        name="name"
                        value={inputs.name}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="name">title</label>
                    <input
                        type="text"
                        name="artist"
                        value={inputs.artist}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="artist">artist</label>
                    <Button id="upload_widget" onClick={openWidget}>Upload files</Button>
                </div>

                {/* <Button id="upload_widget" onClick={openWidget}>Upload files</Button> */}

                {inputs.name && inputs.artist && inputs.mixed

                    ? <Button
                        onClick={handleInputSubmit}
                        className="login__btn btn_purple"
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
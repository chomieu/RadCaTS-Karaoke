import React, { useState } from 'react'
import { Container, Row, Col, TextInput } from 'react-materialize';

function search() {

    const [formInputs, setFormInputs] = useState({ artist: '', song: '' })

    const handleFormInputs = e => {
        // const { name, value } = e.target
        // setFormInputs({ ...formInputs, [name]: value })
    }

    return (
        <Container>
            <Row>
                <Col s={12}>
                    <form >
                        <TextInput
                            icon="email"
                            label="artist"
                            name="artist"
                        // value={formInputs.artist}
                        // onChange={handleFormInputs}
                        />
                        <TextInput
                            icon="email"
                            label="song"
                            name="song"
                        // value={formInputs.song}
                        // onChange={handleFormInputs}
                        />

                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default search;
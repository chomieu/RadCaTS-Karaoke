import React, { useState } from 'react';
import { Container, Row, Col } from 'react-materialize';
import Preloader from '../components/Preloader'
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import SignUp from '../components/SignUp';
import LogIn from '../components/LogIn';
import "../App.css"

export default function Landing({ userData, setUserData, loginSuccess, setIsPlaying }) {
    const [loadingUser, setLoadingUser] = useState(false)
    const [message, setMessage] = useState('')
    return (

        <Container className="pageContents">
            {userData.isLoggedIn ? <Redirect to="/search" /> : null}
            <Row>
                <h1 className="white-text mt-5">Radcats karaoke</h1>
            </Row>

            <Row>
                <SignUp loginSuccess={loginSuccess} />

                <LogIn loginSuccess={loginSuccess} setLoadingUser={setLoadingUser} setMessage={setMessage} />
            </Row>
            <Row>
                {loadingUser ? <Preloader /> : null}
                <p>{message}</p>
            </Row>

        </Container>
    )
}

import React from 'react'
import { Modal, Button } from 'react-materialize';

const trigger = <Button>logout</Button>;

export default function logout({ userState, setUserState, setDisplay, display }) {

    const logOut = () => {
        localStorage.removeItem("token");
        setDisplay({ ...display, audioPlayer: false, logout: false, loading: false })
        setUserState({ id: '', email: '', token: '', isLoggedIn: false })
    }


    return (
        <Modal className="center-align" header={`logout ${userState.username}?`} trigger={trigger}>
            <Button modal="close" onClick={logOut}>Logout</Button>
        </Modal >

    )
}

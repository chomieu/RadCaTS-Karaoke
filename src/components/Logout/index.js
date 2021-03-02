import React from 'react'
import { Modal, Button } from 'react-materialize';

const trigger = <Button>logout</Button>;

export default function logout({ userData, setUserData }) {

    const logoutUser = () => {
        console.error('Logged out')
        localStorage.removeItem("token");
        setUserData({
            isLoggedIn: false,
            email: '',
            token: '',
            id: ''
        })
    }

    return (
        <Modal
            trigger={trigger}
            className="center-align"
            header={`logout ${userState.username}?`}
        >
            <Button
                modal="close"
                onClick={logoutUser}
            >Logout</Button>

        </Modal >

    )
}

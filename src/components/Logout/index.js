import React from 'react'
import { Modal, Button } from 'react-materialize';
import "./style.css";

const trigger = <Button className="logout_button"><i class="material-icons">exit_to_app</i></Button>;

export default function logout({ userData, setUserData }) {


    // remove token from local storage
    // reset userData
    const logoutUser = () => {
        localStorage.removeItem("token");
        setUserData({ isLoggedIn: false, email: '', token: '', id: '' })
    }

    return (
        <Modal
            trigger={trigger}
            className="center-align"
            header={`logout ${userData.username}?`}
        >
            <Button
                modal="close"
                onClick={logoutUser}
            >logout</Button>

        </Modal >

    )
}

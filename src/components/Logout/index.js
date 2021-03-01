import React from 'react'
import { Modal, Button } from 'react-materialize';

const trigger = <Button>logout</Button>;

export default function logout({ userData, logoutUser }) {

    return (
        <Modal
            trigger={trigger}
            className="center-align"
            header={`logout ${userData.username}?`}
        >
            <Button
                modal="close"
                onClick={logoutUser}
            >Logout</Button>

        </Modal >

    )
}

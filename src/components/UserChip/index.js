import React from 'react'
import "./style.css"
import { Chip, Icon, Modal, Button } from 'react-materialize';
import API from "../../utils/API";

export default function UserChip({ userData }) {

    const axios = require("axios")

    const newProfilePicture = () => {
        const pfp = document.getElementById("pfp").value
        const data = {
            id: userData.id,
            url: pfp
        }
        API.updateProfilePicture(data)
            .then(() => {
                window.location.reload()
            }).catch((err) => {
                console.log('profile picture error', err)
            })
    }

    return (
        < Modal
            actions={[<Button flat modal="close" node="button" waves="green">Close</Button>]}
            bottomSheet={false}
            fixedFooter={false}
            header=""
            id="Modal-0"
            open={false}
            options={{
                dismissible: true,
                endingTop: '10%',
                inDuration: 250,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                opacity: 0.5,
                outDuration: 250,
                preventScrolling: true,
                startingTop: '4%'
            }}
            trigger={
                < Chip className="userIcon" >
                    {
                        userData.profilePicture
                            ? <>
                                <img
                                    alt="Contact Person"
                                    className="responsive-img"
                                    src={userData.profilePicture}
                                />
                                {userData.username}
                            </>
                            : <>
                                <Icon>person</Icon>
                                <span type="text">Login!</span>
                            </>
                    }
                </Chip >
            }>

            <label>New Profile Picture URL:</label>
            <input type="text" id="pfp" name="pfp" />
            <Button className="btn_purple" id="pfpBtn" onClick={newProfilePicture}>submit</Button>

        </Modal >
    )
}
import React from 'react'
import "./style.css"
import { Chip, Icon, Modal, Button } from 'react-materialize';
import API from "../../utils/API";

export default function UserChip({ userData }) {

    const axios = require("axios")

    const uploadProfilePicture = () => {
        document.querySelector('input[type=file]').addEventListener('change', function (e) {
            e.preventDefault()
            var pfp = this.files[0];

            if (pfp) {
                // Begin file upload
                console.log('Uploading file to Imgur..');

                var formData = new FormData();
                formData.append('image', pfp);

                // Response contains stringified JSON
                // Image URL available at response.data.link
                axios.post("https://api.imgur.com/3/image", formData, { headers: { "Authorization": "Client-ID 63ecd033f75acdb" } })
                    .then(res => {
                        API.uploadProfilePicture(res.data.link)
                        console.log("done", res)
                    }).catch((err) => {
                        console.log("Picture is too large!", err)
                    })
            };
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
                    {console.log(userData)}
                </Chip >
            }>

            <label>Select New Profile Picture:</label>
            <input type="file" id="img" name="img" accept="image/*" onChange={uploadProfilePicture} />

        </Modal >
    )
}
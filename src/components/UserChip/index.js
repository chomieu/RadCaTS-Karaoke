import React from 'react'
import "./style.css"
import { Chip, Icon } from 'react-materialize';

export default function UserChip({ userData }) {
    return (
        <Chip className="right userIcon" >

            {userData.profilePicture
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
        </Chip>
    )
}

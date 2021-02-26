import React from 'react'
import "./style.css"
import { Chip, Icon } from 'react-materialize';

export default function UserChip({ userState }) {
    return (
        <Chip className="right userIcon" >

            {userState.profilePicture
                ? <>
                    <img
                        alt="Contact Person"
                        className="responsive-img"
                        src={userState.profilePicture}
                    />
                    {userState.username}
                </>
                : <>
                    <Icon>person</Icon>
                    <span type="text">Login!</span>
                </>
            }
        </Chip>
    )
}

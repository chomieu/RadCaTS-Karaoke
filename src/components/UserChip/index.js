import React from 'react'
import { Chip, Icon } from 'react-materialize';

export default function UserChip({ userState }) {
    return (
        <Chip
            close={false}
            closeIcon={<Icon className="close">close</Icon>}
            options={null}
        >
            <img
                alt="Contact Person"
                className="responsive-img"
                src={userState.profilePicture}
            />
            {userState.username}
        </Chip>
    )
}

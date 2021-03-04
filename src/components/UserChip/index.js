import React from 'react'
import "./style.css"
import { Chip, Icon, Modal, Button } from 'react-materialize';

export default function UserChip({ userData }) {

    return (
        < Modal
            actions={
                [
                    <Button flat modal="close" node="button" waves="green">Close</Button>
                ]}
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
            }
            }
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
        </Modal >
    )
}

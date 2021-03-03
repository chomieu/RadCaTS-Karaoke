import React, { useState } from 'react';
import ManageColorLights from "../ManageColorLights";
import ManagePointLights from "../ManagePointLights";

function ManageLights({ isPlaying }) {

    return (
        <>
            { isPlaying ?
                <ManageColorLights />
                : <ManagePointLights />
            }
        </>
    )
}

export default ManageLights;
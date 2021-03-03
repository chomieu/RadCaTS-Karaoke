import React from "react";

function ManagePointLights() {
    return (
        <>
            <pointLight position={[-10, 10, 0]} intensity={0.6} />
            <pointLight position={[10, 10, 0]} intensity={0.6} />
        </>
    )
}

export default ManagePointLights;
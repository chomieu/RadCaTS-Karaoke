import React from "react";

function ManagePointLights() {
    return (
        <>
            <pointLight position={[-10, 10, 0]} intensity={0.7} />
            <pointLight position={[10, 10, 0]} intensity={0.7} />
        </>
    )
}

export default ManagePointLights;
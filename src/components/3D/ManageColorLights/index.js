import React, { useEffect, useState } from "react";

function ManageColorLights() {
    const [ time, setTime ] = useState({
        redTime: 0,
        greenTime: 0,
        blueTime: 0,
        yellowTime: 0
    });

    useEffect(() => {
        const timeInterval = setInterval(() => {
            setTime({
                redTime: 2.5 * Math.round(( Math.sin( Date.now() / 10 ) / 2 ) + 0.5 ),
                greenTime: 2.5 * Math.round(( Math.sin( 0.75 * Date.now() / 10 ) / 2 ) + 0.5 ),
                blueTime: 2.5 * Math.round(( Math.sin( 1.2 * Date.now() / 10 ) / 2 ) + 0.5 ),
                yellowTime: 2.5 * Math.round(( Math.sin( 1.4 * Date.now() / 10 ) / 2 ) + 0.5 )
            });
            // console.log( time.redTime, time.greenTime, time.blueTime, time.yellowTime );
        }, 100)

        return () => {
            clearInterval( timeInterval );
        }
    })

    return (
        <>
            <directionalLight position={[10, 10, -10]} intensity={ time.redTime } color={ "red" }/>
            <directionalLight position={[10, 10, 10]} intensity={ time.greenTime } color={ "green" }/>
            <directionalLight position={[-10, 10, -10]} intensity={ time.blueTime } color={ "blue" }/>
            <directionalLight position={[-10, 10, 0]} intensity={ time.yellowTime } color={ "yellow" }/>
        </>
    )
}

export default ManageColorLights;
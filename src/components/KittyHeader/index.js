import React, { Suspense, useState } from "react";
import { Canvas, useThree } from "react-three-fiber";
import './KittyHeader.css';
import Kitty from "../3D/Kitty";
import ManageLights from "../3D/ManageLights";
// import { OrbitControls } from "@react-three/drei";

function KittyHeader( { isPlaying } ) {

  return (
    <>
      <Canvas
        colorManagement
        shadowMap
        // camera={{ position: [0, 2, 16], fov: 40 }}>
        camera={{ position: [0, 2, 20], fov: 40 }}>
        <ambientLight intensity={0.7} />
        <ManageLights isPlaying={isPlaying} />
        {/* <OrbitControls /> */}
        <Suspense fallback={null} >
          <Kitty isPlaying={isPlaying} position={[0, -2, 0]} />
        </Suspense>
      </Canvas>
    </>
  )
};

export default KittyHeader;
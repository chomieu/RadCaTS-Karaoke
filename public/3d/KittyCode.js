
function KittyA(props) {
const group = useRef()
    const { nodes, materials } = useGLTF('/3d/KittyA.gltf')
    return (
        <group ref={group} {...props} dispose={null}>
        <group position={[0, 2.17, 0.11]}>
            <mesh material={materials.blinn1} geometry={nodes.KittyA_MSHPIV.geometry} position={[0, -2.17, -0.11]} />
        </group>
        </group>
    )
}

<Suspense fallback={ null } >
<KittyA />
</Suspense>
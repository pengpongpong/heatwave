import { useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

import { MathUtils } from "three";

const Heatwave = () => {

    const model = useGLTF('./heatwave2.glb');

    const scroll = useScroll();
    const modelRef = useRef<any>(null)


    useFrame((state, delta) => {

        const r1 = scroll.range(0, 1)


        if (modelRef.current) {
            modelRef.current.rotation.y = MathUtils.damp(modelRef.current.rotation.y, (-Math.PI * 2) * r1, 2, delta)
        }

    })

    return (

        <>
            <directionalLight intensity={5} position={[-1, -2, 3]} />
            {/* <ambientLight intensity={2} /> */}
            <primitive
                object={model.scene}
                ref={modelRef}
                scale={20}>
            </primitive>
        </>


    )
}

export default Heatwave;
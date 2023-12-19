import { useRef } from "react";

import { MathUtils } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useScroll } from "@react-three/drei"


const Heatwave = () => {
    const model = useGLTF('./heatwave2.glb');

    const scroll = useScroll();
    const modelRef = useRef<any>(null)

    const { width } = useThree((state) => (state.viewport))

    useFrame((state, delta) => {
        const r1 = scroll.range(0, 1)

        if (modelRef.current) {
            modelRef.current.rotation.y = MathUtils.damp(modelRef.current.rotation.y, (-Math.PI * 2) * r1, 4, delta)
        }

    })

    return (
        <primitive
            object={model.scene}
            ref={modelRef}
            scale={width * 2}>
        </primitive>
    )
}

export default Heatwave;
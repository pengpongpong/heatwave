import { useRef, useState } from "react";

import { MathUtils, Object3D } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useScroll, Text } from "@react-three/drei"


const Heatwave = () => {
    const model = useGLTF('https://res.cloudinary.com/dzvrnl80x/image/upload/v1704816261/heatwave/heatwave_model.glb');

    const scroll = useScroll();
    const modelRef = useRef<Object3D>(null)

    const { width } = useThree((state) => (state.viewport))

    const [scrollProgress, setScrollProgress] = useState(0);

    useFrame((state, delta) => {
        const r1 = scroll.range(0, 1)

        if (scrollProgress !== r1 * 100) {
            setScrollProgress(r1 * 100);
        }

        if (modelRef.current) {
            modelRef.current.rotation.y = MathUtils.damp(modelRef.current.rotation.y, (-Math.PI * 2) * r1, 4, delta)
        }

    })

    return (
        <>
            <primitive
                object={model.scene}
                ref={modelRef}
                scale={width * 2}>
            </primitive>
            <Text
                font="https://res.cloudinary.com/dzvrnl80x/raw/upload/v1704814014/heatwave/coolvetica_rg.otf"
                fontSize={.06}
                position={[0, -1.5, 2]}
                textAlign="center"
            >
                {scrollProgress.toFixed(0)}%
            </Text>
        </>
    )
}

export default Heatwave;
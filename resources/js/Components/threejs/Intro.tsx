import { Canvas } from "@react-three/fiber"
import { ScrollControls } from "@react-three/drei";
import Heatwave from "./Heatwave";

const Intro = () => {
    return (
        <Canvas
            style={{
                width: "100vw",
                height: "100vh",
            }}
            camera={{
                fov: 45,
                far: 1000,
                near: 0.1,
                position: [0, 0, 6]
            }}
        >
            <directionalLight intensity={5} position={[-1, -2, 3]} />

            <ScrollControls pages={2}>
                <Heatwave />
            </ScrollControls>
        </Canvas>
    )
}

export default Intro;
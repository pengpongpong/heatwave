import { Canvas } from "@react-three/fiber"
import { ScrollControls } from "@react-three/drei";
import Heatwave from "./Heatwave";

const Intro = () => {


    return (
        <Canvas
            style={{
                position: "relative",
                top: 0,
                left: 0,
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


            <ScrollControls pages={2}>
                <Heatwave />
            </ScrollControls>
        </Canvas>
    )
}

export default Intro;
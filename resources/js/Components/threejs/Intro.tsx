import { Canvas } from "@react-three/fiber"
import { OrbitControls, ScrollControls } from "@react-three/drei";
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
                border: "1px dashed black"
            }}
            camera={{
                fov: 45,
                far: 1000,
                near: 0.1,
                position: [0, 0, 6]
            }}
        >


            <ScrollControls pages={2}>
                {/* <OrbitControls makeDefault/> */}
                <Heatwave />
            </ScrollControls>
        </Canvas>
    )
}

export default Intro;
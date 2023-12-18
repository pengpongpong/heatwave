import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Guest from "@/Layouts/GuestLayout";
import Intro from "@/Components/threejs/Intro";

export default function Welcome({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    return (
        <>
            <Head title="Welcome" />
            <div className="w-screen h-screen">
                <Intro />
            </div>
            <div style={{ width: "100vw", height: "100vh" }}>
                <h1 className="font-coolvetica text-4xl text-white">We are Heatwave</h1>
            </div>
        </>
    );
}

import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Intro from "@/Components/threejs/Intro";
import { ImageBuilderProps, urlFor } from "@/utils/utils";
import Navbar from "@/Components/navbar/Navbar";
import { useState } from "react";
import { inView } from "framer-motion";

type LandingData = {
    slug: string;
    title: string;
    images: {
        firstPortrait: ImageBuilderProps["image"]
        firstLandscape: ImageBuilderProps["image"]
        secondPortrait: ImageBuilderProps["image"]
        secondLandscape: ImageBuilderProps["image"]
    }
}

export default function Welcome({ auth, data, sanityConfig }: PageProps<{ data: LandingData, sanityConfig: ImageBuilderProps['sanityConfig'] }>) {
    const [active, setActive] = useState(false)

    inView("main", () => {
        setActive(true)

        return () => setActive(false)
    })

    return (
        <>
            <Head title="Welcome" />
            <Navbar active={active} />
            <div className="w-screen h-screen">
                <Intro />
            </div>
            <main className="m-4">
                <h1 className="text-center text-6xl my-8">Heatwave</h1>
                <div className="flex flex-col items-center gap-4 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                         <img src={urlFor(data.images.firstPortrait, sanityConfig).fit('max').size(1847, 2309).url()} width={600} className="lg:col-span-2 w-full h-full object-cover" />
                        <img src={urlFor(data.images.firstLandscape, sanityConfig).fit('max').size(2920, 2336).url()} width={1000} className="lg:col-span-3 w-full h-full object-cover" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                        <img src={urlFor(data.images.secondLandscape, sanityConfig).fit('max').size(2920, 2336).url()} width={1000} className="lg:col-span-3 w-full h-full object-cover" />
                        <img src={urlFor(data.images.secondPortrait, sanityConfig).fit('max').size(1847, 2309).url()} width={600} className="lg:col-span-2 w-full h-full object-cover" />
                    </div>
                </div>
            </main>
            <footer className="my-12 text-center text-xl">
                <span>&#169; 2023 - Heatwave</span>
            </footer>
        </>
    );
}

import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Intro from "@/Components/threejs/Intro";
import { ImageBuilderProps, urlFor } from "@/utils/utils";

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

    return (
        <>
            <Head title="Welcome" />
            <div className="w-screen h-screen">
                <Intro />
            </div>
            <main>
                <h1 className="text-center text-4xl my-8">Heatwave</h1>
                <div className="flex flex-col justify-center items-center gap-4">
                    <div className="flex gap-4">
                        <img src={urlFor(data.images.firstPortrait, sanityConfig).fit('max').size(1847, 2309).url()} width={600} />
                        <img src={urlFor(data.images.firstLandscape, sanityConfig).fit('max').size(2920, 2336).url()} width={1000} />
                    </div>
                    <div className="flex flex-row-reverse gap-4">
                        <img src={urlFor(data.images.secondPortrait, sanityConfig).fit('max').size(1847, 2309).url()} width={600} />
                        <img src={urlFor(data.images.secondLandscape, sanityConfig).fit('max').size(2920, 2336).url()} width={1000} />
                    </div>
                </div>
            </main>
            <footer className="mt-8 mb-4 text-center text-xl">
                <span>&#169; 2023 - Heatwave</span>
            </footer>
        </>
    );
}

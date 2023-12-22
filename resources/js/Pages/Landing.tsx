import { PageProps } from '@/types';
import { urlFor } from "@/utils/utils";

import Intro from "@/Components/threejs/Intro";
import MainLayout from "@/Layouts/MainLayout";

type LandingData = {
    firstPortrait: string
    firstLandscape: string
    secondPortrait: string
    secondLandscape: string

}

type LandingProps = {
    data: LandingData;
    hideNav: boolean;
}

export default function Landing({ data, hideNav }: PageProps<LandingProps>) {
    return (
        <>
            <MainLayout title="Heatwave" hideNav={hideNav}>
                <div className="w-screen h-screen">
                    <Intro />
                </div>
                <main className="m-4" id="main">
                    <h1 className="text-6xl my-8">Heatwave</h1>
                    <div className="flex flex-col items-center gap-4 overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                            <img src={urlFor(data.firstPortrait).size(1847, 2309).getUrl()} width={600} className="lg:col-span-2 w-full h-full object-cover" />
                            <img src={urlFor(data.firstLandscape).size(2920, 2336).getUrl()} width={1000} className="lg:col-span-3 w-full h-full object-cover" />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                            <img src={urlFor(data.secondLandscape).size(2920, 2336).getUrl()} width={1000} className="lg:col-span-3 w-full h-full object-cover" />
                            <img src={urlFor(data.secondPortrait).size(1847, 2309).getUrl()} width={600} className="lg:col-span-2 w-full h-full object-cover" />
                        </div>
                    </div>
                </main>
            </MainLayout>
        </>
    );
}

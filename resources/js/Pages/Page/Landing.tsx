import { PageProps } from '@/types';
import { urlFor } from "@/utils/utils";

import Intro from "@/Components/threejs/Intro";
import MainLayout from "@/Layouts/MainLayout";
import PhoneContainer from "@/Components/phone/PhoneContainer";
import PageHeadline from "@/Components/common/PageHeadline";
import { useProgress } from "@react-three/drei";

type LandingData = {
    // firstPortrait: string
    firstLandscape: string
    secondPortrait: string
    secondLandscape: string
    videoUrl: string
}

type LandingProps = {
    data: LandingData;
    hideNav: boolean;
    hideCookieBanner: boolean;
    url: string;
}

export default function Landing({ data, hideNav, hideCookieBanner, url }: PageProps<LandingProps>) {
    const { total, loaded } = useProgress()

    const seo = {
        title: "Willkommen",
        description: "",
        keywords: "",
        url: url,
        image: {
            url: "https://res.cloudinary.com/dzvrnl80x/image/upload/v1704816852/heatwave/heatwave_icon.webp",
            width: "2250",
            height: "1623",
            alt: "Heatwave"
        }
    }

    return (
        <>
            <MainLayout seo={seo} hideNav={hideNav} hideCookieBanner={hideCookieBanner}>
                <div className="w-screen h-screen flex flex-col items-center justify-center">
                    {total === loaded
                        ? <Intro />
                        : <h1 className="text-3xl">Ladet...</h1>}
                </div>
                <main className="m-4 lg:m-12" id="main">
                    <PageHeadline title="Heatwave" />
                    <div className="flex flex-col items-center gap-4 overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <PhoneContainer />
                            <img src={urlFor(data.firstLandscape).size(2920, 2336).getUrl()} width={1000} className="lg:col-span-2 w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                            <img src={urlFor(data.secondLandscape).size(2920, 2336).getUrl()} width={1000} className="lg:col-span-3 w-full h-full object-cover" loading="lazy" />
                            <img src={urlFor(data.secondPortrait).size(1847, 2309).getUrl()} width={600} className="lg:col-span-2 w-full h-full object-cover" loading="lazy" />
                        </div>
                    </div>
                </main>
            </MainLayout>
        </>
    );
}

import MainLayout from "@/Layouts/MainLayout"

import CrewSwiper from "@/Components/swiper/the-crew/CrewSwiper"
import { CrewProps } from "../Upload/CrewUpload"
import PageHeadline from "@/Components/common/PageHeadline"

type TheCrewProps = {
    crew: CrewProps[];
    url: string;
}

const TheCrew = ({ crew, url }: TheCrewProps) => {
    const seo = {
        title: "Die Crew",
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
        <MainLayout
            seo={seo}
            hideNav={false}>
            <main className="w-full h-full flex-grow">
                <PageHeadline title="Die Crew" />
                <CrewSwiper crew={crew} />
            </main>
        </MainLayout>
    )
}

export default TheCrew
import MainLayout from "@/Layouts/MainLayout"

import CrewSwiper from "@/Components/swiper/the-crew/CrewSwiper"
import { CrewProps } from "./Upload/CrewUpload"
import PageHeadline from "@/Components/common/PageHeadline"


const TheCrew = ({ crew }: { crew: CrewProps[] }) => {
    return (
        <MainLayout
            title="The Crew"
            hideNav={false}>
            <PageHeadline title="Die Crew" />
            <CrewSwiper crew={crew} />
        </MainLayout>
    )
}

export default TheCrew
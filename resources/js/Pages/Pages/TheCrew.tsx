import MainLayout from "@/Layouts/MainLayout"

import CrewSwiper from "@/Components/swiper/the-crew/CrewSwiper"
import { CrewProps } from "../Upload/CrewUpload"


const TheCrew = ({ crew }: { crew: CrewProps[] }) => {
    return (
        <MainLayout
            title="The Crew"
            hideNav={false}>

            <CrewSwiper crew={crew} />
        </MainLayout>
    )
}

export default TheCrew
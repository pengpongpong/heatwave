import MainLayout from "@/Layouts/MainLayout"

import CrewSwiper from "@/Components/swiper/the-crew/CrewSwiper"


const TheCrew2 = () => {
    return (
        <MainLayout
            title="The Crew"
            hideNav={false}>

            <CrewSwiper />
        </MainLayout>
    )
}

export default TheCrew2
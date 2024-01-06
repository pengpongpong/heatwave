import MainLayout from "@/Layouts/MainLayout"

import CrewSwiper from "@/Components/swiper/the-crew/CrewSwiper"


const TheCrew = () => {
    return (
        <MainLayout
            title="The Crew"
            hideNav={false}>

            <CrewSwiper />
        </MainLayout>
    )
}

export default TheCrew
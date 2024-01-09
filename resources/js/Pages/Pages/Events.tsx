import MainLayout from "@/Layouts/MainLayout"
import EventSwiper from "@/Components/swiper/event-swiper/EventSwiper"
import { EventProps } from "@/types"
import PageHeadline from "@/Components/common/PageHeadline"


const Events = ({ events }: { events: EventProps[] }) => {
  return (
    <MainLayout title="Events" hideNav={false}>
      <main className="flex flex-col flex-grow items-center">
        <PageHeadline title="Aktuelle Events" />
        <EventSwiper events={events} />
      </main>
    </MainLayout>
  )
}

export default Events
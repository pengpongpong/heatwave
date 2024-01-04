import MainLayout from "@/Layouts/MainLayout"
import EventSwiper from "@/Components/swiper/event-swiper/EventSwiper"
import { EventProps } from "@/types"


const Events = ({ events }: { events: EventProps[] }) => {
  return (
    <MainLayout title="Events" hideNav={false}>
      <main className="flex flex-col flex-grow items-center">
        <h1 className="mt-12 text-4xl">Aktuelle Events</h1>
        <EventSwiper events={events} />
      </main>
    </MainLayout>
  )
}

export default Events
import MainLayout from "@/Layouts/MainLayout"
import EventSwiper from "@/Components/event-swiper/EventSwiper"


const Events = () => {
  return (
    <MainLayout title="Events" hideNav={false}>
      <main className="flex flex-col flex-grow items-center">
        <h1 className="mt-12 text-4xl">Aktuelle Events</h1>
        <div>
          <EventSwiper />
        </div>
      </main>
    </MainLayout>
  )
}

export default Events
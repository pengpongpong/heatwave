import MainLayout from "@/Layouts/MainLayout"

import EventSwiper from "@/Components/event-swiper/EventSwiper"

type Props = {}

const Events = (props: Props) => {
  return (
    <MainLayout title="Events" hideNav={false}>
      <main className="flex flex-col items-center flex-grow">
        <h1 className="mt-12 text-4xl">Latest Events</h1>
        <div>
          <EventSwiper />
        </div>
      </main>
    </MainLayout>
  )
}

export default Events
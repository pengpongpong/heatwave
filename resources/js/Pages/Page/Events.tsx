import MainLayout from "@/Layouts/MainLayout"
import EventSwiper from "@/Components/swiper/event-swiper/EventSwiper"
import { EventProps } from "@/types"
import PageHeadline from "@/Components/common/PageHeadline"

type EventsProps = {
  events: EventProps[],
  url: string
}

const Events = ({ events, url }: EventsProps) => {
  const seo = {
    title: "Events",
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
    <MainLayout seo={seo} hideNav={false}>
      <main className="h-fit flex flex-col flex-grow items-center">
        <PageHeadline title="Aktuelle Events" />
        <div className="mt-8 lg:mt-0">
          <EventSwiper events={events} />
        </div>
      </main>
    </MainLayout>
  )
}

export default Events
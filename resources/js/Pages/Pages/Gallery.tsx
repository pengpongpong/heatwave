import PageHeadline from "@/Components/common/PageHeadline";
import SwiperGallery from "@/Components/swiper/gallery/SwiperGallery"
import MainLayout from "@/Layouts/MainLayout"

type GalleryProps = {
  hideNav: boolean,
  imageList: {
    event: string;
    event_id: string;
    url: string;
  }[];
  eventList: {
    name: string;
    id: string;
  }[],
}

const Gallery = ({ hideNav, imageList, eventList }: GalleryProps) => {

  return (
    <MainLayout title="Gallery" hideNav={hideNav}>
      <main className="flex-grow">
        <PageHeadline title="Galerie" />
        <ul>
          {
            eventList.map((event) => {
              return <li className="mb-8" key={event.id}>
                <h2 className="text-2xl text-center underline">{event.name}</h2>
                <SwiperGallery data={imageList.filter((images) => (images.event_id === event.id))} />
              </li>
            })
          }

        </ul>
      </main>
    </MainLayout>
  )
}

export default Gallery
import SwiperGallery from "@/Components/swiper/gallery/SwiperGallery"
import MainLayout from "@/Layouts/MainLayout"

type GalleryProps = {
  hideNav: boolean,
  imageList: {
    event: string;
    url: string;
  }[];
  eventList: {
    name: string
  }[],
}

const Gallery = ({ hideNav, imageList, eventList }: GalleryProps) => {

  return (
    <MainLayout title="Gallery" hideNav={hideNav}>
      <main className="flex-grow">
        <h1 className="mt-12 mb-8 text-4xl text-center tracking-wider">Galerie</h1>

        <ul>
          {
            eventList.map((event) => {
              return <li className="mb-8" key={event.name}>
                <h2 className="text-2xl text-center underline">{event.name}</h2>
                <SwiperGallery data={imageList.filter((images) => (images.event === event.name))} />
              </li>
            })
          }

        </ul>
      </main>
    </MainLayout>
  )
}

export default Gallery
import SwiperGallery from "@/Components/swiper/gallery/SwiperGallery"
import MainLayout from "@/Layouts/MainLayout"

type GalleryProps = {
  hideNav: boolean,
  data: {
    images: string[]
  },
}

const Gallery = ({ hideNav, data }: GalleryProps) => {

  return (
    <MainLayout title="Gallery" hideNav={hideNav}>
      <main className="flex-grow">
        <h1 className="mt-12 text-4xl text-center tracking-wider">Galerie</h1>
        <SwiperGallery data={data} />
      </main>
    </MainLayout>
  )
}

export default Gallery
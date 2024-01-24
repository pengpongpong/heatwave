import { ReactNode } from "react";

type SwiperSlideProps = {
    children: ReactNode,
    onClick?: () => void
}

// swiper slide
const SwiperSlide = ({ children, onClick }: SwiperSlideProps) => (
    <div className="swiper-slide min-w-fit" onClick={onClick}>
        <div className="swiper-material-wrapper">
            <div className="swiper-material-content">
                {/* add swiper-material-animate-opacity class for opacity slide in/out animation */}
                {children}
            </div>
        </div>
    </div>
)

export default SwiperSlide
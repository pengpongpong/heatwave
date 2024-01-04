import { useEffect } from "react";
import EffectMaterial from "./effect-material.esm";
import Swiper from "swiper";

import 'swiper/scss';
import './effect-material.scss';
import './index.scss';

export type SwiperGalleryProps = {
    data: {
        event: string;
        url: string
    }[],
}

type SwiperElProps = {
    className?: {
        container?: string;
        swiper?: string
    },
    onClick: () => void;
} & SwiperGalleryProps;

type SwiperSlideProps = {
    imageUrl: string;
    event: string;
    onClick: () => void;
}

// swiper slide
const SwiperSlide = ({ imageUrl, event, onClick }: SwiperSlideProps) => {

    return (
        <div className="swiper-slide min-w-fit" onClick={onClick}>
            <div className="swiper-material-wrapper">
                <div className="swiper-material-content">
                    {/* add swiper-material-animate-opacity class for opacity slide in/out animation */}
                    <img
                        className="swiper-material-image"
                        data-swiper-material-scale="1"
                        width={362}
                        height={715}
                        src={imageUrl}
                        alt={event}
                    />
                </div>
            </div>
        </div>
    )
}

// swiper element
const SwiperEl = ({ data, className, onClick }: SwiperElProps) => {
    useEffect(() => {
        const swiper = new Swiper('.swiper', {
            modules: [EffectMaterial],
            effect: 'material',
            grabCursor: true,
            slidesPerView: 1,
            spaceBetween: 15,
            speed: 600,
            centeredSlides: true,
            loop: true,
            breakpoints: {
                320: {
                    slidesPerView: 1
                },
                700: {
                    slidesPerView: 2
                },
                1200: {
                    slidesPerView: 3
                },
                1600: {
                    slidesPerView: 4
                }
            }
        });
    }, [])

    return (
        <div className={`swiper-container w-screen h-full ${className?.container}`}>
            <div className={`swiper mt-8 ${className?.swiper}`}>
                <div className="swiper-wrapper">
                    {data.map((event) => (
                        <SwiperSlide imageUrl={event.url} event={event.event} key={event.url} onClick={onClick} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SwiperEl;
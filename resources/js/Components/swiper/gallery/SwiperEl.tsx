import { useEffect } from "react";

import Swiper from "swiper";
import { register } from "swiper/element/bundle";
import EffectMaterial from "./effect-material.esm";
import { Navigation, A11y } from "swiper/modules";
import SwiperSlide from "./SwiperSlide";

import './index.scss';
import './effect-material.scss';
import "swiper/css/a11y";
import 'swiper/scss';
import 'swiper/scss/navigation';
import { type SwiperGalleryProps } from "./SwiperGallery";


type SwiperElProps = {
    className?: {
        container?: string;
        swiper?: string
    },
    onClick: () => void;
} & SwiperGalleryProps;


// swiper element
const SwiperEl = ({ data, className, onClick, index }: SwiperElProps) => {
    register();
    
    useEffect(() => {
        const swiper = new Swiper(`.swiper-${index}`, {
            modules: [EffectMaterial, Navigation, A11y],
            effect: 'material',
            grabCursor: true,
            slidesPerView: 1,
            spaceBetween: 15,
            speed: 600,
            centeredSlides: true,
            loop: true,
            controller: {
                control: `.swiper-thumbs-${index}`,
            },
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
            },
            a11y: {
                enabled: true,
            },
            // navigation: {
            //     nextEl: `.button-${index}`,
            //     prevEl: `.button-${index}`,
            // }
        });
    }, [])

    return (
        <div className={`swiper-container w-screen h-full ${className?.container}`}>

            <div className={`swiper-${index} mt-8 ${className?.swiper}`}>
                <div className="swiper-wrapper">
                    {data.map((event, index) => (
                        <SwiperSlide onClick={onClick} key={event.url}>
                            {/* add swiper-material-animate-opacity class for opacity slide in/out animation */}
                            {index < 5
                                ? <img
                                    className="swiper-material-image"
                                    data-swiper-material-scale="1"
                                    width={362}
                                    height={715}
                                    src={event.url}
                                    alt={event.event}
                                />
                                : <img
                                    className="swiper-material-image"
                                    data-swiper-material-scale="1"
                                    width={362}
                                    height={715}
                                    src={event.url}
                                    alt={event.event}
                                    loading="lazy"
                                />}
                        </SwiperSlide>
                    ))}
                </div>
            </div>
            {/* <div className={`swiper-button-next button-${index}`}>NEXT</div>
            <div className={`swiper-button-prev button-${index}`}>PREV</div> */}
        </div>
    )
}

export default SwiperEl;
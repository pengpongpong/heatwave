import { useEffect } from "react";
import Swiper from 'swiper';
import EffectMaterial from './effect-material.esm.js';

import 'swiper/scss';
import './effect-material.scss';
import './index.scss';
import { urlFor } from "@/utils/utils.js";

type SwiperGalleryProps = {
    data: {
        images: string[]
    }
}

const SwiperSlide = ({ image }: { image: string }) => {
    return (
        <div className="swiper-slide min-w-fit">
            <div className="swiper-material-wrapper">
                <div className="swiper-material-content">
                    {/* add swiper-material-animate-opacity class for opacity slide in/out animation */}
                    <img
                        className="swiper-material-image"
                        data-swiper-material-scale="1"
                        width={428}
                        height={626}
                        src={urlFor(image).size(1638, 2048).getUrl()}
                        alt="Heatwave party"
                    />
                </div>
            </div>
        </div>
    )
}

const SwiperGallery = ({ data }: SwiperGalleryProps) => {
    useEffect(() => {
        const swiper = new Swiper('.swiper', {
            modules: [EffectMaterial],
            effect: 'material',
            grabCursor: true,
            slidesPerView: 4,
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
        <div className="swiper-container">
            <div className="swiper">
                <div className="swiper-wrapper">
                    {data.images.map((img) => (
                        <SwiperSlide image={img} key={img}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SwiperGallery
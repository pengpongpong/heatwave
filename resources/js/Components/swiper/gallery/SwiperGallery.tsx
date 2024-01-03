import { useEffect, useRef } from "react";
import Swiper from 'swiper';
import EffectMaterial from './effect-material.esm.js';

import 'swiper/scss';
import './effect-material.scss';
import './index.scss';

type SwiperGalleryProps = {
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
    onClick?: () => void;
} & SwiperGalleryProps;

type SwiperSlideProps = {
    imageUrl: string;
    event: string;
    onClick?: () => void;
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
                        width={428}
                        height={626}
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
        <div className={`swiper-container w-screen h-full ${className?.container}`}>
            <div className={`swiper mt-8 ${className?.swiper}`}>
                <div className="swiper-wrapper">
                    {data.map((event) => (
                        <SwiperSlide imageUrl={event.url} event={event.event} key={event.url} onClick={onClick}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

// swiper gallery
const SwiperGallery = ({ data }: SwiperGalleryProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const openModal = () => {
        if (!dialogRef.current) return;

        dialogRef.current.showModal();
    }

    const closeModal = () => {
        if (!dialogRef.current) return;

        dialogRef.current.close();
    }

    return (
        <>
            {!data[0]?.url
                ? <h2 className="text-center mt-4">Coming soon...</h2>
                : <>
                    <SwiperEl data={data} onClick={openModal} className={{ swiper: "h-[45vh] lg:h-[30vh] max-w-[100vw] lg:max-w-[60vw]", container: "w-full p-4" }} />
                    <dialog open={false} className="mx-auto my-auto w-full h-fit relative rounded-xl overflow-hidden" ref={dialogRef}>
                        <button onClick={closeModal} className="absolute right-2 top-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: "#000000" }}><path d="M9.172 16.242 12 13.414l2.828 2.828 1.414-1.414L13.414 12l2.828-2.828-1.414-1.414L12 10.586 9.172 7.758 7.758 9.172 10.586 12l-2.828 2.828z"></path><path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z"></path></svg>
                        </button>
                        <SwiperEl data={data} className={{ swiper: "h-[70vh] lg:h-[80vh] lg:max-w-[85vw]", container: "mx-auto w-[90vw] lg:w-[90vw] h-full p-4 lg:p-8 flex flex-col justify-center items-center" }} />
                    </dialog>
                </>}
        </>
    )
}

export default SwiperGallery
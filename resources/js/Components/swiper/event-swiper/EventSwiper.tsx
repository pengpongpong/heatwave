import { useLayoutEffect } from 'react'
import createExpandingCollection from './expanding-collection';
import { EventProps } from "@/types";
import './expanding-collection.scss';
import './event-swiper.scss';

type EventSwiperSlideProps = {
    title: string;
    location: string;
    date: string;
    time: string;
    artists: string;
    imageUrl: string;
    index: {
        position: number;
        length: number;
    };
}

// Swiper slide
const EventSwiperSlide = ({ title, location, time, date, artists, imageUrl, index }: EventSwiperSlideProps) => {
    const handle = () => {
        const body = document.querySelector("body");
        if (!body) return

        body.style.setProperty("--color", "#535295")
    }

    return (
        <>
            <div className="swiper-slide">
                <div className="expanding-collection-container relative">
                    <div className="expanding-collection-content">
                        <div className="expanding-collection-content-inner">
                            <div>
                                <div className="text-center text-xl xl:text-2xl">{title + " - " + location}</div>
                                <div className="mt-2 flex justify-between xl:text-lg">
                                    <div className="flex flex-col">
                                        <span>{location}</span>
                                        <span>{date} - {time}</span>
                                    </div>
                                    <div className="max-w-[50%] xl:max-w-[15rem]">
                                        <span>{artists}</span>
                                    </div>
                                </div>
                                <span className="w-full inline-block text-center">Kaufe Tickets <a href="#" className="underline">hier</a></span>
                            </div>
                        </div>
                    </div>

                    {/* Expanding collection cover */}
                    <div className="expanding-collection-cover">
                        {index.position > 1
                            ? <img src={imageUrl} width={500} height={500} onLoad={handle} loading="lazy" />
                            : <img src={imageUrl} width={500} height={500} />
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

const EventSwiper = ({ events }: { events: EventProps[] }) => {
    useLayoutEffect(() => {
        const sliderEl = document.querySelector('.expanding-collection');

        if (!sliderEl) return

        createExpandingCollection(sliderEl);
    }, [])

    return (
        <div id="event">
            <div className="expanding-collection">
                <div className="swiper">
                    <div className="swiper-wrapper">
                        {events.map((event, index) => (
                            <EventSwiperSlide
                                title={event.name}
                                location={event.location}
                                time={event.time}
                                date={`${event.date}`}
                                artists={event.artist}
                                imageUrl={event.cover_url}
                                key={event.id}
                                index={{ position: index, length: events.length }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventSwiper
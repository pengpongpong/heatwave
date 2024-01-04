import { useEffect } from 'react'
import createExpandingCollection from './expanding-collection';
import './expanding-collection.scss';
import './event-swiper.scss';
import { EventProps } from "@/types";

type EventSwiperSlideProps = {
    title: string;
    location: string;
    date: string;
    time: string;
    artists: string;
    imageUrl: string;
}

// Swiper slide
const EventSwiperSlide = ({ title, location, time, date, artists, imageUrl }: EventSwiperSlideProps) => {
    return (
        <div className="swiper-slide">
            <div className="expanding-collection-container">
                <div className="expanding-collection-content">
                    <div className="expanding-collection-content-inner">
                        <div>
                            <div className="text-center text-xl xl:text-2xl">{title + " - " + location}</div>
                            <div className="mt-6 flex justify-between xl:text-lg">
                                <div className="flex flex-col">
                                    <span>{location}</span>
                                    <span>{date} - {time}</span>
                                </div>
                                <div className="max-w-[50%] xl:max-w-[15rem]">
                                    <span>{artists}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Expanding collection cover */}
                <div className="expanding-collection-cover">
                    <img src={imageUrl} width={500} height={500}/>
                </div>
            </div>
        </div>
    )
}

const EventSwiper = ({ events }: { events: EventProps[] }) => {
    useEffect(() => {
        const sliderEl = document.querySelector('.expanding-collection');

        createExpandingCollection(sliderEl);
    }, [])

    return (
        <div id="event">
            <div className="expanding-collection">
                <div className="swiper">
                    <div className="swiper-wrapper">
                        {events.map((event) => (
                            <EventSwiperSlide
                                title={event.name}
                                location={event.location}
                                time={event.time}
                                date={`${event.date}`}
                                artists={event.artist}
                                imageUrl={event.cover_url}
                                key={event.id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventSwiper
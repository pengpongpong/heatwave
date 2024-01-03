import { useEffect } from 'react'
import createExpandingCollection from './expanding-collection';
import './expanding-collection.scss';
import './event-swiper.scss';

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
                    <img src={imageUrl} />
                </div>
            </div>
        </div>
    )
}

const eventData = [
    {
        title: "Heatwave #4",
        location: "Schrille Grille",
        date: "01/10/23",
        time: "19:00",
        artists: "DJ Raifu, Cloud.G",
        imageUrl: "/heatwave_event4.jpeg"
    },
    {
        title: "Heatwave #3",
        location: "PPC",
        date: "01/10/23",
        time: "19:00",
        artists: "DJ Raifu, Tori",
        imageUrl: "/heatwave_event3.jpeg"
    },
    {
        title: "Heatwave #2",
        location: "Schrille Grille",
        date: "01/10/23",
        time: "19:00",
        artists: "DJ Raifu, Noah Trembley, Vienca",
        imageUrl: "/heatwave_event2.jpeg"
    },
    {
        title: "Heatwave #1",
        location: "Schrille Grille",
        date: "01/10/23",
        time: "19:00",
        artists: "DJ Raifu, Noah Trembley",
        imageUrl: "/heatwave_event1.jpeg"
    },
]

const EventSwiper = () => {
    useEffect(() => {
        const sliderEl = document.querySelector('.expanding-collection');

        createExpandingCollection(sliderEl);
    }, [])

    return (
        <div id="event">
            <div className="expanding-collection">
                <div className="swiper">
                    <div className="swiper-wrapper">
                        {eventData.map((event) => (
                            <EventSwiperSlide
                                title={event.title}
                                location={event.location}
                                time={event.time}
                                date={event.date}
                                artists={event.artists}
                                imageUrl={event.imageUrl}
                                key={event.title}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventSwiper
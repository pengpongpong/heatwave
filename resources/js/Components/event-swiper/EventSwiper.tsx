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

const EventSwiperSlide = ({ title, location, time, date, artists, imageUrl }: EventSwiperSlideProps) => {
    return (
        <div className="swiper-slide">
            {/* <!-- Expanding collection container, required element --> */}
            <div className="expanding-collection-container">
                {/* <!-- Expanding collection content that opens underneath the cover image on click --> */}
                <div className="expanding-collection-content">
                    <div className="expanding-collection-content-inner">
                        {/* <!-- Put any required content here --> */}
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

                {/* <!-- Expanding collection cover, can contain any HTML content --> */}
                <div className="expanding-collection-cover">
                    <img src={imageUrl} />
                </div>
            </div>
        </div>
    )
}



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
                        <EventSwiperSlide
                            title="Heatwave #4"
                            location="Schrille Grille"
                            date="01/10/23"
                            time="19:00"
                            artists={"DJ Raifu, Cloud.G"}
                            imageUrl="/heatwave_event4.jpeg"
                        />
                        <EventSwiperSlide
                            title="Heatwave #3"
                            location="PPC"
                            date="01/10/23"
                            time="19:00"
                            artists={"DJ Raifu, Tori"}
                            imageUrl="/heatwave_event3.jpeg"
                        />
                        <EventSwiperSlide
                            title="Heatwave #2"
                            location="Schrille Grille"
                            date="01/10/23"
                            time="19:00"
                            artists={"DJ Raifu, Noah Trembley, Vienca"}
                            imageUrl="/heatwave_event2.jpeg"
                        />
                        <EventSwiperSlide
                            title="Heatwave #1"
                            location="Schrille Grille"
                            date="01/10/23"
                            time="19:00"
                            artists={"DJ Raifu, Noah Trembley"}
                            imageUrl="/heatwave_event1.jpeg"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventSwiper
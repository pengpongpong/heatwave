import { useEffect } from 'react'
import createCrewSlider from './crew-slider';
import './crew-slider.scss';
import './index.scss';


type CrewSwiperSlideProps = {
  title: string;
  imgSrc: string;
  text: string;
}

const CrewSwiperSlide = ({ title, imgSrc, text }: CrewSwiperSlideProps) => {
  return (
    <>
      {/* <!-- configure slide color with "data-slide-bg-color" attribute --> */}
      <div className="swiper-slide">
        {/* <!-- slide title wrap --> */}
        <div className="crew-slider-title" data-swiper-parallax="-130%">
          {/* <!-- slide title text --> */}
          <div className="crew-slider-title-text">{title}</div>
        </div>
        {/* <!-- slide image wrap --> */}
        <div className="mt-24 h-fit crew-slider-scale">
          {/* <!-- slide image --> */}
          {/* <img src={imgSrc} /> */}
          <div id="active-slide" className="lg:mt-16 flex flex-col justify-center items-center lg:flex-row gap-8">
            <img className="w-[300px] h-[300px] rounded-xl" width={300} height={300} src={imgSrc} alt="" />
            <div className="p-4 flex flex-col justify-between items-center gap-8">
              <p className="max-w-lg">{text}</p>
              <ul className="flex gap-4">
                <li className="mb-2">
                  <a
                    href={"https://www.instagram.com/heatwave.association/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-2"
                  >
                    <img src="/bxl-instagram.svg" width={25} alt="Instagram" />
                    Instagram
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href={route("events")}
                    className="flex gap-2"
                  >
                    <img src="/bxs-hand-right.svg" width={25} alt="Events" />
                    Website
                  </a>
                </li>
                <li>
                  <a
                    href={route("home")}
                    className="flex gap-2"
                  >
                    <img src="/bx-envelope.svg" width={25} alt="Mail icon" />
                    Kontakt
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

const data = {
  first: {
    title: "Oh Teezy",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
   },
  second: {
    title: "DJ Raifu",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
   },
  third: {
    title: "DJ Noah",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
   },
}

const CrewSwiper = () => {
  useEffect(() => {
    const sliderEl = document.querySelector('.crew-slider');

    createCrewSlider(sliderEl);
  }, [])

  return (
    <div id="crew">
      {/* <!-- Fashion slider container --> */}
      <div className="crew-slider">
        <div className="swiper">
          <div className="swiper-wrapper">
            <CrewSwiperSlide
              title="Oh Teezy"
              text={data.first.text}
              imgSrc="/crew3.png"
            />
            <CrewSwiperSlide
              title="DJ Raifu"
              text={data.first.text}
              imgSrc="/crew.png"
            />
            <CrewSwiperSlide
              title="DJ Noah"
              text={data.first.text}
              imgSrc="/crew3.png"
            />
          </div>
          {/* <!-- right/next navigation button --> */}
          <div className="crew-slider-button-prev crew-slider-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 350 160 90">
              <g className="crew-slider-svg-wrap">
                <g className="crew-slider-svg-circle-wrap">
                  <circle cx="42" cy="42" r="40"></circle>
                </g>
                <path className="crew-slider-svg-arrow" d="M.983,6.929,4.447,3.464.983,0,0,.983,2.482,3.464,0,5.946Z">
                </path>
                <path className="crew-slider-svg-line" d="M80,0H0"></path>
              </g>
            </svg>
          </div>
          {/* <!-- left/previous navigation button --> */}
          <div className="crew-slider-button-next crew-slider-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 350 160 90">
              <g className="crew-slider-svg-wrap">
                <g className="crew-slider-svg-circle-wrap">
                  <circle cx="42" cy="42" r="40"></circle>
                </g>
                <path className="crew-slider-svg-arrow" d="M.983,6.929,4.447,3.464.983,0,0,.983,2.482,3.464,0,5.946Z">
                </path>
                <path className="crew-slider-svg-line" d="M80,0H0"></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CrewSwiper
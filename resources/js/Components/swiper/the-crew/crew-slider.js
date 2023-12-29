import Swiper from 'swiper';
import { Parallax } from 'swiper/modules';

export default function createCrewSlider(el) {
  const swiperEl = el.querySelector('.swiper');
  let navigationLocked = false;
  let transitionDisabled = false;
  let frameId;

  // eslint-disable-next-line
  const disableTransitions = (el) => {
    el.classList.add('crew-slider-no-transition');
    transitionDisabled = true;
    cancelAnimationFrame(frameId);
    frameId = requestAnimationFrame(() => {
      el.classList.remove('crew-slider-no-transition');
      transitionDisabled = false;
      navigationLocked = false;
    });
  };

  let crewSlider;

  const onNextClick = () => {
    if (!navigationLocked) {
      crewSlider.slideNext();
    }
  };
  const onPrevClick = () => {
    if (!navigationLocked) {
      crewSlider.slidePrev();
    }
  };

  const initNavigation = (swiper) => {
    // Use lock to control the button locking time without using the button component that comes with it
    swiper.el
      .querySelector('.crew-slider-button-next')
      .addEventListener('click', onNextClick);
    swiper.el
      .querySelector('.crew-slider-button-prev')
      .addEventListener('click', onPrevClick);
  };

  const destroyNavigation = (swiper) => {
    swiper.el
      .querySelector('.crew-slider-button-next')
      .removeEventListener('click', onNextClick);
    swiper.el
      .querySelector('.crew-slider-button-prev')
      .removeEventListener('click', onPrevClick);
  };

  crewSlider = new Swiper(swiperEl, {
    modules: [Parallax],
    speed: 1300,
    allowTouchMove: false, // no touch swiping
    parallax: true, // text parallax
    on: {
      transitionStart(swiper) {
        // eslint-disable-next-line
        const { slides, previousIndex, activeIndex, el } = swiper;
        if (!transitionDisabled) navigationLocked = true; // lock navigation buttons
        const activeSlide = slides[activeIndex];
        const previousSlide = slides[previousIndex];
        const previousImageScale = previousSlide.querySelector(
          '.crew-slider-scale',
        ); // image wrapper
        const previousImage = previousSlide.querySelector('#active-slide'); // current image
        const activeImage = activeSlide.querySelector('#active-slide'); // next image
        const direction = activeIndex - previousIndex;
        // const bgColor = activeSlide.getAttribute('data-slide-bg-color');
        // el.style['background-color'] = bgColor; // background color animation

        previousImageScale.style.transform = 'scale(0.9)';
        previousImage.style.transitionDuration = '1000ms';
        previousImage.style.transform = 'scale(1.1)'; // image scaling parallax
        const previousSlideTitle = previousSlide.querySelector(
          '.crew-slider-title-text',
        );
        previousSlideTitle.style.transition = '1000ms';
        previousSlideTitle.style.color = 'rgba(255,255,255,0)'; // text transparency animation

        const onTransitionEnd = (e) => {
          if (e.target !== previousImage) return;
          previousImage.removeEventListener('transitionend', onTransitionEnd);
          activeImage.style.transitionDuration = '1300ms';
          activeImage.style.transform = 'translate3d(0, 0, 0) scale(1.1)'; // image shift parallax
          previousImage.style.transitionDuration = '1300ms';
          previousImage.style.transform = `translate3d(${
            10 * direction
          }%, 0, 0)  scale(1.1)`;
        };
        previousImage.addEventListener('transitionend', onTransitionEnd);

        window.scrollTo({top: 0, behavior: "smooth"})
      },
      transitionEnd(swiper) {
        // eslint-disable-next-line
        const { slides, activeIndex, el } = swiper;
        const activeSlide = slides[activeIndex];
        const activeImage = activeSlide.querySelector('#active-slide');

        activeSlide.querySelector('.crew-slider-scale').style.transform =
          'scale(1)';
        activeImage.style.transitionDuration = '1000ms';
        activeImage.style.transform = 'scale(1)';

        const activeSlideTitle = activeSlide.querySelector(
          '.crew-slider-title-text',
        );
        activeSlideTitle.style.transition = '1000ms';
        activeSlideTitle.style.color = 'rgba(255,255,255,1)'; // text transparency animation

        const onTransitionEnd = (e) => {
          if (e.target !== activeImage) return;
          activeImage.removeEventListener('transitionend', onTransitionEnd);
          navigationLocked = false;
        };
        activeImage.addEventListener('transitionend', onTransitionEnd);
        // First and last, disable button
        if (activeIndex === 0) {
          el.querySelector('.crew-slider-button-prev').classList.add(
            'crew-slider-button-disabled',
          );
        } else {
          el.querySelector('.crew-slider-button-prev').classList.remove(
            'crew-slider-button-disabled',
          );
        }

        if (activeIndex === slides.length - 1) {
          el.querySelector('.crew-slider-button-next').classList.add(
            'crew-slider-button-disabled',
          );
        } else {
          el.querySelector('.crew-slider-button-next').classList.remove(
            'crew-slider-button-disabled',
          );
        }
      },
      beforeInit(swiper) {
        const { el } = swiper;
        // disable initial transition
        disableTransitions(el);
      },
      init(swiper) {
        // Set initial slide bg color
        // eslint-disable-next-line
        const { slides, activeIndex, el } = swiper;
        // set current bg color
        // const bgColor = slides[activeIndex].getAttribute('data-slide-bg-color');
        // el.style['background-color'] = bgColor; // background color animation
        // trigger the transitionEnd event once during initialization
        swiper.emit('transitionEnd');
        // init navigation
        initNavigation(swiper);
      },
      resize(swiper) {
        disableTransitions(swiper.el);
      },
      destroy(swiper) {
        destroyNavigation(swiper);
      },
    },
  });

  return crewSlider;
}

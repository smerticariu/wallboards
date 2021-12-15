import React, { useState, useEffect, useRef } from 'react';
import { ArrowDownIcon } from '../../assets/static/icons/arrow-down';
import { DEFAULTS } from '../../common/defaults/defaults';
import GridResizeContainer from '../grid/grid.resize-container';
import Toolbar from '../toolbar/toolbar';
import SliderContent from './slider-content';

const getWidth = () => window.innerWidth;

const Slider = ({ slides, ...props }) => {
  const firstSlide = slides[0];
  const secondSlide = slides[1];
  const lastSlide = slides[slides.length - 1];

  const [state, setState] = useState({
    activeSlide: 0,
    translate: getWidth(),
    transition: 0.45,
    transitioning: false,
    _slides: [lastSlide, firstSlide, secondSlide],
  });

  const { activeSlide, translate, _slides, transition, transitioning } = state;

  const autoPlayRef = useRef();
  const transitionRef = useRef();
  const resizeRef = useRef();
  const sliderRef = useRef();
  const throttleRef = useRef();

  useEffect(() => {
    autoPlayRef.current = nextSlide;
    transitionRef.current = smoothTransition;
    resizeRef.current = handleResize;
    throttleRef.current = throttleArrows;
  });

  useEffect(() => {
    const slider = sliderRef.current;

    const smooth = (e) => {
      if (e.target.className.includes('slider__content')) {
        transitionRef.current();
      }
    };

    const resize = () => {
      resizeRef.current();
    };

    const throttle = (e) => {
      if (e.target.className.includes('slider__content')) {
        throttleRef.current();
      }
    };

    const transitionStart = slider.addEventListener('transitionstart', throttle);
    const transitionEnd = slider.addEventListener('transitionend', smooth);
    const onResize = window.addEventListener('resize', resize);

    return () => {
      slider.removeEventListener('transitionend', transitionStart);
      slider.removeEventListener('transitionend', transitionEnd);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };

    let interval = null;

    // if (props.autoPlay) {
    interval = setInterval(play, slides[activeSlide].stepTime * 1000);
    // }

    return () => {
      // if (props.autoPlay) {
      clearInterval(interval);
      // }
    };
  }, [activeSlide]);

  useEffect(() => {
    if (transition === 0) setState({ ...state, transition: 0.45, transitioning: false });
  }, [transition]);

  const throttleArrows = () => {
    setState({ ...state, transitioning: true });
  };

  const handleResize = () => {
    setState({ ...state, translate: getWidth(), transition: 0 });
  };

  const nextSlide = () => {
    if (transitioning) return;

    setState({
      ...state,
      translate: translate + getWidth(),
      activeSlide: activeSlide === slides.length - 1 ? 0 : activeSlide + 1,
    });
  };

  const prevSlide = () => {
    if (transitioning) return;

    setState({
      ...state,
      translate: 0,
      activeSlide: activeSlide === 0 ? slides.length - 1 : activeSlide - 1,
    });
  };

  const smoothTransition = () => {
    let _slides = [];

    // We're at the last slide.
    if (activeSlide === slides.length - 1) _slides = [slides[slides.length - 2], lastSlide, firstSlide];
    // We're back at the first slide. Just reset to how it was on initial render
    else if (activeSlide === 0) _slides = [lastSlide, firstSlide, secondSlide];
    // Create an array of the previous last slide, and the next two slides that follow it.
    else _slides = slides.slice(activeSlide - 1, activeSlide + 2);

    setState({
      ...state,
      _slides,
      transition: 0,
      translate: getWidth(),
    });
  };
  return (
    <div className="c-wallboard--read-only" ref={sliderRef}>
      <Toolbar template={DEFAULTS.TOOLBAR.NAME.WALLBOARD_READ_ONLY} wbName={slides[activeSlide].wallboardFulData.name} />

      <SliderContent translate={translate} transition={transition} width={getWidth() * _slides.length}>
        {_slides.map((_slide, i) => (
          <div
            key={_slide.stepId + _slide.wallboardFulData.id}
            className="c-wallboard--read-only__component"
            style={{ marginLeft: '15px' }}
          >
            <div className="c-wallboard--read-only__cards">
              <GridResizeContainer isEditMode={false} widgets={_slide.wallboardFulData.widgets} />
            </div>
          </div>
        ))}
      </SliderContent>

      <ArrowDownIcon className="i--arrow i--arrow--left" onClick={prevSlide} />
      <ArrowDownIcon className="i--arrow i--arrow--right" onClick={nextSlide} />
    </div>
  );
};

export default Slider;

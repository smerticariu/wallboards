import React, { useEffect, useState } from 'react';
import { ArrowDownIcon } from '../../assets/static/icons/arrow-down';
import { DEFAULTS } from '../../common/defaults/defaults';
import GridResizeContainer from '../grid/grid.resize-container';
import Toolbar from '../toolbar/toolbar';

const Slider = ({ slides, ...props }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isShowNextAndPrevSlide, handleIsShowNextAndPrevSlide] = useState(false);
  useEffect(() => {
    handleIsShowNextAndPrevSlide(false);
    const changeSlideIndexTimeout = setTimeout(nextSlide, slides[activeSlideIndex].stepTime * 1000);
    const showNextSlideTimeout = setTimeout(() => handleIsShowNextAndPrevSlide(true), (slides[activeSlideIndex].stepTime - 1) * 1000);
    return () => {
      clearTimeout(changeSlideIndexTimeout);
      clearTimeout(showNextSlideTimeout);
    };
    // eslint-disable-next-line
  }, [activeSlideIndex]);
  const nextSlide = () => {
    if (!isShowNextAndPrevSlide) handleIsShowNextAndPrevSlide(true);

    setTimeout(() => {
      if (activeSlideIndex !== slides.length - 1) {
        setActiveSlideIndex(activeSlideIndex + 1);
      } else if (activeSlideIndex === slides.length - 1) {
        setActiveSlideIndex(0);
      }
    }, 0);
  };

  const prevSlide = () => {
    if (!isShowNextAndPrevSlide) handleIsShowNextAndPrevSlide(true);
    setTimeout(() => {
      if (activeSlideIndex !== 0) {
        setActiveSlideIndex(activeSlideIndex - 1);
      } else if (activeSlideIndex === 0) {
        setActiveSlideIndex(slides.length - 1);
      }
    }, 0);
  };

  const getNewSlide = (stepId, wallboarDId, index, widgets) => (
    <div
      key={stepId + wallboarDId}
      className={
        activeSlideIndex === index
          ? 'c-wallboard--read-only__cards c-wallboard--read-only__cards--slider c-wallboard--read-only__cards--slider--active'
          : 'c-wallboard--read-only__cards c-wallboard--read-only__cards--slider'
      }
    >
      <GridResizeContainer isEditMode={false} widgets={widgets} />
    </div>
  );
  const checkIsStepShow = (index) => {
    if (index === activeSlideIndex) {
      return true;
    }
    if (!isShowNextAndPrevSlide) return false;

    if (activeSlideIndex === slides.length - 1 && index === 0) return true;
    if (index === activeSlideIndex + 1) return true;

    if (activeSlideIndex === 0 && index === slides.length - 1) return true;
    if (index === activeSlideIndex - 1) return true;

    return false;
  };
  return (
    <div className="c-wallboard--read-only c-wallboard--read-only--slider">
      <Toolbar template={DEFAULTS.TOOLBAR.NAME.WALLBOARD_READ_ONLY} wbName={slides[activeSlideIndex].wallboardFulData.name} />
      <div className="c-wallboard--read-only__component c-wallboard--read-only__component--slider">
        {slides.reduce((slidesLocal, slide, index) => {
          if (!checkIsStepShow(index)) {
            return slidesLocal;
          }
          const newSlide = getNewSlide(slide.stepId, slide.wallboardFulData.id, index, slide.wallboardFulData.widgets);
          return [...slidesLocal, newSlide];
        }, [])}
      </div>

      <ArrowDownIcon className="i--arrow i--arrow--slider i--arrow--left" onClick={prevSlide} />
      <ArrowDownIcon className="i--arrow i--arrow--slider i--arrow--right" onClick={nextSlide} />
    </div>
  );
};

export default Slider;

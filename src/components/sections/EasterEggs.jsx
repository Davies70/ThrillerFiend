import React, { useRef } from 'react';
import Header from '../Header';
import GridContentScroller from '../GridContentScroller';
import easterEggs from '../../api/easterEggs';
import { useScroll } from '../../utils';

const EasterEggs = () => {
  const contentScrollRef = useRef();
  const { moreRight, moreLeft, handleScrollerX } = useScroll();

  return (
    <section className='section'>
      <Header
        handleScrollerX={handleScrollerX}
        headerText='Easter Eggs'
        moreLeft={moreLeft}
        moreRight={moreRight}
        contentScrollRef={contentScrollRef}
      />
      <GridContentScroller
        contentScrollRef={contentScrollRef}
        data={easterEggs}
      />
    </section>
  );
};

export default EasterEggs;

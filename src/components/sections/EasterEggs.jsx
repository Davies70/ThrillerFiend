import React, { useRef } from 'react';
import Header from '../Header';
import GridContentScroller from '../GridContentScroller';
import books from '../../api/books';

const EasterEggs = () => {
  const contentScrollRef = useRef();
  const handleScrollerX = (direction) => {
    const scrollBarWidth = 8;
    const scrollWidth = window.innerWidth - scrollBarWidth;
    if (direction === 'left') {
      contentScrollRef.current.scrollLeft += scrollWidth;
    } else {
      contentScrollRef.current.scrollLeft -= scrollWidth;
    }
  };
  return (
    <section className='section'>
      <Header
        handleScrollerX={handleScrollerX}
        contentScrollRef={contentScrollRef}
        headerText='Easter Eggs'
      />
      <GridContentScroller contentScrollRef={contentScrollRef} data={books} />
    </section>
  );
};

export default EasterEggs;

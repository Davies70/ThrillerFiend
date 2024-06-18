import React, { useRef } from 'react';
import Header from '../Header';
import GridContentScroller from '../GridContentScroller';
import books from '../../api/books';

const EasterEggs = () => {
  const contentScrollRef = useRef();
  const handleScrollerX = (direction) => {
    if (direction === 'right') {
      contentScrollRef.current.scrollLeft +=
        contentScrollRef.current.clientWidth;
    } else {
      contentScrollRef.current.scrollLeft -=
        contentScrollRef.current.clientWidth;
    }
  };
  return (
    <section className='section'>
      <Header handleScrollerX={handleScrollerX} headerText='Easter Eggs' />
      <GridContentScroller contentScrollRef={contentScrollRef} data={books} />
    </section>
  );
};

export default EasterEggs;

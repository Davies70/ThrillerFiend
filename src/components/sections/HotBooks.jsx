import React, { useRef } from 'react';
import Header from '../Header';
import ContentScroller from '../ContentScroller';
import books from '../../api/books';

const HotBooks = () => {
  const contentScrollRef = useRef();
  const shape = 'square';
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
        headerText='Thrills of the Week'
      />
      <ContentScroller
        contentScrollRef={contentScrollRef}
        shape={shape}
        data={books}
      />
    </section>
  );
};

export default HotBooks;

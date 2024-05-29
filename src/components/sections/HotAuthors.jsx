import React, { useRef } from 'react';
import '../../styles/HotAuthors.css';
import Header from '../Header';
import ContentScroller from '../ContentScroller';

const HotAuthors = () => {
  const contentScrollRef = useRef();
  const handleScrollerX = (direction) => {
    const scrollBarWidth = 8;
    const scrollWidth = window.innerWidth - scrollBarWidth;
    // console.log('window-width', window.innerWidth);
    // console.log('scroll-width', contentScrollRef.current.scrollWidth);
    // console.log('scroll-left', contentScrollRef.current.scrollLeft);

    if (direction === 'left') {
      contentScrollRef.current.scrollLeft += scrollWidth;
    } else {
      contentScrollRef.current.scrollLeft -= scrollWidth;
    }
  };
  return (
    <section className='hot-authors'>
      <Header
        handleScrollerX={handleScrollerX}
        contentScrollRef={contentScrollRef}
      />
      <ContentScroller contentScrollRef={contentScrollRef} />
    </section>
  );
};

export default HotAuthors;

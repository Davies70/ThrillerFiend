import React, { useRef } from 'react';
import '../../styles/Section.css';
import Header from '../Header';
import ContentScroller from '../ContentScroller';
import authors from '../../api/authors';

const HotAuthors = () => {
  const contentScrollRef = useRef();
  const shape = 'circle';
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
        headerText='Hot Authors'
      />
      <ContentScroller
        contentScrollRef={contentScrollRef}
        data={authors}
        shape={shape}
      />
    </section>
  );
};

export default HotAuthors;

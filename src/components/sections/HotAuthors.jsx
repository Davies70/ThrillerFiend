import React, { useRef, useState } from 'react';
import '../../styles/Section.css';
import Header from '../Header';
import ContentScroller from '../ContentScroller';
import authors from '../../api/authors';

const HotAuthors = () => {
  const contentScrollRef = useRef();
  const [moreRight, setMoreRight] = useState(false);

  const shape = 'circle';

  const handleScrollerX = (direction) => {
    if (direction === 'right') {
      console.log(
        contentScrollRef.current?.scrollLeft,
        contentScrollRef.current.clientWidth,
        contentScrollRef.current.scrollWidth
      );
      contentScrollRef.current.scrollLeft +=
        contentScrollRef.current.clientWidth;
      console.log(contentScrollRef.current?.scrollLeft);
    } else {
      contentScrollRef.current.scrollLeft -=
        contentScrollRef.current.clientWidth;
      contentScrollRef.current.scrollLeft === 0
        ? setMoreRight(true)
        : setMoreRight(false);
    }
  };

  return (
    <section className='section'>
      <Header
        handleScrollerX={handleScrollerX}
        headerText='Hot Authors'
        moreRight={moreRight}
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

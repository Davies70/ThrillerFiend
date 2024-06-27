import React, { useRef } from 'react';
import Header from '../Header';
import ContentScroller from '../ContentScroller';
import books from '../../api/books';
import { useScroll } from '../../utils';

const HotBooks = () => {
  const contentScrollRef = useRef();
  const { moreRight, moreLeft, handleScrollerX } = useScroll();
  const shape = 'square';

  
  return (
    <section className='section'>
      <Header
        handleScrollerX={handleScrollerX}
        contentScrollRef={contentScrollRef}
        headerText='Thrills of the Week'
        moreRight={moreRight}
        moreLeft={moreLeft}
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

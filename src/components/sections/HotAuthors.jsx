import React, { useRef } from 'react';
import '../../styles/Section.css';
import Header from '../Header';
import ContentScroller from '../ContentScroller';
import authors from '../../api/authors';
import { useScroll } from '../../utils';

const HotAuthors = () => {
  const contentScrollRef = useRef();
  const { moreRight, moreLeft, handleScrollerX } = useScroll();

  const shape = 'circle';

  return (
    <section className='section'>
      <Header
        handleScrollerX={handleScrollerX}
        headerText='Hot Authors'
        moreRight={moreRight}
        moreLeft={moreLeft}
        contentScrollRef={contentScrollRef}
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

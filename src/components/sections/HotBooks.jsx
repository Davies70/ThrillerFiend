import React, { useRef, useState } from 'react';
import Header from '../Header';
import ContentScroller from '../ContentScroller';
import books from '../../api/books';

const HotBooks = () => {
  const contentScrollRef = useRef();
  const [moreRight, setMoreRight] = useState(false);

  const shape = 'square';

  const handleScrollerX = (direction) => {
    if (direction === 'right') {
      contentScrollRef.current.scrollLeft +=
        contentScrollRef.current.clientWidth;
    } else {
      contentScrollRef.current.scrollLeft -=
        contentScrollRef.current.clientWidth;
      contentScrollRef.current.scrollLeft === 0
        ? setMoreRight(true)
        : setMoreRight(false);
    }
  };
  console.log(moreRight);
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

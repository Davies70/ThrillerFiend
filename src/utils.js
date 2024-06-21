import { useState } from 'react';

const useScroll = () => {
  const [moreRight, setMoreRight] = useState(true);
  const [moreLeft, setMoreLeft] = useState(false);
  const handleScrollerX = (contentScrollRef, direction) => {
    if (direction === 'right') {
      contentScrollRef.current.scrollLeft +=
        contentScrollRef.current.clientWidth;
    } else {
      contentScrollRef.current.scrollLeft -=
        contentScrollRef.current.clientWidth;
    }
    contentScrollRef.current?.scrollLeft === 0 ||
    Math.round(
      contentScrollRef.current.scrollLeft + contentScrollRef.current.clientWidth
    ) < contentScrollRef.current.scrollWidth
      ? setMoreRight(true)
      : setMoreRight(false);
    Math.round(
      contentScrollRef.current.scrollLeft + contentScrollRef.current.clientWidth
    ) >= contentScrollRef.current.scrollWidth
      ? setMoreLeft(true)
      : setMoreLeft(false);
    // let scrollLength =
    //   contentScrollRef.current.clientWidth +
    //   contentScrollRef.current.scrollLeft;
    // let scrollWidth = contentScrollRef.current.scrollWidth;
    // console.log('scrolllength', scrollLength);
    // console.log('scrollWidth', scrollWidth);
  };

  return { moreRight, moreLeft, handleScrollerX };
};
export { useScroll };

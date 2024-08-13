import React, { useRef } from 'react';
import Header from '../Header';
import ContentScroller from '../ContentScroller';

import PropTypes from 'prop-types';

const BookScroller = ({
  shape,
  data,
  navLink,
  headerText,
  isNavLink,
  isAuthorName,
  isControls,
}) => {
  const contentScrollRef = useRef();

  return (
    <section className='section'>
      <Header
        contentScrollRef={contentScrollRef}
        headerText={headerText}
        navLink={navLink}
        isNavLink={isNavLink}
        isControls={isControls}
      />
      <ContentScroller
        contentScrollRef={contentScrollRef}
        shape={shape}
        data={data}
        isAuthorName={isAuthorName}
      />
    </section>
  );
};

BookScroller.propTypes = {
  shape: PropTypes.string,
  data: PropTypes.array,
  navLink: PropTypes.string,
  headerText: PropTypes.string,
  isNavLink: PropTypes.bool,
  isAuthorName: PropTypes.bool,
  isControls: PropTypes.bool,
};

export default BookScroller;

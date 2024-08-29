import React, { useRef } from 'react';
import Header from '../Header';
import GridContentScroller from '../GridContentScroller';
import PropType from 'prop-types';

const GridScroller = ({ data, headerText, isNavLink, isControls, navLink }) => {
  const contentScrollRef = useRef();

  return (
    <section className='section'>
      <Header
        headerText={headerText}
        contentScrollRef={contentScrollRef}
        isNavLink={isNavLink}
        isControls={isControls}
        navLink={navLink}
      />
      <GridContentScroller contentScrollRef={contentScrollRef} data={data} />
    </section>
  );
};

GridScroller.propTypes = {
  data: PropType.array.isRequired,
  headerText: PropType.string.isRequired,
  isNavLink: PropType.bool,
  isControls: PropType.bool,
  navLink: PropType.string,
};

export default GridScroller;

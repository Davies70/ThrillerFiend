import React, { useRef } from 'react';
import '../../styles/Section.css';
import Header from '../Header';
import ContentScroller from '../ContentScroller';
import { getHotAuthors } from '../../services/authorServices';

const HotAuthors = () => {
  const contentScrollRef = useRef();

  const navLink = '/authors';

  const shape = 'circle';

  return (
    <section className='section'>
      <Header
        headerText='Hot Authors'
        contentScrollRef={contentScrollRef}
        navLink={navLink}
      />
      <ContentScroller
        contentScrollRef={contentScrollRef}
        data={getHotAuthors()}
        shape={shape}
      />
    </section>
  );
};

export default HotAuthors;

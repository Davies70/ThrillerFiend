import React, { useRef, useEffect, useState } from 'react';
import '../../styles/Section.css';
import Header from '../Header';
import ContentScroller from '../ContentScroller';
import { getHotAuthors } from '../../services/authorServices';

const HotAuthors = () => {
  const contentScrollRef = useRef();

  const [hotAuthors, setHotAuthors] = useState([]);

  useEffect(() => {
    const authors = getHotAuthors();
    setHotAuthors(authors);
    console.log('hotauthors', authors);
  }, []);

  const navLink = '/authors';

  const shape = 'circle';

  return (
    <section className='section'>
      <Header
        headerText='Hot Authors'
        contentScrollRef={contentScrollRef}
        navLink={navLink}
        isNavLink={true}
      />
      <ContentScroller
        contentScrollRef={contentScrollRef}
        data={hotAuthors}
        shape={shape}
      />
    </section>
  );
};

export default HotAuthors;

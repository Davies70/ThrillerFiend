import React from 'react';
import '../../styles/HotAuthors.css';
import Header from '../Header';
import ContentScroller from '../ContentScroller';

const HotAuthors = () => {
  return (
    <section className='hot-authors'>
      <Header />
      <ContentScroller />
    </section>
  );
};

export default HotAuthors;

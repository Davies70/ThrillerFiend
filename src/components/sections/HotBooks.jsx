import React, { useRef, useEffect, useState } from 'react';
import Header from '../Header';
import ContentScroller from '../ContentScroller';
import bookServices from '../../services/bookServices';

const HotBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const hotBooks = await bookServices.getHotBooks();
      setBooks(hotBooks);
    };
    fetchData();
  }, []);

  const contentScrollRef = useRef();
  const shape = 'square';

  const navLink = '/books';
  return (
    <section className='section'>
      <Header
        contentScrollRef={contentScrollRef}
        headerText='Thrills of the Week'
        navLink={navLink}
        isNavLink={true}
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

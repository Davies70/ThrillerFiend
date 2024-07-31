import React, { useEffect, useState } from 'react';
import Banner from '../components/sections/Banner';
import BestSellers from '../components/sections/BestSellers';
import BookScroller from '../components/sections/BookScroller';
import bookServices from '../services/bookServices';
import { getHotAuthors } from '../services/authorServices';

const Home = () => {
  const [hotbooks, setHotBooks] = useState([]);
  const [hotAuthors, setHotAuthors] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const hotBooks = await bookServices.getHotBooks();
      setHotBooks(hotBooks);
      const authors = getHotAuthors();
      setHotAuthors(authors);
    };
    fetchData();
  }, []);

  return (
    <div>
      <BookScroller
        data={hotAuthors}
        shape='circle'
        headerText='Hot Authors'
        isNavLink={true}
        navLink='/authors'
      />
      <Banner />
      <BookScroller
        data={hotbooks}
        shape='square'
        headerText='Thrills of the Week'
        isNavLink={true}
      />
      <BestSellers />
    </div>
  );
};

export default Home;

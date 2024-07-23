import React from 'react';
import HotAuthors from '../components/sections/HotAuthors';
import Banner from '../components/sections/Banner';
import HotBooks from '../components/sections/HotBooks';
import BestSellers from '../components/sections/BestSellers';

const Home = () => {
  return (
    <div>
      <HotAuthors />
      <Banner />
      <HotBooks />
      <BestSellers />
    </div>
  );
};

export default Home;

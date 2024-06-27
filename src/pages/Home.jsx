import React from 'react';
import HotAuthors from '../components/sections/HotAuthors';
import Banner from '../components/sections/Banner';
import HotBooks from '../components/sections/HotBooks';
import EasterEggs from '../components/sections/EasterEggs';

const Home = () => {
  return (
    <div>
      <HotAuthors />
      <Banner />
      <HotBooks />
      <EasterEggs />
    </div>
  );
};

export default Home;

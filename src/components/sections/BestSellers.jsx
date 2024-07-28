import React, { useRef } from 'react';
import Header from '../Header';
import GridContentScroller from '../GridContentScroller';
import easterEggServices from '../../services/bestSellerServices';

const BestSellers = () => {
  const contentScrollRef = useRef();

  return (
    <section className='section'>
      <Header
        headerText='Best Sellers'
        contentScrollRef={contentScrollRef}
        isNavLink={true}
      />
      <GridContentScroller
        contentScrollRef={contentScrollRef}
        data={easterEggServices.getEasterEggs()}
      />
    </section>
  );
};

export default BestSellers;

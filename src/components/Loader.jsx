import React from 'react';
import '../styles/Loader.css';

const Loader = () => {
  return (
    <div className='card'>
      <div className='card-content'>
        <div className='imageWrapper square'>
          <div className='loader'></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;

import React from 'react';
import { getAuthorById } from '../services/authorServices.js';
import { useParams } from 'react-router-dom';
import DetailHeader from '../components/sections/DetailHeader';
import Notification from '../components/Notification';
import '../styles/Author.css';

const Author = () => {
  const { id } = useParams();
  const author = getAuthorById(parseInt(id));
  return (
    <div className='authorContainer'>
      <div className='authorContainerChild'>
        <div
          className='authorContainerBg'
          style={{
            backgroundImage: `url(${author.coverPhoto})`,
            height: '100%',
          }}
        ></div>
        <div className='altHeaderBg'></div>
      </div>
      <DetailHeader authorName={author.authorName} />

      <div className='authorBio'>
        <p>authorbio</p>
        <h2>author genre</h2>
      </div>

      <div>
        <h2>New Releases</h2>
      </div>

      <div>
        <h2>Best Seller</h2>
      </div>

      <div>
        <h2>Upcoming Books</h2>
      </div>

      <div>
        <h2>Reviews</h2>
      </div>

      <div>
        <h2>Interviews</h2>
      </div>

      <div>
        <h2>Popular Similar Authors</h2>
      </div>

      <Notification isAlert={false} />
    </div>
  );
};

export default Author;

import React from 'react';
import { getAuthorById } from '../services/authors';
import { useParams } from 'react-router-dom';
import DetailHeader from '../components/sections/DetailHeader';
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
            height: '694px',
           
            
          }}
        ></div>
        <div className='altHeaderBg'></div>
      </div>
      <DetailHeader authorName={author.authorName} />
    </div>
  );
};

export default Author;

import React from 'react';
import { getAuthors } from '../services/authorServices';
import Shape from '../components/Shape';
import '../styles/Authors.css';

const Authors = () => {
  const authors = getAuthors();
  const shape = 'circle';
  return (
    <div>
      <header
        style={{
          paddingTop: '24px',
        }}
      >
        <div className='header-text'>
          <h2>Hot Authors</h2>
        </div>
      </header>
      <div
        className='authors'
        style={{
          direction: 'ltr',
          willChange: 'transform',
          overflow: 'auto',
          position: 'relative',
        }}
      >
        {authors.map((author, i) => (
          <Shape
            name={author.authorName}
            photo={author.coverPhoto}
            shape={shape}
            shapeId={author.id}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Authors;

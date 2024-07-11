import React from 'react';
import { useParams } from 'react-router-dom';
import bookServices from '../services/bookServices.js';

const Book = () => {
  const { id } = useParams();
  const bookData = bookServices.getBookById(id).volumeInfo;
  return (
    <div
      className='book'
      style={{ display: 'flex', alignItems: 'center', gap: '20px' }}
    >
      <img
        src={bookData.imageLinks.thumbnail}
        alt={bookData.title}
        className='book__cover'
        style={{ width: '150px', height: '200px' }}
      />
      <div className='book__details'>
        <h2
          className='book__title'
          style={{ fontSize: '24px', fontWeight: 'bold' }}
        >
          {bookData.title}
        </h2>
        <p className='book__author' style={{ fontSize: '16px', color: '#888' }}>
          By {bookData.authors.join(', ')}
        </p>
        <p className='book__description' style={{ fontSize: '16px' }}>
          {bookData.description}
        </p>
        <p
          className='book__price'
          style={{ fontSize: '20px', fontWeight: 'bold' }}
        >
          {bookData.pageCount} pages
        </p>
        <p className='language'>
          <span style={{ fontSize: '16px', color: '#888' }}>Language:</span>{' '}
          {bookData.language}
        </p>
        <div
          className='book__rating'
          style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
        >
          <span
            className='book__rating-stars'
            style={{ fontSize: '18px', color: '#f8ce0b' }}
          >
            {bookData.averageRating}
          </span>
          {/* <span
            className='book__rating-reviews'
            style={{ fontSize: '14px', color: '#888' }}
          >
            {bookData.reviews} reviews
          </span> */}
        </div>
        <button
          className='book__button'
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Book;

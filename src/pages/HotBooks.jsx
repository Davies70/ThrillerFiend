import React from 'react';
import Shape from '../components/Shape';
import '../styles/Authors.css';
import { useQuery } from '@tanstack/react-query';
import Loader from '../components/Loader';
import bookServices from '../services/bookServices';

const HotBooks = () => {
  const shape = 'square';

  const {
    data: hotbooks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['hotbooks'],
    queryFn: bookServices.getHotBooks,
  });

  if (isLoading) return <Loader />;

  if (isError) return <div>Something went wrong</div>;

  return (
    <div className='hotbooks'>
      <header>
        <div className='hotbooks-header-text'>
          <h2>Thrills of the Week</h2>
        </div>
      </header>
      <div className='hotbooks-content'>
        {hotbooks.map((book, i) => (
          <Shape
            key={i}
            shape={shape}
            isAuthorName={false}
            book={book}
            isDataAvailable={true}
          />
        ))}
      </div>
    </div>
  );
};

export default HotBooks;

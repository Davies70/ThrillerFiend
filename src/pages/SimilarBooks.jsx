import '../styles/HotBooks.css';
import { useQuery } from '@tanstack/react-query';
import bookServices from '../services/bookServices';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Shape from '../components/Shape';

const SimilarBooks = () => {
  const { id: bookTheme } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['similarBooks', bookTheme],
    queryFn: () => bookServices.getBooksByQuery(bookTheme),
    enabled: !!bookTheme,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error getting similar books from {bookTheme}</div>;
  }

  return (
    <div className='hotbooks'>
      <header>
        <div className='hotbooks-header-text'>
          <h2>More {bookTheme}s</h2>
        </div>
      </header>
      <div className='hotbooks-content'>
        {data.map((book, i) => (
          <Shape
            key={i}
            shape='square'
            isAuthorName
            book={book}
            isDataAvailable={true}
          />
        ))}
      </div>
    </div>
  );
};

export default SimilarBooks;

import authorServices from '../services/authorServices';
import Shape from '../components/Shape';
import '../styles/HotBooks.css';
import { useQuery } from '@tanstack/react-query';
import Loader from '../components/Loader';

const Authors = () => {
  const {
    data: authors,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['authors'],
    queryFn: authorServices.getAuthors,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  const shape = 'circle';
  return (
    <div className='authors'>
      <header>
        <div className='header-text'>
          <h2>Hot Authors</h2>
        </div>
      </header>
      {authors.map((author, i) => (
        <Shape author={author} shape={shape} id={author.id} key={i} />
      ))}
    </div>
  );
};

export default Authors;

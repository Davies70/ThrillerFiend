
import authorServices from '../services/authorServices';
import Shape from '../components/Shape';
import '../styles/Authors.css';

const Authors = () => {
  const authors = authorServices.getAuthors();
  const shape = 'circle';
  return (
    <div
      className='authors'
      style={{
        direction: 'ltr',
        willChange: 'transform',
        overflow: 'auto',
        position: 'relative',
      }}
    >
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

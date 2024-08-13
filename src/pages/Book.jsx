import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import bookServices from '../services/bookServices';
import NoteCard from '../components/NoteCard';
import '../styles/Book.css';
import AddIcon from '@mui/icons-material/Add';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import CheckIcon from '@mui/icons-material/Check';

const Book = () => {
  const { id } = useParams();

  const [book, setBook] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBook = async () => {
      const book = await bookServices.getBookByVolumeId(id);
      setBook(book);
    };
    fetchBook();
  }, [id]);

  console.log(book);

  const [showModal, setShowModal] = useState(true);

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <div className='book-page'>
      <div className='book-grid'>
        <div className='book-left'>
          <div className='book-image-container'>
            <img
              src={book.volumeInfo?.imageLinks?.thumbnail}
              alt={book.volumeInfo?.title}
            />
          </div>
          <div className='book-btn-actions'>
            {showModal && (
              <div className='modal'>
                <button className='modal-btn'>
                  <span>
                    <CheckIcon />
                  </span>
                  Have Read
                </button>
                <button className='modal-btn'>Want to Read</button>
                <button className='modal-btn'>Add to Favorites</button>

                <select id='select-id'>
                  <option value='1'>Option 1</option>
                  <option value='2'>Option 2</option>
                </select>
              </div>
            )}

            <button className='book-btn-1 book-btn'>
              <AddIcon />
            </button>

            <button className='book-btn-2 book-btn'>
              {' '}
              <StarBorderOutlinedIcon />
              <span>Rate this book</span>
            </button>
            <button className='book-btn-1 book-btn' onClick={openModal}>
              Buy now
            </button>
          </div>
          <label htmlFor='select-id'>Choose an option:</label>
        </div>
        <div className='book-right'>
          <div className='book-info'>
            <h1>{book.volumeInfo?.title}</h1>
            {book.volumeInfo?.subtitle && (
              <p className='muted-foreground'>{book.volumeInfo?.subtitle}</p>
            )}

            <p className='book-author-name'>
              {book.volumeInfo?.authors.join(', ')}
            </p>
            <p
              className='book-description'
              dangerouslySetInnerHTML={{ __html: book.volumeInfo?.description }}
            ></p>

            <div className='book-rating'>
              <span className='rating'>
                {' '}
                {book.volumeInfo?.averageRating && (
                  <p>Rating: {book.volumeInfo.averageRating}</p>
                )}
              </span>
            </div>

            <div className='book-edition-details'>
              <h2>About this edition</h2>
              <ul className='text-base'>
                <li>
                  <strong> Publisher: </strong>
                  {book.volumeInfo?.publisher}{' '}
                </li>
                <li>
                  <strong>Published: </strong> {book.volumeInfo?.publishedDate}
                </li>
                <li>
                  <strong>ISBN:</strong>{' '}
                  {book.volumeInfo?.industryIdentifiers
                    .map((isbn) => isbn.identifier)
                    .join(', ')}
                </li>
                <li>
                  <strong>Language:</strong> {book.volumeInfo?.language}
                </li>
                <li>
                  <strong>Pages:</strong> {book.volumeInfo?.pageCount}
                </li>
                {book.saleInfo === 'FOR_SALE' ? (
                  <li>
                    <strong>Price:</strong> {book.saleInfo?.listPrice?.amount}{' '}
                    {book.saleInfo?.listPrice?.currencyCode}
                  </li>
                ) : null}
              </ul>
            </div>
            <span className='book-genre-tags'>
              {book.volumeInfo?.categories.map((category, key) => (
                <span className='book-genre-tag' key={key}>
                  {category}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
      {/* <div className='reviews'>
        <h2>Reviews</h2>
        <blockquote>
          &quot;Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Quas&quot; ratione delectus enim praesentium quibusdam expedita.
          Praesentium officia mollitia est ipsum hic sequi recusandae soluta,
          molestiae dignissimos dolorem accusamus asperiores quas.&quot;
          <cite>- The New York Times</cite>
        </blockquote>
      </div> */}

      <div className='notes'>
        <h2>Your Notes</h2>
        <div>
          <div className='note-actions'>
            <textarea
              type='text'
              placeholder='Add a note...'
              rows={4}
              cols={50}
            />
            <button className='book-btn book-btn-1'>Add</button>
          </div>
          <div>
            <NoteCard />
            <NoteCard />
            <NoteCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;

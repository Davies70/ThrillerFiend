import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import bookServices from '../services/bookServices';
import NoteCard from '../components/NoteCard';
import '../styles/Book.css';
import AddIcon from '@mui/icons-material/Add';
import StarRateIcon from '@mui/icons-material/StarRate';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import OutsideClickHandler from '../components/OutsideClickHandler';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import { Rating } from '@mui/material';

const Book = () => {
  // const { id } = useParams();

  const [book, setBook] = useState({});
  // const [rating, setRating] = useState(0);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const data = location.state.data || {};
    
    if (data.isDataAvailable) {
      setBook(data);
    } else {
      const fetchBook = async () => {
        const fetchedBook = await bookServices.getBookByAuthorAndTitle(
          data.authors,
          data.title
        );
        setBook(fetchedBook);
      };
      fetchBook();
    }
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const {
    title,
    rating,
    subtitle,
    book_image,
    description,
    publishedDate,
    publisher,
    isbn,
    pageCount,
    language,
    saleInfo,
    price,
    currencyCode,
  } = book;

  console.log('book', book);

  return (
    <div className='book-page'>
      <div className='book-grid'>
        <div className='book-left'>
          <div className='book-bio'>
            <div className='book-info'>
              <h1>{title}</h1>
              {subtitle && <p className='muted-foreground'>{subtitle}</p>}

              <p className='book-author-name'>
                {book.volumeInfo?.authors.join(', ')}
              </p>
            </div>
            <div className='book-btn-actions'>
              <div className='btn-actions-up'>
                <button className='book-btn-1 book-btn' onClick={openModal}>
                  <AddIcon />
                </button>

                <button className='book-btn-2 book-btn'>
                  <span className='btn-svg'>
                    {' '}
                    <StarRateIcon />
                  </span>

                  <span>Rate</span>
                </button>
              </div>

              <div className='btn-actions-up'>
                <button className='book-btn-1 book-btn'>Buy now</button>
                <button className='book-btn-3 book-btn'>
                  <span className='btn-svg'>
                    <ShareIcon />
                  </span>
                  <span> Share</span>
                </button>
              </div>
            </div>
          </div>

          {isOpen && (
            <OutsideClickHandler onOutsideClick={closeModal} className='modal'>
              <button className='modal-btn'>
                <span>Have Read</span>
                <span className='modal-btn-icon'>
                  <CheckBoxIcon />
                </span>
              </button>
              <button className='modal-btn'>
                <span>Read Later</span>
                <span className='modal-btn-icon'>
                  <TurnedInIcon />
                </span>
              </button>
              <button className='modal-btn'>
                <span> Add to Favorites</span>
                <span className='modal-btn-icon'>
                  <FavoriteIcon />
                </span>
              </button>
              <button className='modal-btn'>
                <span>Remove from Library</span>
                <span className='modal-btn-icon'>
                  <DeleteIcon />
                </span>
              </button>
            </OutsideClickHandler>
          )}
        </div>
        <div className='book-right'>
          <div className='book-image-container'>
            {book_image ? (
              <img src={book_image} loading='lazy' alt={title} style={{}} />
            ) : (
              <img
                src={`https://lgimages.s3.amazonaws.com/nc-md.gif`}
                loading='lazy'
                alt={title}
                style={{}}
              />
            )}
          </div>
        </div>
      </div>

      <p
        className='book-description'
        dangerouslySetInnerHTML={{ __html: description }}
      ></p>

      <div className='book-rating'>
        <span className='rating'>
          {' '}
          {rating && (
            <div className={'rating'}>
              <span>Average rating:</span>
              <Rating name='read-only' value={rating} readOnly />
            </div>
          )}
        </span>
      </div>

      <div className='book-edition-details'>
        <h2>About this edition</h2>
        <ul className='text-base'>
          <li>
            <strong> Publisher: </strong>
            {publisher}{' '}
          </li>
          <li>
            <strong>Published: </strong> {publishedDate}
          </li>
          <li>
            <strong>ISBN: {isbn}</strong>
          </li>
          <li>
            <strong>Language:</strong> {language}
          </li>
          <li>
            <strong>Pages:</strong> {pageCount}
          </li>
          {saleInfo === 'FOR_SALE' ? (
            <li>
              <strong>Price:</strong> {price} {currencyCode}
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
          <div className='notecard-container'>
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

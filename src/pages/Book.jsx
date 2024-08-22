import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
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
import { getLanguage } from '../utils';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Book = () => {
  const { id } = useParams();

  const [book, setBook] = useState({});
  // const [rating, setRating] = useState(0);
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const data = location.state?.data || null;

    if (data) {
      setBook(data);
    } else {
      const fetchBook = async () => {
        const fetchedBook = await bookServices.getBookByAuthorAndTitle(id);
        console.log('fetchedBook', fetchedBook);
        setBook(fetchedBook);
      };
      fetchBook();
    }
  }, [id, location.state]);

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleTextExpand = () => {
    setIsTextExpanded(!isTextExpanded);
  };

  const expandedTextClass = isTextExpanded ? 'expanded' : 'collapsed';

  console.log('book', book);

  if (Object.keys(book).length === 0) {
    return <div>Loading...</div>;
  }

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
    categories,
  } = book;

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
                <Button
                  variant='contained'
                  onClick={openModal}
                  startIcon={<AddIcon />}
                  color='blue'
                  size='small'
                >
                  Add to Collection
                </Button>

                <Button
                  variant='outlined'
                  startIcon={<StarRateIcon />}
                  color='blue'
                  size='small'
                >
                  Rate
                </Button>
              </div>

              <Button
                variant='contained'
                endIcon={<ShoppingCartIcon />}
                color='blue'
                size='small'
              >
                Buy now
              </Button>

              <Button
                variant='outlined'
                startIcon={<ShareIcon />}
                color='blue'
                size='small'
              >
                Share
              </Button>
            </div>
          </div>

          {isOpen && (
            <OutsideClickHandler onOutsideClick={closeModal} className='modal'>
              <Button
                variant='contained'
                endIcon={<CheckBoxIcon />}
                color='white'
                size='small'
                disableElevation
              >
                Have Read
              </Button>
              {/* <button className='modal-btn'>
                <span>Read Later</span>
                <span className='modal-btn-icon'>
                  <TurnedInIcon />
                </span>
              </button> */}
              <Button
                variant='contained'
                endIcon={<TurnedInIcon />}
                color='white'
                size='small'
                disableElevation
              >
                Read Later
              </Button>
              {/* <button className='modal-btn'>
                <span> Add to Favorites</span>
                <span className='modal-btn-icon'>
                  <FavoriteIcon />
                </span>
              </button> */}
              <Button
                variant='contained'
                endIcon={<FavoriteIcon />}
                color='white'
                size='small'
                disableElevation
              >
                Add to Favorites
              </Button>
              {/* <button className='modal-btn'>
                <span>Remove from Library</span>
                <span className='modal-btn-icon'>
                  <DeleteIcon />
                </span>
              </button> */}
              <Button
                variant='contained'
                endIcon={<DeleteIcon />}
                color='white'
                size='small'
                disableElevation
                title='Remove from Library'
              >
                Remove from Library
              </Button>
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
      <div className={`book-description ${expandedTextClass}`}>
        <p dangerouslySetInnerHTML={{ __html: description }}></p>
      </div>
      <div className='show-hide-btn-container'>
        <Button
          variant='contained'
          startIcon={
            isTextExpanded ? (
              <ExpandLessOutlinedIcon />
            ) : (
              <ExpandMoreOutlinedIcon />
            )
          }
          color={isTextExpanded ? 'blue' : 'white'}
          size='small'
          onClick={handleTextExpand}
        >
          {isTextExpanded ? 'Show less' : 'Show more'}
        </Button>
      </div>

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
            <strong> Publisher: </strong> <span>{publisher} </span>
          </li>
          <li>
            <strong>Published: </strong> <span>{publishedDate}</span>
          </li>
          <li>
            <strong>ISBN: </strong>
            {isbn}
          </li>
          <li>
            <strong>Language:</strong> <span>{getLanguage(language)}</span>
          </li>
          <li>
            <strong>Pages:</strong> <span>{pageCount}</span>
          </li>
          {saleInfo === 'FOR_SALE' ? (
            <li>
              <strong>Price: </strong>
              <span>
                {price} {currencyCode}
              </span>
            </li>
          ) : null}
        </ul>
      </div>
      <span className='book-genre-tags'>
        {categories.map((category, key) => (
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

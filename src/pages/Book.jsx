import React, { useState, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import bookServices from '../services/bookServices';
import NoteCard from '../components/NoteCard';
import '../styles/Book.css';
import AddIcon from '@mui/icons-material/Add';
import StarRateIcon from '@mui/icons-material/StarRate';
import ShareIcon from '@mui/icons-material/Share';
import { Rating } from '@mui/material';
import { getLanguage } from '../utils';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useCheckIfOverflowing from '../hooks/useCheckIfOverflowing';
import { useQuery } from '@tanstack/react-query';
import Loader from '../components/Loader';
import LibraryModal from '../components/modal/LibraryModal';

const Book = () => {
  const { id } = useParams();

  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const location = useLocation();

  const descriptionRef = useRef(null);

  const {
    data: book,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['book', id],
    queryFn: () =>
      location.state?.data || bookServices.getBookByAuthorAndTitle(id),
  });

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
    authors,
  } = book || {};

  const showButton = useCheckIfOverflowing(
    descriptionRef,
    isTextExpanded,
    description
  );

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleTextExpand = () => {
    setIsTextExpanded(!isTextExpanded);
  };

  const expandedTextClass = isTextExpanded ? 'expanded' : 'collapsed';

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error fetching book data</div>;
  }

  return (
    <div className='book-page'>
      <div className='book-grid'>
        <div className='book-left'>
          <div className='book-bio'>
            <div className='book-info'>
              <h1>{title}</h1>
              {subtitle && <p className='muted-foreground'>{subtitle}</p>}

              <p className='book-author-name'> {authors}</p>
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

          {isOpen && <LibraryModal closeModal={closeModal} />}
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
        <p
          dangerouslySetInnerHTML={{ __html: description }}
          ref={descriptionRef}
        ></p>
      </div>
      <div className='show-hide-btn-container'>
        {showButton && (
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
        )}
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
            {/* <button className='book-btn book-btn-1'>Add</button> */}
            <Button variant='contained' color='blue' size='small'>
              Add
            </Button>
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

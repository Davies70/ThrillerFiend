import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import bookServices from '../services/bookServices';
import NoteCard from '../components/NoteCard';
import '../styles/Book.css';
import AddIcon from '@mui/icons-material/Add';
import ShareIcon from '@mui/icons-material/Share';
import { Rating } from '@mui/material';
import { getLanguage } from '../utils/utils';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useCheckIfOverflowing from '../hooks/useCheckIfOverflowing';
import { useQuery, useMutation } from '@tanstack/react-query';
import Loader from '../components/Loader';
import LibraryModal from '../components/modal/LibraryModal';
import ShareModal from '../components/modal/ShareModal';
import { Link } from 'react-router-dom';
import Notification from '../components/Notification';
import {
  writeNote,
  writeRating,
  deleteNote,
  updateNote,
  getRating,
  getBookStatus,
} from '../services/userServices';
import { useAuth } from '../context/AuthProvider';
import LoadingButton from '@mui/lab/LoadingButton';
import useBookNotes from '../hooks/useBookNotes';
import { useNavigate } from 'react-router-dom';

const Book = () => {
  const { id } = useParams();

  const { user } = useAuth();

  const navigation = useNavigate();
  const redirectToLogIn = () => {
    if (!user) {
      navigation('/signin');
    }
  };

  const [isTextExpanded, setIsTextExpanded] = useState(false);

  const descriptionRef = useRef(null);

  const [noteText, setNoteText] = useState('');

  const [saveLoading, setSaveLoading] = useState(false);

  const [previousRating, setPreviousRating] = useState(0); // Track previous rating
  const [currentRating, setCurrentRating] = useState(0); // Track current rating

  const [ratingPrompt, setRatingPrompt] = useState('Rate this book');
  const [isNotePrompt, setIsNotePrompt] = useState(false);

  const [bookState, setBookState] = useState({
    haveRead: false,
    readLater: false,
    favorite: false,
  });

  const mutation = useMutation({
    mutationFn: () => writeNote(user.uid, id, noteText),
    onSuccess: () => {
      setNoteText('');
    },
    enabled: !!user?.uid,
  });

  const deleteNoteMutation = useMutation({
    mutationFn: (noteId) => deleteNote(user.uid, id, noteId),
    enabled: !!user?.uid,
  });

  const ratingMutation = useMutation({
    mutationFn: () => writeRating(user.uid, id, currentRating),
    enabled: !!user?.uid,
  });

  const {
    data: book,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['book', id],
    queryFn: () => bookServices.getBookByVolumeId(id),
  });

  const handleAddNote = (event) => {
    event.preventDefault();
    mutation.mutate();
    setSaveLoading(true);
    setTimeout(() => {
      setSaveLoading(false);
    }, 1000);
    setNotification({
      title: 'Success',
      message: 'Note saved',
    });
    clearNotification();
  };

  const handleDeleteNote = (event, noteId) => {
    event.preventDefault();
    deleteNoteMutation.mutate(noteId);
    setNotification({
      title: 'Success',
      message: 'Note deleted',
    });
    clearNotification();
  };

  const handleUpdateNote = async (updatedNoteText, noteId) => {
    await updateNote(user.uid, id, noteId, updatedNoteText);
    setNotification({
      title: 'Success',
      message: 'Note updated',
    });
    clearNotification();
  };

  useEffect(() => {
    const fetchRating = async () => {
      if (!user) {
        setRatingPrompt('Sign in to rate this book');
        return;
      }
      const rating = await getRating(user?.uid, id);
      setCurrentRating(rating || 0);
    };

    fetchRating();
  }, [user, id]);

  useEffect(() => {
    const fetchBookStatus = async () => {
      if (!user) return;
      const status = await getBookStatus(user?.uid, id);
      setBookState(status);
    };
    fetchBookStatus();
  }, [user, id]);

  const { notes, loading, error } = useBookNotes(user?.uid, id);

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

  const [isLibraryModalOpen, setIsLibraryModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const [notification, setNotification] = useState({
    title: '',
    message: '',
  });

  const openLibraryModal = () => setIsLibraryModalOpen(true);
  const closeLibraryModal = () => setIsLibraryModalOpen(false);

  const openShareModal = () => setIsShareModalOpen(true);
  const closeShareModal = () => setIsShareModalOpen(false);

  const handleTextExpand = () => {
    setIsTextExpanded(!isTextExpanded);
  };

  let expandedTextClass = '';

  if (showButton) {
    expandedTextClass = isTextExpanded ? 'expanded' : 'collapsed';
  }

  if (isLoading || loading) {
    return <Loader />;
  }

  if (isError || error) {
    return <div>Error fetching book data</div>;
  }

  const handleRating = async (event, newValue) => {
    event.preventDefault();
    ratingMutation.mutate();
    setCurrentRating(newValue);
    setPreviousRating(currentRating);
    const ratingValue = newValue;
    const starOrStars = ratingValue === 1 ? 'star' : 'stars';
    if (newValue === null) {
      setNotification({
        title: 'Success',
        message: 'Rating removed',
      });
      clearNotification();
    } else {
      if (previousRating) {
        setNotification({
          title: 'Success',
          message: `Rating updated to ${newValue} ${starOrStars}`,
        });
        clearNotification();
      } else {
        setNotification({
          title: 'Success',
          message: `${newValue} ${starOrStars} rating saved.`,
        });
        clearNotification();
      }
      setRatingPrompt('Saved');
      setIsNotePrompt(true);
    }
  };

  const clearNotification = () => {
    setTimeout(() => {
      setNotification({ title: '', message: '', type: '' });
    }, 1500);
  };

  const closeNotification = (event) => {
    event.preventDefault();
    setNotification({ title: '', message: '', type: '' });
  };

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
                  onClick={openLibraryModal}
                  startIcon={<AddIcon />}
                  color='blue'
                  size='large'
                >
                  Add to Collection
                </Button>

                {saleInfo.buyLink && (
                  <Link
                    to={saleInfo.buyLink}
                    target='_blank'
                    className='buy-link'
                    style={{ textDecoration: 'none' }} // Remove any default link styles like underline
                  >
                    <Button
                      variant='contained'
                      endIcon={<ShoppingCartIcon />}
                      color='blue'
                      size='large'
                      fullWidth
                    >
                      Buy Now
                    </Button>
                  </Link>
                )}

                <Button
                  variant='outlined'
                  startIcon={<ShareIcon />}
                  color='blue'
                  size='large'
                  onClick={openShareModal}
                >
                  Share
                </Button>
              </div>
            </div>
          </div>
          <Notification
            closeNotification={closeNotification}
            notification={notification}
          />

          {isLibraryModalOpen && (
            <LibraryModal
              closeModal={closeLibraryModal}
              bookId={id}
              userId={user?.uid}
              bookState={bookState}
              setBookState={setBookState}
              redirectToLogIn={redirectToLogIn}
            />
          )}

          {isShareModalOpen && (
            <ShareModal
              closeModal={closeShareModal}
              setNotification={setNotification}
              clearNotification={clearNotification}
            />
          )}
        </div>
        <div className='book-right'>
          <div className='book-image-container'>
            {book_image ? (
              <img src={book_image} loading='lazy' alt={title} />
            ) : (
              <img
                src={`https://lgimages.s3.amazonaws.com/nc-md.gif`}
                loading='lazy'
                alt={title}
                style={{}}
              />
            )}
          </div>
          <div className='btn-actions-down'>
            <Rating
              size='large'
              precision={0.5}
              onChange={handleRating}
              value={currentRating}
              color='white'
              sx={{
                fontSize: '3rem',
              }}
              disabled={!user}
            />
          </div>
          <div className='rating-tag'>
            <span> {ratingPrompt}</span>
            {currentRating > 0 && (
              <span className='writeNote'>
                {isNotePrompt && <a href='#write-note'>Write a note</a>}
              </span>
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
        {rating && (
          <div className={'rating'}>
            <span>Average readers&rsquo; rating:</span>
            <Rating name='read-only' value={rating} readOnly />
          </div>
        )}
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
          {saleInfo.saleability === 'FOR_SALE' ? (
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
        {categories &&
          categories.map((category, key) => (
            <span className='book-genre-tag' key={key}>
              {category}
            </span>
          ))}
      </span>

      <div className='notes'>
        <section>
          <div className='note-actions'>
            <textarea
              type='text'
              placeholder={user ? 'Write a note' : 'Sign in to write a note'}
              rows={10}
              cols={30}
              id='write-note'
              value={noteText}
              onChange={({ target }) => setNoteText(target.value)}
              disabled={!user}
              aria-label='Write a note'
            />

            <span className='save-button'>
              <LoadingButton
                variant='contained'
                loading={saveLoading}
                color='blue'
                onClick={handleAddNote}
                size='small'
                disabled={!user}
              >
                Save
              </LoadingButton>
            </span>
          </div>
          <div className='notecard-header'>
            <h2>Your Notes</h2>
          </div>
          <div className='notecard-container'>
            {notes && notes.length > 0 ? (
              notes.map(({ noteText, created }, index) => (
                <NoteCard
                  noteText={noteText}
                  key={index}
                  created={created}
                  deleteNote={(event) => handleDeleteNote(event, index)}
                  updateNote={handleUpdateNote}
                  noteId={index}
                />
              ))
            ) : (
              <p className='no-notes'>No notes added yet</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Book;

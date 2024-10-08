import { useState, useEffect } from 'react';
import authorServices from '../services/authorServices.js';
import bookServices from '../services/bookServices.js';
import { useParams } from 'react-router-dom';
import BookScroller from '../components/sections/BookScroller.jsx';
import Notification from '../components/Notification';
import '../styles/Author.css';
import OutsideClickHandler from '../components/OutsideClickHandler.jsx';
import { useQueries, useQuery } from '@tanstack/react-query';
import Loader from '../components/Loader.jsx';
import { useAuth } from '../context/AuthProvider.jsx';
import { useNavigate } from 'react-router-dom';

export default function Author() {
  const { id } = useParams();
  const { user } = useAuth();

  const navigate = useNavigate();

  const [isFollowing, setIsFollowing] = useState(false);
  const [notification, setNotification] = useState({
    title: '',
    message: '',
    type: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    const checkFollowing = async () => {
      const isFollowing = await authorServices.checkFollowing(id, user.uid);
      setIsFollowing(isFollowing);
    };
    checkFollowing();
  }, [user, id]);

  const {
    data: author,
    isLoading: authorIsLoading,
    isError: authorIsError,
  } = useQuery({
    queryKey: ['author', id],
    queryFn: () => authorServices.getAuthorById(id),
    enabled: !!id,
  });

  const {
    data: booksByAuthor,
    isLoading: booksByAuthorIsLoading,
    isError: booksByAuthorIsError,
  } = useQuery({
    queryKey: ['booksByAuthor', id],
    queryFn: () => bookServices.getBooksByAuthor(author, 'relevance'),
    enabled: !!author,
  });

  const notableWorks = author?.notableWorks ? author.notableWorks : [];

  const notableWorksQueries = useQueries({
    queries:
      notableWorks.length > 0
        ? notableWorks.map((notableWork) => ({
            queryKey: ['notableThrills', notableWork],
            queryFn: () =>
              bookServices.getBookByAuthorAndTitle(
                `intitle:${notableWork}+inauthor:${author.authorName}`
              ),
            enabled: !!author,
          }))
        : [],
  });

  if (
    authorIsLoading ||
    booksByAuthorIsLoading ||
    notableWorksQueries.some((query) => query.isLoading)
  ) {
    return <Loader />;
  }

  if (authorIsError) {
    return <div>Something went wrong wih author</div>;
  }

  if (booksByAuthorIsError) {
    return <div>Something went wrong with books by author</div>;
  }

  if (notableWorksQueries.some((query) => query.isError)) {
    return <div>Something went wrong with notable works</div>;
  }

  const notableThrills = notableWorksQueries.map((query) => query.data);

  const {
    authorName,
    coverPhoto,
    nationality,
    genres,
    description,
    similarAuthors,
  } = author;

  const followClass = isFollowing ? 'unfollow-button' : 'follow-button';

  const follow = () => {
    !user && navigate('/signin');
    if (!user) return;
    try {
      authorServices.followAuthor(id, user?.uid);
      setNotification({
        title: 'Success',
        message: `You are now following ${authorName}`,
        type: 'success',
      });
      setIsFollowing(true);
      clearNotification();
    } catch (error) {
      setNotification({
        title: 'Error',
        message: 'There was an error following the author',
        type: 'error',
      });
      console.error(error.message);
      clearNotification();
    }
  };

  const unfollowAfterModal = () => {
    !user && navigate('/signin');
    if (!user) return;
    try {
      authorServices.unfollowAuthor(id, user?.uid);
      setNotification({
        title: 'Success',
        message: `You have unfollowed ${authorName}`,
        type: 'success',
      });
      setIsFollowing(false);
      setIsModalOpen(false);
      clearNotification();
    } catch (error) {
      setNotification({
        title: 'Error',
        message: 'There was an error unfollowing the author',
        type: 'error',
      });
      console.error(error.message);
      clearNotification();
    }
  };

  const unfollow = () => {
    setIsModalOpen(true);
  };

  const chooseFollow = isFollowing ? unfollow : follow;

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
    <div className='author-page'>
      <Notification
        notification={notification}
        closeNotification={closeNotification}
      />
      {isModalOpen && (
        <OutsideClickHandler
          onOutsideClick={() => setIsModalOpen(false)}
          className='unfollow-modal'
        >
          <div className='unfollow-modal-content'>
            <p>
              Are you sure you want to unfollow {authorName}? Their books will
              no longer appear in Collections
            </p>
            <div className='unfollow-actions'>
              <button
                onClick={() => setIsModalOpen(false)}
                className='unfollow-no'
              >
                Cancel
              </button>
              <button className='unfollow-yes' onClick={unfollowAfterModal}>
                Unfollow
              </button>
            </div>
          </div>
        </OutsideClickHandler>
      )}
      <div>
        <div className='author-grid'>
          <div className='author-info'>
            <div className='author-header'>
              <img className='author-image' src={coverPhoto} alt='Author' />
              <div className='author-right'>
                <h1 className='author-name'>{authorName}</h1>
                <p className='author-title'> {nationality} author</p>
                <div className='author-actions'>
                  <button
                    onClick={chooseFollow}
                    className={followClass}
                  ></button>

                  <div className='genre-tags'>
                    {genres.length > 0 &&
                      genres.map((genre, index) => (
                        <span key={index} className='genre-tag'>
                          {genre}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='author-bio'>
            <p>{description}</p>
          </div>
        </div>

        <BookScroller
          shape='square'
          headerText='Notable thrills'
          data={notableThrills}
          isControls={false}
          isDataAvailable={true}
        />

        <BookScroller
          shape='square'
          data={booksByAuthor}
          headerText='Other thrills by this author'
          isNavLink={false}
          isAuthorName={false}
          isControls={booksByAuthor.length > 7}
          isDataAvailable={true}
        />

        <BookScroller
          shape='circle'
          data={similarAuthors}
          headerText='Similar authors'
          isNavLink={false}
          isControls={false}
        />
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import authorServices from '../services/authorServices.js';
import bookServices from '../services/bookServices.js';
import { useParams } from 'react-router-dom';
import BookScroller from '../components/sections/BookScroller.jsx';
import Notification from '../components/Notification';
import '../styles/Author.css';

export default function Author() {
  const { id } = useParams();
  const [author, setAuthor] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const [notification, setNotification] = useState({
    title: '',
    message: '',
    type: '',
  });
  const [booksByAuthor, setBooksByAuthor] = useState([]);
  const [similarAuthors, setSimilarAuthors] = useState([]);
  const [isControls, setIsControls] = useState(true);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAuthor = () => {
      const author = authorServices.getAuthorById(parseInt(id));
      setAuthor(author);
      setIsFollowing(author.isFollowing);
    };
    fetchAuthor();
    const fetchSimilarAuthors = () => {
      const foundAuthors = authorServices.getSimilarAuthors();
      setSimilarAuthors(foundAuthors);
    };
    fetchSimilarAuthors();
  }, [id, author]);

  useEffect(() => {
    const fetchBooksByAuthor = async () => {
      if (author.authorName) {
        const books = await bookServices.getBooksByAuthor(author.authorName);
        const foundGenres = authorServices.getAuthorGenres(books);
        setGenres(foundGenres);
        setBooksByAuthor(books);
        setIsControls(booksByAuthor.length > 7);
      }
    };

    fetchBooksByAuthor();
  }, [author.authorName, booksByAuthor.length]);

  const { authorName, description, nationality, coverPhoto } = author;

  const followClass = isFollowing
    ? 'unfollow-button followed'
    : 'follow-button';

  const follow = () => {
    try {
      authorServices.followAuthor(id);
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

  const unfollow = () => {
    try {
      authorServices.unfollowAuthor(id);
      setNotification({
        title: 'Success',
        message: `You have unfollowed ${authorName}`,
        type: 'success',
      });
      setIsFollowing(false);
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

  const chooseFollow = isFollowing ? unfollow : follow;

  const clearNotification = () => {
    setTimeout(() => {
      setNotification({ title: '', message: '', type: '' });
    }, 3000);
  };

  return (
    <div className='author-page'>
      <Notification
        notification={notification}
        clearNotification={clearNotification}
      />
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
          data={booksByAuthor}
          headerText='Thrillers by this author'
          isNavLink={false}
          isAuthorName={false}
          isControls={isControls}
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

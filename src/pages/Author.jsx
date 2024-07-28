import React, { useEffect, useState } from 'react';
import {
  getAuthorById,
  followAuthor,
  unfollowAuthor,
} from '../services/authorServices.js';
import { useParams } from 'react-router-dom';
import ContenScroller from '../components/ContentScroller';

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
  useEffect(() => {
    window.scrollTo(0, 0);
    const author = getAuthorById(parseInt(id));
    setAuthor(author);
    setIsFollowing(author.isFollowing);
  }, [id]);

  const { authorName, description, nationality, coverPhoto } = author;

  const followClass = isFollowing
    ? 'unfollow-button followed'
    : 'follow-button';

  const follow = () => {
    try {
      followAuthor(id);
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
      unfollowAuthor(id);
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

  console.log('isfollowing', isFollowing, followClass);
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
      <div className='container'>
        <div className='author-grid'>
          <div className='author-info'>
            <div className='author-header'>
              <img className='author-image' src={coverPhoto} alt='Author' />
              <div>
                <h1 className='author-name'>{authorName}</h1>
                <p className='author-title'> {nationality} author</p>
                <div className='author-actions'>
                  <button
                    onClick={chooseFollow}
                    className={followClass}
                  ></button>

                  <div className='genre-tags'>
                    <span className='genre-tag'>Fiction</span>
                    <span className='genre-tag'>Mystery</span>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='author-bio'>
            <p>{description}</p>
          </div>
        </div>
        <ContenScroller />
      </div>
    </div>
  );
}

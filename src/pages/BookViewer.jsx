import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const BookViewer = ({ ISBN_num }) => {
  // Obtain ISBN number of user's current book

  const canvasRef = useRef();
  // Initialize loaded state as false
  const [loaded, setLoaded] = useState(false);
  // Create alert message if book not found in Google Database
  function alertNotFound() {
    alert('could not embed the book!');
  }
  // Add a Google Books script tag and event listener if the tag has loaded
  useEffect(() => {
    const scriptTag = document.createElement('script');
    scriptTag.src = 'https://www.google.com/books/jsapi.js';
    scriptTag.addEventListener('load', () => setLoaded(true));
    scriptTag.id = 'google-script';
    document.body.appendChild(scriptTag);
  }, []);
  // Once Google Books has loaded, then create new instance of Default viewer and load book's information to viewer
  useEffect(() => {
    if (!loaded) return;
    else {
      if (window.viewer) {
        let viewer = new window.google.books.DefaultViewer(canvasRef.current);
        viewer.load('ISBN:' + ISBN_num, alertNotFound);
      } else {
        window.google.books.load();
        window.google.books.setOnLoadCallback(() => {
          let viewer = new window.google.books.DefaultViewer(canvasRef.current);
          window.viewer = viewer;
          viewer.load('ISBN:' + ISBN_num, alertNotFound);
        });
      }
    }
  }, [ISBN_num, loaded]);
  return (
    <div>
      {loaded ? (
        <div>
          <div ref={canvasRef} id='viewerCanvas'></div>
        </div>
      ) : (
        'Script not loaded'
      )}
    </div>
  );
};

BookViewer.propTypes = {
  ISBN_num: PropTypes.string,
};

export default BookViewer;

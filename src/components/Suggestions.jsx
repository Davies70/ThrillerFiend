import React, { useState, useRef, useEffect } from 'react';
import PropType from 'prop-types';
import '../styles/Suggestions.css';
import { Link } from 'react-router-dom';
import SuggestionLoader from './SuggestionLoader';

const Suggestions = ({ onSuggestionClick, suggestions }) => {
  const suggestionRef = useRef(null);

  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleOutsideClick = (event) => {
    if (
      suggestionRef.current &&
      !suggestionRef.current.contains(event.target)
    ) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    // Set loading to true while fetching

    setShowSuggestions(suggestions.length > 0);

    document.addEventListener('mousedown', handleOutsideClick);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [suggestions]);

  return (
    <div className='suggestions-wrapper'>
      <ul
        className='suggestions-container'
        style={{
          display: showSuggestions ? 'flex' : 'none',
        }}
        onClick={handleOutsideClick}
        ref={suggestionRef}
      >
        {suggestions.length === 0 && <SuggestionLoader />}
        {suggestions.map((suggestion, index) => (
          <li key={index}>
            <Link
              to={`/book/inauthor:${suggestion.authors}+intitle:${suggestion.title}`}
              key={index}
              state={{ suggestions: suggestion }}
              className='suggestion-item'
              onClick={onSuggestionClick}
            >
              <div className='suggestion-art'>
                <img
                  src={suggestion.book_image}
                  alt={suggestion.title}
                  loading='lazy'
                />
              </div>
              <div className='suggestion-text'>
                <span className='suggestion-title'>{suggestion.title}</span>
                <span className='suggestion-author'>{suggestion.authors}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

Suggestions.propTypes = {
  suggestions: PropType.array.isRequired,
  onSuggestionClick: PropType.func.isRequired,
};

export default Suggestions;

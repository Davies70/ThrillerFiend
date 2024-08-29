import React from 'react';
import PropType from 'prop-types';
import '../styles/Suggestions.css';
import { Link } from 'react-router-dom';

const Suggestions = ({ suggestions, onSuggestionClick }) => {
  return (
    <ul className='suggestions-container'>
      {suggestions.map((suggestion, index) => (
        <li key={index}>
          <Link
            to={`/book/inauthor:${suggestion.authors}+intitle:${suggestion.title}`}
            key={index}
            state={{ data: suggestion }}
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
  );
};

Suggestions.propTypes = {
  suggestions: PropType.array.isRequired,
  onSuggestionClick: PropType.func.isRequired,
};

export default Suggestions;

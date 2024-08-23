import React from 'react';
import PropType from 'prop-types';
import '../styles/Suggestions.css';
import { Link } from 'react-router-dom';

const Suggestions = ({ suggestions, setSuggestions }) => {
  return (
    <ul className='suggestions-container'>
      {suggestions.map((suggestion, index) => (
        <Link
          to={`/book/inauthor:${suggestion.authors}+intitle:${suggestion.title}`}
          key={index}
          state={{ data: suggestion }}
        >
          <li key={index} className='suggestion-item'>
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
          </li>
        </Link>
      ))}
      {/* <li className='search-history '>
        <span className='search-icon suggestion-art'>
          {' '}
          <SearchIcon />{' '}
        </span>
        <span className='search-history-title'>Search History</span>
        <span className='clear-history-btn '>
          <Button color='blue'>Clear History</Button>
        </span>
      </li> */}
    </ul>
  );
};

Suggestions.propTypes = {
  suggestions: PropType.array.isRequired,
  setSuggestions: PropType.func,
};

export default Suggestions;

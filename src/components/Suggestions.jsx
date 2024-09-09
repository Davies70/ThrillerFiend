import React from 'react';
import PropType from 'prop-types';
import '../styles/Suggestions.css';
import { Link } from 'react-router-dom';
import SuggestionLoader from './SuggestionLoader';
import OutsideClickHandler from './OutsideClickHandler';

const Suggestions = ({
  onSuggestionClick,
  isError,
  suggestions,
  isLoading,
  closeSuggestions,
}) => {
  isError && console.error('Error fetching suggestions:', isError);

  if (isLoading) {
    return (
      <div className='suggestions-wrapper'>
        <div className='suggestions-container'>
          <SuggestionLoader />
        </div>
      </div>
    );
  }

  return (
    <OutsideClickHandler
      onOutsideClick={closeSuggestions}
      className='suggestions-wrapper'
    >
      <ul className='suggestions-container'>
        {suggestions.map((suggestion, index) => (
          <li key={index}>
            {suggestion.title === 'No results found' ? (
              <div
                className='no-results'
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <span>{suggestion.title}</span>
                <span>{suggestion.authors}</span>
              </div>
            ) : (
              <Link
                to={`/book/${suggestion.book_id}`}
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
                  <span className='suggestion-author'>
                    {suggestion.authors}
                  </span>
                </div>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </OutsideClickHandler>
  );
};

Suggestions.propTypes = {
  onSuggestionClick: PropType.func.isRequired,
  isError: PropType.bool.isRequired,
  suggestions: PropType.array,
  isLoading: PropType.bool.isRequired,
  closeSuggestions: PropType.func,
};

export default Suggestions;

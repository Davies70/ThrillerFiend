import PropType from "prop-types";
import "../styles/Suggestions.css";
import { Link } from "react-router-dom";
import SuggestionLoader from "./SuggestionLoader";
import OutsideClickHandler from "./OutsideClickHandler";

const Suggestions = ({
  onSuggestionClick,
  isError,
  suggestions = [],
  isLoading,
  closeSuggestions,
}) => {
  if (isError) {
    console.error("Error fetching suggestions:", isError);
  }

  return (
    <OutsideClickHandler
      onOutsideClick={closeSuggestions}
      className="suggestions-wrapper"
    >
      {/* 1. Show the loader inside the OutsideClickHandler so the user can close it while it loads */}
      {isLoading ? (
        <div
          className="suggestions-container"
          style={{ display: "flex", justifyContent: "center", padding: "20px" }}
        >
          <SuggestionLoader />
        </div>
      ) : (
        <ul className="suggestions-container">
          {suggestions?.map((suggestion, index) => (
            <li key={index}>
              {suggestion.title === "No results found" ? (
                <div
                  className="no-results"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    padding: "16px",
                    color: "#9ca3af",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>{suggestion.title}</span>
                  <span style={{ fontSize: "0.9rem" }}>
                    {suggestion.authors}
                  </span>
                </div>
              ) : (
                <Link
                  to={`/book/${suggestion.book_id}`}
                  state={{ suggestions: suggestion }}
                  className="suggestion-item"
                  onClick={onSuggestionClick}
                >
                  <div className="suggestion-art">
                    <img
                      src={
                        suggestion.book_image ||
                        "https://lgimages.s3.amazonaws.com/nc-md.gif"
                      }
                      alt={suggestion.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="suggestion-text">
                    <span className="suggestion-title">{suggestion.title}</span>
                    <span className="suggestion-author">
                      {Array.isArray(suggestion.authors)
                        ? suggestion.authors.join(", ")
                        : suggestion.authors}
                    </span>
                  </div>
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </OutsideClickHandler>
  );
};

Suggestions.propTypes = {
  onSuggestionClick: PropType.func.isRequired,
  isError: PropType.bool.isRequired,
  suggestions: PropType.array,
  isLoading: PropType.bool.isRequired,
  closeSuggestions: PropType.func.isRequired, // made required for safety
};

export default Suggestions;

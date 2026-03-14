import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "../../styles/sections/PersonalizedBanner.css";
import PropTypes from "prop-types";

const PersonalizedBanner = ({ username, booksRead, booksToRead }) => {
  return (
    <div className="personalized-banner">
      <div className="pb-user-info">
        <h2>
          Welcome, <span>{username}!</span>
        </h2>
        <p>Ready for your next thrilling read?</p>
      </div>

      <div className="pb-stats-container">
        <div className="pb-stat">
          <CheckCircleIcon className="pb-stat-icon" fontSize="large" />
          <p className="pb-stat-value">{booksRead}</p>
          <p className="pb-stat-label">
            {booksRead === 1 ? "Book Read" : "Books Read"}
          </p>
        </div>

        <div className="pb-stat">
          <BookOutlinedIcon className="pb-stat-icon" fontSize="large" />
          <p className="pb-stat-value">{booksToRead}</p>
          <p className="pb-stat-label">Want To Read</p>
        </div>
      </div>
    </div>
  );
};

PersonalizedBanner.propTypes = {
  username: PropTypes.string.isRequired,
  booksRead: PropTypes.number.isRequired,
  booksToRead: PropTypes.number.isRequired,
};

export default PersonalizedBanner;

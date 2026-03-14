import "../styles/Notification.css";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

const Notification = ({ notification, closeNotification }) => {
  // Ensure it shows if there is either a title OR a message
  if (!notification || (!notification.title && !notification.message)) {
    return null;
  }

  return (
    <div className="toast-container">
      <div className="toast-content">
        <div className="toast-text">
          {notification.title && (
            <span className="toast-title">{notification.title}</span>
          )}
          <span className="toast-message">{notification.message}</span>
        </div>
        <button
          onClick={closeNotification}
          className="toast-close"
          aria-label="Close notification"
        >
          <CloseIcon fontSize="small" />
        </button>
      </div>

      <div className="toast-progress">
        <div className="toast-progress-bar"></div>
      </div>
    </div>
  );
};

Notification.propTypes = {
  notification: PropTypes.shape({
    title: PropTypes.string,
    message: PropTypes.string,
    type: PropTypes.string,
  }),
  closeNotification: PropTypes.func.isRequired,
};

export default Notification;

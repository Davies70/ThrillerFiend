import OutsideClickHandler from "../OutsideClickHandler";
import { Button, Typography, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import "../../styles/Modal.css";
// These are now the object-based versions from your redone services
import { addBookStatus, removeBookStatus } from "../../services/userServices";

const LibraryModal = ({
  closeModal,
  book, // CHANGED: We now take the full book object instead of just bookId
  userId,
  bookState,
  setBookState,
  redirectToLogIn,
}) => {
  const toggleState = async (stateKey) => {
    // 1. Guard for logged-out users
    if (!userId) {
      redirectToLogIn();
      return;
    }

    try {
      // 2. Logic uses the full 'book' object for Firestore persistence
      if (bookState[stateKey]) {
        // Service now finds the object in the array and removes it
        await removeBookStatus(userId, book, stateKey);
      } else {
        // Service now saves essential book data (title, cover, etc.) to Firestore
        await addBookStatus(userId, book, stateKey);
      }

      // 3. Update local UI state
      setBookState((prev) => ({ ...prev, [stateKey]: !prev[stateKey] }));
    } catch (err) {
      console.error(`LibraryModal Error [${stateKey}]:`, err);
    }
  };

  const buttonStyle = (isActive) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 16px",
    height: "60px",
    borderRadius: "16px",
    textTransform: "none",
    backgroundColor: isActive
      ? "rgba(37, 209, 218, 0.1)"
      : "rgba(255, 255, 255, 0.03)",
    color: isActive ? "#25d1da" : "#9ca3af",
    border: `1px solid ${isActive ? "#25d1da" : "rgba(255, 255, 255, 0.1)"}`,
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: isActive
        ? "rgba(37, 209, 218, 0.2)"
        : "rgba(255, 255, 255, 0.08)",
      borderColor: "#25d1da",
    },
    "&.Mui-disabled": {
      opacity: 0.3,
      cursor: "not-allowed",
    },
  });

  return (
    <div className="modal-overlay">
      <OutsideClickHandler onOutsideClick={closeModal}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>Collection</h2>
            <button
              className="modal-close-btn"
              onClick={closeModal}
              aria-label="close"
            >
              <CloseIcon fontSize="small" />
            </button>
          </div>

          <div className="modal-body">
            {/* HAVE READ */}
            <Button
              variant="outlined"
              sx={buttonStyle(bookState.haveRead)}
              fullWidth
              onClick={() => toggleState("haveRead")}
              disabled={bookState.readLater}
            >
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {bookState.haveRead ? 'In "Have Read"' : "Mark as Read"}
              </Typography>
              {bookState.haveRead ? <DeleteIcon /> : <CheckBoxIcon />}
            </Button>

            {/* READ LATER */}
            <Button
              variant="outlined"
              sx={buttonStyle(bookState.readLater)}
              fullWidth
              onClick={() => toggleState("readLater")}
              disabled={bookState.haveRead}
            >
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {bookState.readLater ? 'In "Read Later"' : "Want to Read"}
              </Typography>
              {bookState.readLater ? <DeleteIcon /> : <TurnedInIcon />}
            </Button>

            {/* FAVORITES */}
            <Button
              variant="outlined"
              sx={buttonStyle(bookState.favorites)}
              fullWidth
              onClick={() => toggleState("favorites")}
            >
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {bookState.favorites ? 'In "Favorites"' : "Add to Favorites"}
              </Typography>
              {bookState.favorites ? <DeleteIcon /> : <FavoriteIcon />}
            </Button>
          </div>

          <Box sx={{ mt: "auto", textAlign: "center", pt: 2 }}>
            <Typography
              variant="caption"
              sx={{
                color: "#6b7280",
                letterSpacing: "0.05em",
                fontWeight: 700,
              }}
            >
              SYNCED TO THRILLER-CLOUD
            </Typography>
          </Box>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

LibraryModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired, // Updated prop type
  userId: PropTypes.string,
  bookState: PropTypes.object.isRequired,
  setBookState: PropTypes.func.isRequired,
  redirectToLogIn: PropTypes.func.isRequired,
};

export default LibraryModal;

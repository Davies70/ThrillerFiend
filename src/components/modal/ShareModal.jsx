import OutsideClickHandler from "../OutsideClickHandler";
import { Button } from "@mui/material";
import FaceBook from "@mui/icons-material/Facebook";
import Twitter from "@mui/icons-material/Twitter";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import CloseIcon from "@mui/icons-material/Close";
import "../../styles/Modal.css";
import PropTypes from "prop-types";

const ShareModal = ({ closeModal, setNotification }) => {
  const currentUrl = window.location.href;
  const APP_ID = import.meta.env.VITE_FACEBOOK_APP_ID;

  const text = "Check out this thriller I found on ThrillerFiend!";
  const hashtags = "thrillerfiend,books,thriller";

  const shareToFacebook = () => {
    const facebookShareUrl = `https://www.facebook.com/dialog/share?app_id=${APP_ID}&display=popup&href=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(text)}`;
    window.open(facebookShareUrl, "_blank", "width=600,height=400");
  };

  const shareToTwitter = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(text)}&hashtags=${encodeURIComponent(hashtags)}`;
    window.open(twitterShareUrl, "_blank", "width=550,height=420");
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(currentUrl).then(
      () => {
        setNotification("Success", "Link copied to clipboard!");
      },
      (err) => console.error("Failed to copy: ", err),
    );
  };

  const buttonStyle = {
    justifyContent: "flex-start",
    padding: "12px 16px",
    borderRadius: "12px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "var(--text-primary)",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(37, 209, 218, 0.1)",
      color: "var(--accent-blue)",
    },
  };

  return (
    <div className="modal-overlay">
      <OutsideClickHandler onOutsideClick={closeModal}>
        {/* ADDED THIS WRAPPER DIV */}
        <div className="modal-content">
          <div className="modal-header">
            <h2>Share this Thrill</h2>
            <button
              className="modal-close-btn"
              onClick={closeModal}
              aria-label="Close"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="modal-body">
            <Button
              startIcon={<FaceBook />}
              variant="text"
              sx={buttonStyle}
              fullWidth
              onClick={shareToFacebook}
            >
              Share on Facebook
            </Button>

            <Button
              startIcon={<Twitter />}
              variant="text"
              sx={buttonStyle}
              fullWidth
              onClick={shareToTwitter}
            >
              Share on Twitter
            </Button>

            <Button
              startIcon={<LinkOutlinedIcon />}
              variant="text"
              sx={buttonStyle}
              fullWidth
              onClick={copyLinkToClipboard}
            >
              Copy Link
            </Button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

ShareModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default ShareModal;

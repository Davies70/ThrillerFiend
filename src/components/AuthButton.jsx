import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const AuthButton = ({ loading, user, handleSignOut, dontShowSignInButton }) => {
  if (loading) {
    return (
      <div className="auth-button-wrapper">
        <LoadingButton
          loading
          variant="contained"
          sx={{
            borderRadius: "1.5rem",
            minWidth: "80px", // Ensure consistent width
          }}
          size="small"
        />
      </div>
    );
  }

  if (user) {
    return (
      <div className="auth-button-wrapper">
        <Button
          onClick={handleSignOut}
          variant="contained"
          color="ochre"
          sx={{
            borderRadius: "1.5rem",
            minWidth: "80px", // Ensure consistent width
          }}
          size="small"
        >
          Sign out
        </Button>
      </div>
    );
  }

  if (!dontShowSignInButton) {
    return (
      <div className="auth-button-wrapper">
        <Button
          variant="contained"
          sx={{
            borderRadius: "1.5rem",
            minWidth: "80px", // Ensure consistent width
          }}
          size="small"
        >
          {/* Ensure the link text inherits the button color and removes underlines */}
          <Link
            to="/signin"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Sign in
          </Link>
        </Button>
      </div>
    );
  }

  return null;
};

AuthButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object,
  handleSignOut: PropTypes.func.isRequired,
  dontShowSignInButton: PropTypes.bool.isRequired,
};

export default AuthButton;

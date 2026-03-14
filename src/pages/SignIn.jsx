import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/config";
import GoogleIcon from "@mui/icons-material/Google";
import LoadingButton from "@mui/lab/LoadingButton";
import "../styles/pages/Auth.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-page">
      {/* Left: Cinematic Branding */}
      <div className="auth-visual">
        <h1>
          Welcome back to <span>ThrillerFiend.</span>
        </h1>
        <p>The dark secrets of your library are waiting for you.</p>
      </div>

      {/* Right: Modern Form */}
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Sign In</h2>
            <p>Enter your details to access your collection.</p>
          </div>

          <form className="auth-form" onSubmit={handleEmailSignIn}>
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                className="auth-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                className="auth-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p style={{ color: "#ef4444", fontSize: "0.85rem", margin: 0 }}>
                {error}
              </p>
            )}

            <LoadingButton
              type="submit"
              loading={loading}
              variant="contained"
              sx={{
                backgroundColor: "var(--accent-blue)",
                color: "var(--bg-primary)",
                py: 1.5,
                borderRadius: "12px",
                fontWeight: 700,
                "&:hover": { backgroundColor: "#5ce3ed" },
              }}
            >
              Sign In
            </LoadingButton>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                color: "var(--text-secondary)",
                fontSize: "0.8rem",
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "var(--border-subtle)",
                }}
              ></div>
              OR
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "var(--border-subtle)",
                }}
              ></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="action-btn secondary"
              style={{ width: "100%", textTransform: "none" }}
            >
              <GoogleIcon fontSize="small" />
              Sign in with Google
            </button>
          </form>

          <div className="auth-footer">
            Don't have an account?{" "}
            <Link to="/signup" className="auth-link">
              Sign up for free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

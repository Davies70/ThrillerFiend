import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import { createUser } from "../services/userServices";
import LoadingButton from "@mui/lab/LoadingButton";
import "../styles/pages/Auth.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // Update Firebase Auth Profile
      await updateProfile(user, { displayName: name });

      // Create Firestore User Document
      await createUser(user.uid);

      navigate("/");
    } catch (err) {
      setError(
        err.message.includes("email-already-in-use")
          ? "Email already registered."
          : "Failed to create account.",
      );
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <h1>
          Join the <span>Fiends.</span>
        </h1>
        <p>
          Track your thrillers, keep private clues, and never lose your place in
          the dark.
        </p>
      </div>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Start your journey into the mystery today.</p>
          </div>

          <form className="auth-form" onSubmit={handleSignUp}>
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                className="auth-input"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
                placeholder="Min 6 characters"
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
              Create Account
            </LoadingButton>
          </form>

          <div className="auth-footer">
            Already have an account?{" "}
            <Link to="/signin" className="auth-link">
              Sign in instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

import { useState, useRef, useEffect } from "react";
import "../styles/Nav.css";
import Logo from "./icons/nav/Logo";
import LogoSmall from "./icons/nav/LogoSmall";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LogoutIcon from "@mui/icons-material/Logout";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Suggestions from "./Suggestions";
import bookServices from "../services/bookServices";
import { useQuery } from "@tanstack/react-query";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useAuth } from "../context/AuthProvider";
import LoadingButton from "@mui/lab/LoadingButton";
import AuthButton from "./AuthButton";

const Nav = () => {
  // 1. Decoupled Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  // Mobile states
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const desktopContainerRef = useRef(null);
  const mobileInputRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        desktopContainerRef.current &&
        !desktopContainerRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Closes mobile modal if you navigate pages
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
  }, [location.pathname]);

  const openMobileSearch = () => {
    setIsMobileSearchOpen(true);
    setTimeout(() => mobileInputRef.current?.focus(), 100);
  };

  const closeMobileSearch = () => {
    setIsMobileSearchOpen(false);
    setShowSuggestions(false);
    setSearchQuery("");
    setSubmittedQuery("");
  };

  // Universal handler for when a user selects a book from the list
  const handleSuggestionClick = () => {
    setShowSuggestions(false);
    setIsMobileSearchOpen(false);
    setSuggestions([]);
    setSearchQuery("");
    setSubmittedQuery("");
  };

  const fetchSuggestions = async (q) => {
    if (!q || q.trim() === "") return [];
    try {
      const data = await bookServices.getBooksSuggestions(q);
      return data?.length > 0
        ? data
        : [{ title: "No results found", authors: "Try another search" }];
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      return [];
    }
  };

  // 2. Only update submittedQuery on actual form submit
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      setSubmittedQuery(searchQuery.trim());
      setShowSuggestions(true);
    }
  };

  // 3. Only update the input text while typing, but don't fetch yet
  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    setShowSuggestions(false); // Hide stale suggestions while typing

    if (val.trim() === "") {
      setSubmittedQuery("");
      setSuggestions([]);
    }
  };

  // 4. React Query only fires when submittedQuery is populated
  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", submittedQuery],
    queryFn: () => fetchSuggestions(submittedQuery),
    enabled: !!submittedQuery,
  });

  const handleSignOut = (event) => {
    event.preventDefault();
    signOut(auth)
      .then(() => {
        navigate("/signin");
        setIsMobileMenuOpen(false);
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (data && submittedQuery.trim() !== "") {
      setSuggestions(data);
      setShowSuggestions(true);
    }
  }, [data, submittedQuery]);

  const dontShowSignInButton =
    location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <>
      {/* ================= MAIN NAVIGATION BAR ================= */}
      <nav className="nav">
        <div className="nav-content">
          {/* LOGOS */}
          <div className="nav-brand">
            <Link to={"/"} id="logo">
              <Logo />
            </Link>
            <Link to={"/"} id="logo-small">
              <LogoSmall />
            </Link>
          </div>

          {/* DESKTOP CENTER LINKS */}
          <ul className="nav-links hidden-on-mobile">
            <Link
              className={
                location.pathname === "/" ? "nav-link-active" : "nav-link"
              }
              to={"/"}
            >
              <HomeIcon /> <span>Home</span>
            </Link>
            <Link
              className={
                location.pathname === "/blog" ? "nav-link-active" : "nav-link"
              }
              to={"/blog"}
            >
              <WhatshotIcon /> <span>Hot Thrills</span>
            </Link>
            <Link
              className={
                location.pathname === "/collections"
                  ? "nav-link-active"
                  : "nav-link"
              }
              to={user ? "/collections" : "/signin"}
            >
              <LibraryBooksIcon /> <span>Collections</span>
            </Link>
          </ul>

          {/* RIGHT SIDE ACTIONS */}
          <div className="nav-actions">
            {/* 1. DESKTOP SEARCH */}
            <div
              className="desktop-search hidden-on-mobile"
              ref={desktopContainerRef}
            >
              <form
                className="desktop-search-form"
                onSubmit={handleSearchSubmit}
              >
                <input
                  className="desktop-search-bar"
                  type="text"
                  placeholder="Search Books..."
                  value={searchQuery}
                  onChange={handleInputChange}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="desktop-cancel"
                    onClick={() => {
                      setSearchQuery("");
                      setSubmittedQuery("");
                      setShowSuggestions(false);
                    }}
                  >
                    <CancelIcon fontSize="small" />
                  </button>
                )}
                <button
                  className="desktop-search-icon"
                  type="submit"
                  tabIndex="-1"
                >
                  <SearchIcon />
                </button>
              </form>
              {showSuggestions && !isMobileSearchOpen && (
                <Suggestions
                  suggestions={suggestions}
                  isError={isError}
                  isLoading={isLoading}
                  onSuggestionClick={handleSuggestionClick}
                  closeSuggestions={() => setShowSuggestions(false)}
                />
              )}
            </div>

            {/* 2. DESKTOP AUTH & PROFILE */}
            <div className="desktop-auth-container hidden-on-mobile">
              <AuthButton
                loading={loading}
                user={user}
                handleSignOut={handleSignOut}
                dontShowSignInButton={dontShowSignInButton}
              />
              <div className="profile-icon-wrapper">
                {loading ? (
                  <LoadingButton
                    loading
                    variant="contained"
                    sx={{
                      borderRadius: "50%",
                      minWidth: "40px",
                      width: "40px",
                      height: "40px",
                    }}
                  />
                ) : user ? (
                  <button
                    onClick={handleSignOut}
                    className="profile-button"
                    title="Sign Out"
                  >
                    <LogoutIcon />
                  </button>
                ) : (
                  <Link to={"/signin"} className="profile-link" title="Sign In">
                    <AccountCircleIcon fontSize="large" />
                  </Link>
                )}
              </div>
            </div>

            {/* 3. MOBILE TOP RIGHT ICONS */}
            <div className="mobile-top-actions hidden-on-desktop">
              <button className="mobile-action-btn" onClick={openMobileSearch}>
                <SearchIcon />
              </button>
              <button
                className="mobile-action-btn"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE BOTTOM BAR ================= */}
      <div className="mobile-bottom-bar hidden-on-desktop">
        <Link
          className={`mobile-bottom-link ${location.pathname === "/" ? "active" : ""}`}
          to={"/"}
        >
          <HomeIcon fontSize="large" />
        </Link>
        <Link
          className={`mobile-bottom-link ${location.pathname === "/blog" ? "active" : ""}`}
          to={"/blog"}
        >
          <WhatshotIcon fontSize="large" />
        </Link>
        <Link
          className={`mobile-bottom-link ${location.pathname === "/collections" ? "active" : ""}`}
          to={user ? "/collections" : "/signin"}
        >
          <LibraryBooksIcon fontSize="large" />
        </Link>
      </div>

      {/* ================= MOBILE SEARCH OVERLAY ================= */}
      {isMobileSearchOpen && (
        <div className="mobile-search-overlay hidden-on-desktop">
          <button className="mobile-overlay-back" onClick={closeMobileSearch}>
            <ArrowBackIcon />
          </button>

          <div className="mobile-search-input-wrapper">
            <form onSubmit={handleSearchSubmit} className="mobile-search-form">
              <input
                ref={mobileInputRef}
                className="mobile-search-input"
                type="text"
                placeholder="Search titles, authors..."
                value={searchQuery}
                onChange={handleInputChange}
              />

              {/* ACTION BUTTONS WRAPPER */}
              <div className="mobile-search-actions">
                {searchQuery && (
                  <button
                    type="button"
                    className="mobile-overlay-clear"
                    onClick={() => {
                      setSearchQuery("");
                      setSubmittedQuery("");
                      setShowSuggestions(false);
                      mobileInputRef.current?.focus(); // Keeps keyboard open
                    }}
                  >
                    <CancelIcon fontSize="small" />
                  </button>
                )}
                <button type="submit" className="mobile-overlay-submit">
                  <SearchIcon />
                </button>
              </div>
            </form>

            {showSuggestions && (
              <Suggestions
                suggestions={suggestions}
                isError={isError}
                isLoading={isLoading}
                onSuggestionClick={handleSuggestionClick}
                closeSuggestions={closeMobileSearch}
              />
            )}
          </div>
        </div>
      )}

      {/* ================= MOBILE HAMBURGER MENU OVERLAY ================= */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-backdrop hidden-on-desktop"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="mobile-menu-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-menu-header">
              <span>Account Menu</span>
              <button
                className="mobile-menu-close"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="mobile-menu-body">
              <div className="mobile-menu-item">
                <span
                  style={{
                    color: "#9ca3af",
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  Profile
                </span>
                {loading ? (
                  <LoadingButton
                    loading
                    variant="contained"
                    sx={{ borderRadius: "1.5rem" }}
                  />
                ) : user ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      color: "#e5e7eb",
                    }}
                  >
                    <AccountCircleIcon
                      fontSize="large"
                      sx={{ color: "#25d1da" }}
                    />
                    <span
                      style={{ fontSize: "0.9rem", wordBreak: "break-all" }}
                    >
                      Signed in
                    </span>
                  </div>
                ) : (
                  <Link
                    to="/signin"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      color: "#e5e7eb",
                      textDecoration: "none",
                    }}
                  >
                    <AccountCircleIcon fontSize="large" />
                    <span>Sign In to Account</span>
                  </Link>
                )}
              </div>

              <div className="mobile-menu-item">
                <span
                  style={{
                    color: "#9ca3af",
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  Actions
                </span>
                <AuthButton
                  loading={loading}
                  user={user}
                  handleSignOut={handleSignOut}
                  dontShowSignInButton={dontShowSignInButton}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;

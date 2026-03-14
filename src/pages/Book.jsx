import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import bookServices from "../services/bookServices";
import NoteCard from "../components/NoteCard";
import "../styles/pages/Book.css";

// MUI Components & Icons
import { Rating, Button, Fade } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ShareIcon from "@mui/icons-material/Share";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import LoadingButton from "@mui/lab/LoadingButton";

// Custom Components
import Loader from "../components/Loader";
import LibraryModal from "../components/modal/LibraryModal";
import ShareModal from "../components/modal/ShareModal";
import Notification from "../components/Notification";
import useCheckIfOverflowing from "../hooks/useCheckIfOverflowing";
import useBookNotes from "../hooks/useBookNotes";
import { getLanguage } from "../utils/utils";
import { useAuth } from "../context/AuthProvider";
import {
  writeNote,
  writeRating,
  deleteNote,
  updateNote,
  getRating,
  getBookStatus,
} from "../services/userServices";

const Book = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const redirectToLogIn = () => {
    if (!user) navigate("/signin");
  };

  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const descriptionRef = useRef(null);
  const [noteText, setNoteText] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);

  const [previousRating, setPreviousRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(0);
  const [ratingPrompt, setRatingPrompt] = useState("Rate this book");

  const [bookState, setBookState] = useState({
    haveRead: false,
    readLater: false,
    favorite: false,
  });

  const [isLibraryModalOpen, setIsLibraryModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [notification, setNotification] = useState({ title: "", message: "" });

  // --- QUERIES & MUTATIONS ---
  const {
    data: book,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: () => bookServices.getBookByVolumeId(id),
  });

  const mutation = useMutation({
    mutationFn: () => writeNote(user.uid, id, noteText),
    onSuccess: () => setNoteText(""),
    enabled: !!user?.uid,
  });

  const deleteNoteMutation = useMutation({
    mutationFn: (noteId) => deleteNote(user.uid, id, noteId),
    enabled: !!user?.uid,
  });

  const ratingMutation = useMutation({
    mutationFn: () => writeRating(user.uid, id, currentRating),
    enabled: !!user?.uid,
  });

  const { notes, loading: notesLoading } = useBookNotes(user?.uid, id);

  useEffect(() => {
    const fetchRating = async () => {
      if (!user) {
        setRatingPrompt("Sign in to rate this book");
        return;
      }
      const rating = await getRating(user?.uid, id);
      setCurrentRating(rating || 0);
    };
    fetchRating();
  }, [user, id]);

  useEffect(() => {
    const fetchBookStatus = async () => {
      if (!user) return;
      const status = await getBookStatus(user?.uid, id);
      setBookState(status);
    };
    fetchBookStatus();
  }, [user, id]);

  // --- HANDLERS ---
  const handleAddNote = (e) => {
    e.preventDefault();
    mutation.mutate();
    setSaveLoading(true);
    setTimeout(() => setSaveLoading(false), 1000);
    triggerNotification("Success", "Note saved securely.");
  };

  const handleDeleteNote = (e, noteId) => {
    e.preventDefault();
    deleteNoteMutation.mutate(noteId);
    triggerNotification("Success", "Note deleted.");
  };

  const handleUpdateNote = async (updatedNoteText, noteId) => {
    await updateNote(user.uid, id, noteId, updatedNoteText);
    triggerNotification("Success", "Note updated.");
  };

  const handleRating = async (e, newValue) => {
    e.preventDefault();
    ratingMutation.mutate();
    setCurrentRating(newValue);
    setPreviousRating(currentRating);

    if (newValue === null) {
      triggerNotification("Success", "Rating removed.");
    } else {
      triggerNotification("Success", `Rating saved: ${newValue} stars.`);
      setRatingPrompt("Saved");
    }
  };

  const triggerNotification = (title, message) => {
    setNotification({ title, message });
    setTimeout(() => setNotification({ title: "", message: "" }), 2500);
  };

  const showButton = useCheckIfOverflowing(
    descriptionRef,
    isTextExpanded,
    book?.description,
  );

  if (isLoading || notesLoading) return <Loader />;
  if (isError)
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: "40px" }}>
        Error fetching book data.
      </div>
    );

  const {
    title,
    rating,
    subtitle,
    book_image,
    description,
    publishedDate,
    publisher,
    isbn,
    pageCount,
    language,
    saleInfo,
    price,
    currencyCode,
    categories,
    authors,
  } = book || {};

  return (
    <div className="book-page">
      <div className="book-grid">
        {/* LEFT COLUMN: Cover & Rating */}
        <div className="book-left-col">
          <div className="book-cover-wrapper">
            <img
              src={book_image || `https://lgimages.s3.amazonaws.com/nc-md.gif`}
              alt={title}
              loading="lazy"
            />
          </div>

          <div className="book-rating-container">
            <span className="rating-status">{ratingPrompt}</span>
            <Rating
              size="large"
              precision={0.5}
              onChange={handleRating}
              value={currentRating}
              disabled={!user}
              sx={{
                color: "var(--accent-blue)",
                "& .MuiRating-iconEmpty": { color: "var(--text-secondary)" },
              }}
            />
            {rating > 0 && (
              <div
                style={{
                  marginTop: "8px",
                  fontSize: "0.875rem",
                  color: "var(--text-secondary)",
                }}
              >
                Avg Rating:{" "}
                <Rating
                  size="small"
                  value={rating}
                  readOnly
                  sx={{ color: "var(--accent-blue)", verticalAlign: "middle" }}
                />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Details & Actions */}
        <div className="book-right-col">
          <div className="book-header">
            <h1>{title}</h1>
            {subtitle && <h2 className="book-subtitle">{subtitle}</h2>}
            <p className="book-authors">{authors?.join(", ")}</p>
          </div>

          <div className="book-actions-row">
            <Button
              variant="contained"
              onClick={() => setIsLibraryModalOpen(true)}
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: "var(--text-primary)",
                color: "var(--bg-primary)",
                "&:hover": { backgroundColor: "var(--accent-blue)" },
              }}
            >
              Collection
            </Button>

            {saleInfo?.buyLink && (
              <Button
                component="a"
                href={saleInfo.buyLink}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                startIcon={<ShoppingCartIcon />}
                sx={{
                  color: "var(--text-primary)",
                  borderColor: "var(--border-subtle)",
                  "&:hover": {
                    borderColor: "var(--accent-blue)",
                    color: "var(--accent-blue)",
                  },
                }}
              >
                Buy Now
              </Button>
            )}

            <Button
              variant="outlined"
              startIcon={<ShareIcon />}
              onClick={() => setIsShareModalOpen(true)}
              sx={{
                color: "var(--text-primary)",
                borderColor: "var(--border-subtle)",
                "&:hover": {
                  borderColor: "var(--accent-blue)",
                  color: "var(--accent-blue)",
                },
              }}
            >
              Share
            </Button>
          </div>

          <div className="book-description-container">
            <div
              className={`book-description ${!isTextExpanded && showButton ? "collapsed" : ""}`}
              ref={descriptionRef}
              dangerouslySetInnerHTML={{ __html: description }}
            />
            {!isTextExpanded && showButton && (
              <div className="description-fade" />
            )}

            {showButton && (
              <Button
                variant="text"
                endIcon={
                  isTextExpanded ? (
                    <ExpandLessOutlinedIcon />
                  ) : (
                    <ExpandMoreOutlinedIcon />
                  )
                }
                onClick={() => setIsTextExpanded(!isTextExpanded)}
                sx={{
                  color: "var(--accent-blue)",
                  mt: 1,
                  p: 0,
                  "&:hover": {
                    background: "transparent",
                    textDecoration: "underline",
                  },
                }}
              >
                {isTextExpanded ? "Read Less" : "Read More"}
              </Button>
            )}
          </div>

          {categories && (
            <div className="book-genre-tags">
              {categories.map((cat, i) => (
                <span className="book-genre-tag" key={i}>
                  {cat}
                </span>
              ))}
            </div>
          )}

          <div className="book-meta-grid">
            {publisher && (
              <div className="meta-item">
                <span className="meta-label">Publisher</span>
                <span className="meta-value">{publisher}</span>
              </div>
            )}
            {publishedDate && (
              <div className="meta-item">
                <span className="meta-label">Published</span>
                <span className="meta-value">{publishedDate}</span>
              </div>
            )}
            {pageCount && (
              <div className="meta-item">
                <span className="meta-label">Pages</span>
                <span className="meta-value">{pageCount}</span>
              </div>
            )}
            {language && (
              <div className="meta-item">
                <span className="meta-label">Language</span>
                <span className="meta-value">{getLanguage(language)}</span>
              </div>
            )}
            {isbn && (
              <div className="meta-item">
                <span className="meta-label">ISBN</span>
                <span className="meta-value">{isbn}</span>
              </div>
            )}
          </div>

          {/* NOTES SECTION */}
          <div className="notes-section">
            <h2>Private Notes</h2>
            <div className="note-editor">
              <textarea
                placeholder={
                  user
                    ? "What did you think of this thriller? (Notes are private)"
                    : "Sign in to write private notes..."
                }
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                disabled={!user}
                aria-label="Write a note"
              />
              <div className="note-editor-actions">
                <LoadingButton
                  variant="contained"
                  loading={saveLoading}
                  onClick={handleAddNote}
                  disabled={!user || !noteText.trim()}
                  sx={{
                    backgroundColor: "var(--accent-blue)",
                    color: "var(--bg-primary)",
                    "&:hover": { backgroundColor: "var(--hover-blue)" },
                    borderRadius: "20px",
                  }}
                >
                  Save Note
                </LoadingButton>
              </div>
            </div>

            <div
              className="notecard-container"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginTop: "24px",
              }}
            >
              {notes && notes.length > 0 ? (
                notes.map((note, index) => (
                  <NoteCard
                    key={index}
                    noteText={note.noteText}
                    created={note.created}
                    deleteNote={(e) => handleDeleteNote(e, index)}
                    updateNote={handleUpdateNote}
                    noteId={index}
                  />
                ))
              ) : (
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontStyle: "italic",
                    margin: 0,
                  }}
                >
                  No notes yet. Start tracking your clues.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Notification
        closeNotification={() => setNotification({ title: "", message: "" })}
        notification={notification}
      />

      {isLibraryModalOpen && (
        <LibraryModal
          closeModal={() => setIsLibraryModalOpen(false)}
          book={book}
          userId={user?.uid}
          bookState={bookState}
          setBookState={setBookState}
          redirectToLogIn={redirectToLogIn}
        />
      )}

      {isShareModalOpen && (
        <ShareModal
          closeModal={() => setIsShareModalOpen(false)}
          setNotification={triggerNotification}
        />
      )}
    </div>
  );
};

export default Book;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import {
  getBookStatus,
  addBookStatus,
  removeBookStatus,
} from "../services/userServices";
import AddBoxIcon from "@mui/icons-material/AddBox";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import Notification from "./Notification";
import "../styles/Shape.css";

const Shape = ({ book, shape = "square" }) => {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [notif, setNotif] = useState(null);
  const [isShaking, setIsShaking] = useState(false);

  if (!book) return null;

  // 1. Let the 'shape' prop dictate the component's identity
  const isAuthorShape = shape === "circle";

  // 2. Resilient data extraction (works for both raw author objects and book objects)
  const itemId = book.book_id || book.id;
  const itemTitle = book.title || book.authorName;
  const itemImage = book.book_image || book.coverPhoto;
  const itemAuthors = book.authors;

  // 3. Set dynamic routing based on the shape
  const linkDestination = isAuthorShape
    ? `/author/${itemId}`
    : `/book/${itemId}`;

  useEffect(() => {
    const checkStatus = async () => {
      // Skip the Firestore check if this is rendering an author circle
      if (user?.uid && itemId && !isAuthorShape) {
        const status = await getBookStatus(user.uid, itemId);
        setIsSaved(status.readLater || status.haveRead);
      }
    };
    checkStatus();
  }, [user?.uid, itemId, isAuthorShape]);

  const handleQuickAdd = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      setNotif({
        title: "Access Denied",
        message: "Please sign in to save this thriller.",
      });
      return;
    }

    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);

    try {
      if (isSaved) {
        await removeBookStatus(user.uid, book, "readLater");
        setIsSaved(false);
      } else {
        await addBookStatus(user.uid, book, "readLater");
        setIsSaved(true);
        setNotif({
          title: "Library Updated",
          message: `Added "${itemTitle}" to Read Later.`,
        });
        setTimeout(() => setNotif(null), 3000);
      }
    } catch (err) {
      console.error("Quick Add Error:", err);
    }
  };

  return (
    <>
      <div className={`shape-card ${shape} ${isShaking ? "shake-it" : ""}`}>
        <Link to={linkDestination} className="shape-link">
          <div className="image-container">
            <img
              src={itemImage || "https://lgimages.s3.amazonaws.com/nc-md.gif"}
              alt={itemTitle}
              loading="lazy"
            />

            {/* 4. Hide the Quick Add button if it's an author circle */}
            {!isAuthorShape && (
              <button
                className={`action-btn ${isSaved ? "active" : ""}`}
                onClick={handleQuickAdd}
              >
                {isSaved ? (
                  <BookmarkAddedIcon fontSize="small" />
                ) : (
                  <AddBoxIcon fontSize="small" />
                )}
              </button>
            )}

            <div className="inner-shadow" />
          </div>

          <div className="text-meta">
            <h3
              className="title-ellipsis"
              style={{ textAlign: isAuthorShape ? "center" : "left" }}
            >
              {itemTitle}
            </h3>

            {/* 5. Hide the author sub-text if it's an author circle */}
            {!isAuthorShape && (
              <p className="author-ellipsis">
                {itemAuthors?.join(", ") || "Unknown Author"}
              </p>
            )}
          </div>
        </Link>
      </div>

      {notif && (
        <Notification
          notification={notif}
          closeNotification={() => setNotif(null)}
        />
      )}
    </>
  );
};

export default Shape;

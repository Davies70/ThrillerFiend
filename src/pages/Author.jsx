import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueries } from "@tanstack/react-query";
import { Fade, Box, Typography } from "@mui/material";

import authorServices from "../services/authorServices.js";
import bookServices from "../services/bookServices.js";
import { useAuth } from "../context/AuthProvider.jsx";

// Components
import BookScroller from "../components/sections/BookScroller.jsx";
import Notification from "../components/Notification";
import OutsideClickHandler from "../components/OutsideClickHandler.jsx";
import Loader from "../components/Loader.jsx";
import "../styles/pages/Author.css"; // Connects to the new responsive CSS

export default function Author() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isFollowing, setIsFollowing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Smoothly scroll to the top whenever the Author ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // 2. Check Following Status
  useEffect(() => {
    if (!user) return;
    const checkFollowing = async () => {
      const status = await authorServices.checkFollowing(id, user.uid);
      setIsFollowing(status);
    };
    checkFollowing();
  }, [user, id]);

  // 3. Fetch Data
  const {
    data: author,
    isLoading: authorIsLoading,
    isError: authorIsError,
  } = useQuery({
    queryKey: ["author", id],
    queryFn: () => authorServices.getAuthorById(id),
    enabled: !!id,
  });

  const { data: booksByAuthor, isLoading: booksByAuthorIsLoading } = useQuery({
    queryKey: ["booksByAuthor", id],
    queryFn: () => bookServices.getBooksByAuthor(author, "relevance"),
    enabled: !!author,
  });

  const notableWorks = author?.notableWorks || [];

  const notableWorksQueries = useQueries({
    queries: notableWorks.map((notableWork) => ({
      queryKey: ["notableThrills", notableWork],
      queryFn: () =>
        bookServices.getBookByAuthorAndTitle(
          `intitle:${notableWork}+inauthor:${author?.authorName}`,
        ),
      enabled: !!author,
    })),
  });

  const isLoading =
    authorIsLoading ||
    booksByAuthorIsLoading ||
    notableWorksQueries.some((q) => q.isLoading);

  if (isLoading) return <Loader />;

  if (authorIsError || !author) {
    return (
      <Box sx={{ p: 10, textAlign: "center" }}>
        <Typography variant="h5" color="text.primary">
          Author not found.
        </Typography>
      </Box>
    );
  }

  // 4. Clean up fetched data for the scrollers
  // THE FIX: Filter out any undefined/failed queries so the page doesn't crash
  const notableThrills = notableWorksQueries
    .filter((q) => !q.isError && q.data)
    .map((q) => q.data);

  // Map similar authors to perfectly match the Shape component's expectations
  const mappedSimilarAuthors = (author.similarAuthors || []).map((sim) => ({
    id: sim.authorId,
    authorName: sim.name,
    coverPhoto: sim.coverPhoto,
  }));

  // 5. Follow / Unfollow Logic
  const triggerNotification = (title, message, type) => {
    setNotification({ title, message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleFollow = async () => {
    if (!user) return navigate("/signin");
    try {
      await authorServices.followAuthor(id, user.uid);
      setIsFollowing(true);
      triggerNotification(
        "Success",
        `You are now following ${author.authorName}`,
        "success",
      );
    } catch (error) {
      console.error(error.message);
      triggerNotification("Error", "Failed to follow author.", "error");
    }
  };

  const handleUnfollowConfirm = async () => {
    if (!user) return navigate("/signin");
    try {
      await authorServices.unfollowAuthor(id, user.uid);
      setIsFollowing(false);
      setIsModalOpen(false);
      triggerNotification(
        "Success",
        `Unfollowed ${author.authorName}`,
        "success",
      );
    } catch (error) {
      console.error(error.message);
      triggerNotification("Error", "Failed to unfollow author.", "error");
    }
  };

  return (
    <Fade in={true} timeout={800}>
      {/* MATCHING THE NEW CSS CLASSES */}
      <div className="author-page-container">
        {notification && (
          <Notification
            notification={notification}
            closeNotification={() => setNotification(null)}
          />
        )}

        {/* Improved Unfollow Modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <OutsideClickHandler
              onOutsideClick={() => setIsModalOpen(false)}
              className="unfollow-modal-content"
            >
              <h3>Unfollow {author.authorName}?</h3>
              <p>
                Their books will no longer appear in your personalized
                collections.
              </p>
              <div className="unfollow-actions">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="btn-cancel"
                >
                  Cancel
                </button>
                <button onClick={handleUnfollowConfirm} className="btn-confirm">
                  Unfollow
                </button>
              </div>
            </OutsideClickHandler>
          </div>
        )}

        {/* Premium Profile Header */}
        <div className="author-profile-header">
          <img
            className="author-avatar"
            src={author.coverPhoto}
            alt={author.authorName}
          />

          <div className="author-meta">
            <h1 className="author-name">{author.authorName}</h1>
            <p className="author-subtitle">{author.nationality} Author</p>

            <div className="author-tags">
              {author.genres?.map((genre, index) => (
                <span key={index} className="tag">
                  {genre}
                </span>
              ))}
            </div>

            <button
              onClick={isFollowing ? () => setIsModalOpen(true) : handleFollow}
              className={`action-btn-main ${isFollowing ? "following" : ""}`}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>
        </div>

        {/* Bio Section */}
        <div className="author-bio-section">
          <p>{author.description}</p>
        </div>

        {/* Scrollers */}
        <div className="author-content-rows">
          <BookScroller
            shape="square"
            headerText="Notable Thrills"
            data={notableThrills}
            isControls={false}
            isDataAvailable={notableThrills.length > 0}
          />

          <BookScroller
            shape="square"
            headerText="Other works by this author"
            data={booksByAuthor || []}
            isControls={true}
            isDataAvailable={(booksByAuthor || []).length > 0}
          />

          <BookScroller
            shape="circle"
            headerText="Similar Authors"
            data={mappedSimilarAuthors}
            isControls={false}
            isDataAvailable={mappedSimilarAuthors.length > 0}
          />
        </div>
      </div>
    </Fade>
  );
}

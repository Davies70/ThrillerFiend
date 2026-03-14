import { useState, useEffect, useRef } from "react";
import { useQueries } from "@tanstack/react-query";
import { useAuth } from "../context/AuthProvider";
import { getBooksByStatus } from "../services/userServices";
import authorServices from "../services/authorServices";
import { Link, useNavigate } from "react-router-dom";
import { Tabs, Tab, Box, Fade, Typography } from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

// Components
import Shape from "../components/Shape";
import Loader from "../components/Loader";
import "../styles/pages/Collections.css";
import "../styles/ContentScroller.css";

const Collections = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("haveRead");
  const scrollRef = useRef(null);

  // 1. Parallel Data Fetching (Look how clean this is now!)
  const [haveRead, readLater, favorites, following] = useQueries({
    queries: [
      {
        queryKey: ["coll", user?.uid, "haveRead"],
        queryFn: () => getBooksByStatus(user?.uid, "haveRead"),
        enabled: !!user?.uid,
      },
      {
        queryKey: ["coll", user?.uid, "readLater"],
        queryFn: () => getBooksByStatus(user?.uid, "readLater"),
        enabled: !!user?.uid,
      },
      {
        queryKey: ["coll", user?.uid, "favorites"],
        queryFn: () => getBooksByStatus(user?.uid, "favorites"),
        enabled: !!user?.uid,
      },
      {
        queryKey: ["coll", user?.uid, "following"],
        queryFn: () => authorServices.getFollowedAuthors(user?.uid),
        enabled: !!user?.uid,
      },
    ],
  });

  // 2. Prepare Data
  const collections = {
    haveRead: haveRead.data || [],
    readLater: readLater.data || [],
    favorites: favorites.data || [],
    following: following.data || [],
  };

  const activeBooks = collections[activeTab];

  // 3. Security Redirect
  useEffect(() => {
    if (!authLoading && !user) navigate("/signin");
  }, [user, authLoading, navigate]);

  // 4. Loading States
  if (
    authLoading ||
    haveRead.isLoading ||
    readLater.isLoading ||
    favorites.isLoading ||
    following.isLoading
  ) {
    return <Loader />;
  }

  return (
    <div className="collections-page">
      <div className="collections-header">
        <h1>Your Library</h1>
        <p>Your curated collection of dark mysteries and favorite reads.</p>
      </div>

      <Box
        className="tabs-container"
        sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}
      >
        <Tabs
          value={activeTab}
          onChange={(e, v) => setActiveTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTabs-indicator": { backgroundColor: "var(--accent-blue)" },
            "& .MuiTab-root": {
              color: "var(--text-secondary)",
              fontWeight: 600,
            },
            "& .Mui-selected": { color: "var(--text-primary) !important" },
          }}
        >
          <Tab
            value="haveRead"
            label={`Have Read (${collections.haveRead.length})`}
          />
          <Tab
            value="readLater"
            label={`Read Later (${collections.readLater.length})`}
          />
          <Tab
            value="favorites"
            label={`Favorites (${collections.favorites.length})`}
          />
          <Tab
            value="following"
            label={`Following (${collections.following.length})`}
          />
        </Tabs>
      </Box>

      {activeBooks.length > 0 ? (
        <Fade in={true} timeout={500} key={activeTab}>
          <div className="wrapper">
            {/* The BookScroller Style Layout */}
            <div
              className="content-scroll"
              ref={scrollRef}
              style={{
                display: "flex",
                gap: "20px",
                overflowX: "auto",
                padding: "10px 0",
              }}
            >
              {activeBooks.map((item, index) => (
                <Shape
                  // Dynamically assign circle for authors, square for books
                  shape={activeTab === "following" ? "circle" : "square"}
                  book={item} // Shape component universally translates 'book' into UI
                  key={item.book_id || item.id || `lib-item-${index}`}
                />
              ))}
            </div>
          </div>
        </Fade>
      ) : (
        <Fade in={true}>
          <div
            className="empty-collection"
            style={{ textAlign: "center", padding: "60px 20px" }}
          >
            <LibraryBooksIcon
              sx={{ fontSize: 64, color: "var(--border-subtle)", mb: 2 }}
            />
            <Typography
              variant="h5"
              sx={{ color: "var(--text-primary)", mb: 1 }}
            >
              It's quiet here...
            </Typography>

            {/* Contextual Empty State Messages */}
            <Typography sx={{ color: "var(--text-secondary)" }}>
              {activeTab === "following" ? (
                <>You aren't following any authors yet.</>
              ) : (
                <>
                  Add some thrills from the{" "}
                  <Link
                    to="/"
                    style={{
                      color: "var(--accent-blue)",
                      textDecoration: "none",
                    }}
                  >
                    Home
                  </Link>{" "}
                  page.
                </>
              )}
            </Typography>
          </div>
        </Fade>
      )}
    </div>
  );
};

export default Collections;

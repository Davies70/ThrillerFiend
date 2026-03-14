import "../styles/pages/HotBooks.css";
import { useQuery } from "@tanstack/react-query";
import bookServices from "../services/bookServices";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Shape from "../components/Shape";
import { Fade, Box, Typography } from "@mui/material";

const SimilarBooks = () => {
  const { id: bookTheme } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["similarBooks", bookTheme],
    queryFn: () => bookServices.getBooksByQuery(bookTheme),
    enabled: !!bookTheme,
  });

  if (isLoading) return <Loader />;

  // Graceful Error Handling
  if (isError) {
    return (
      <Box sx={{ p: 10, textAlign: "center" }}>
        <Typography variant="h5" color="text.primary">
          Something went wrong finding books for this theme.
        </Typography>
      </Box>
    );
  }

  // Capitalize the first letter of each word in the URL parameter for a premium look
  const formattedTheme = bookTheme
    ? bookTheme.replace(/\b\w/g, (c) => c.toUpperCase())
    : "Similar";

  // Prevent crashes if data is null/undefined
  const safeData = data || [];

  return (
    <Fade in={true} timeout={800}>
      <div className="grid-page-container">
        <header className="page-header">
          <h1>More {formattedTheme}s</h1>
          <p>Discover your next great read based on your interests.</p>
        </header>

        {safeData.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 5 }}>
            <Typography color="text.secondary">
              No books found for this theme right now.
            </Typography>
          </Box>
        ) : (
          <div className="shape-grid-container">
            {safeData.map((book) => (
              <Shape key={book.book_id || book.id} shape="square" book={book} />
            ))}
          </div>
        )}
      </div>
    </Fade>
  );
};

export default SimilarBooks;

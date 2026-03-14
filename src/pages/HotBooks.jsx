import "../styles/pages/HotBooks.css"; // Ensure it uses the new grid CSS!
import { useQuery } from "@tanstack/react-query";
import bookServices from "../services/bookServices";
import { Fade, Box, Typography } from "@mui/material";

// Components
import Loader from "../components/Loader";
import Shape from "../components/Shape";

const HotBooks = () => {
  const {
    data: hotbooks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["hotbooks"],
    queryFn: () => bookServices.getHotBooks(),
  });

  if (isLoading) return <Loader />;

  // Graceful Error Handling
  if (isError) {
    return (
      <Box sx={{ p: 10, textAlign: "center" }}>
        <Typography variant="h5" color="text.primary">
          Something went wrong fetching the hottest thrills.
        </Typography>
      </Box>
    );
  }

  // Prevent crashes if data is null/undefined
  const safeData = hotbooks || [];

  return (
    <Fade in={true} timeout={800}>
      <div className="grid-page-container">
        <header className="page-header">
          <h1>Thrills of the Week</h1>
          <p>The hottest, most spine-chilling reads trending right now.</p>
        </header>

        {safeData.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 5 }}>
            <Typography color="text.secondary">
              No hot books found this week. Check back later!
            </Typography>
          </Box>
        ) : (
          <div className="shape-grid-container">
            {safeData.map((book) => (
              <Shape
                key={book.book_id || book.id} // Better practice than using array index
                shape="square"
                isAuthorName={true}
                book={book}
              />
            ))}
          </div>
        )}
      </div>
    </Fade>
  );
};

export default HotBooks;

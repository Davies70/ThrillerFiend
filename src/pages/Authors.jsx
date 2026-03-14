import { useQuery } from "@tanstack/react-query";
import { Box, Typography, Fade } from "@mui/material";
import authorServices from "../services/authorServices";
import Shape from "../components/Shape";
import Loader from "../components/Loader";
import "../styles/pages/HotBooks.css"; // You can keep this name or rename it to GridPages.css later

const Authors = () => {
  const {
    data: authors,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["authors"],
    // Ensure we use the function that returns our mapped, local data
    queryFn: authorServices.getHotAuthors,
  });

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <Box sx={{ p: 10, textAlign: "center" }}>
        <Typography variant="h5" color="text.primary">
          Failed to load authors.
        </Typography>
      </Box>
    );
  }

  return (
    <Fade in={true} timeout={800}>
      <div className="grid-page-container">
        <header className="page-header">
          <h1>Masters of Suspense</h1>
          <p>Discover the brilliant minds behind your favorite nightmares.</p>
        </header>

        <div className="shape-grid-container">
          {authors?.map((author) => (
            <Shape
              key={author.book_id || author.id}
              book={author} // THE FIX: Shape now takes 'book' universally
              shape="circle"
            />
          ))}
        </div>
      </div>
    </Fade>
  );
};

export default Authors;

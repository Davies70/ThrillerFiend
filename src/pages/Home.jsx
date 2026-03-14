import { useQueries } from "@tanstack/react-query";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../context/AuthProvider";
import bookServices from "../services/bookServices";
import authorServices from "../services/authorServices";
import useReadingStatusCount from "../hooks/useReadingStatusCount";

// Components
import Banner from "../components/sections/Banner";
import PersonalizedBanner from "../components/sections/PersonalizedBanner";
import GridScroller from "../components/sections/GridScroller";
import BookScroller from "../components/sections/BookScroller";
import Loader from "../components/Loader";

const Home = () => {
  const { user } = useAuth();

  // 1. Unified Data Fetching
  const [hotBooksQuery, bestSellerQuery, hotAuthorsQuery] = useQueries({
    queries: [
      {
        queryKey: ["hotbooks"],
        queryFn: bookServices.getHotBooks,
        staleTime: 1000 * 60 * 60,
      },
      {
        queryKey: ["bestsellers"],
        queryFn: bookServices.getBestSellers,
        staleTime: 1000 * 60 * 60,
      },
      {
        queryKey: ["authors"],
        queryFn: authorServices.getHotAuthors,
      },
    ],
  });

  const {
    haveReadCount,
    readLaterCount,
    loading: counterLoading,
  } = useReadingStatusCount(user?.uid);

  // 2. Loading State Handling
  const isLoading =
    hotBooksQuery.isLoading ||
    bestSellerQuery.isLoading ||
    hotAuthorsQuery.isLoading ||
    counterLoading;

  if (isLoading) return <Loader />;

  // 3. Error State Handling
  const isError =
    hotBooksQuery.isError || bestSellerQuery.isError || hotAuthorsQuery.isError;

  if (isError) {
    return (
      <Box sx={{ p: 10, textAlign: "center" }}>
        <Typography variant="h5" color="text.primary">
          Library Connection Interrupted
        </Typography>
        <Typography color="text.secondary">
          Please refresh the page to reconnect to the bookshelves.
        </Typography>
      </Box>
    );
  }

  // 4. Safe Data Extraction
  const hotbooks = (hotBooksQuery.data || []).slice(0, 12);
  const bestSellers = bestSellerQuery.data || [];
  console.log(hotAuthorsQuery.data, "fetched authors");
  const hotAuthors = hotAuthorsQuery.data.slice(0, 12) || [];

  return (
    // REMOVED: MUI <Fade> wrapper to prevent IntersectionObserver conflicts
    // ADDED: Simple CSS animation string for a safe, smooth entrance
    <Box
      sx={{
        paddingBottom: "40px",
        maxWidth: "1200px",
        margin: "0 auto",
        px: 2,
        animation: "fadeIn 0.6s ease-in-out",
      }}
    >
      <style>
        {`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}
      </style>

      {/* Row 1: Authors */}
      <BookScroller
        data={hotAuthors}
        shape="circle"
        headerText="Hot Authors"
        isNavLink={true}
        navLink="/authors"
        isControls={true}
        isDataAvailable={hotAuthors.length > 0}
      />

      {/* Row 2: Promotional Banner */}
      {user ? (
        <PersonalizedBanner
          username={user.displayName || "Reader"}
          booksRead={haveReadCount || 0} // Fallback to 0 prevents PropTypes errors
          booksToRead={readLaterCount || 0}
        />
      ) : (
        <Banner />
      )}

      {/* Row 3: Standard Square Books */}
      <BookScroller
        data={hotbooks}
        shape="square"
        headerText="Thrills of the Week"
        isNavLink={true}
        navLink="/hotbooks"
        isControls={true}
        isDataAvailable={hotbooks.length > 0}
      />

      {/* Row 4: Large Grid Bestsellers */}
      <GridScroller
        data={bestSellers}
        isControls={true}
        headerText="All-Time Bestsellers"
      />
    </Box>
  );
};

export default Home;

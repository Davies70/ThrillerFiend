import Banner from '../components/sections/Banner';
import GridScroller from '../components/sections/GridScroller';
import BookScroller from '../components/sections/BookScroller';
import bookServices from '../services/bookServices';
import authorServices from '../services/authorServices';
import { useQueries } from '@tanstack/react-query';
import Loader from '../components/Loader';
import PersonalizedBanner from '../components/sections/PersonalizedBanner';
import { useAuth } from '../context/AuthProvider';
import { getReadLaterAndHaveReadCount } from '../services/userServices';

const Home = () => {
  const { user } = useAuth();
  const [hotBooksQuery, bestSellerQuery, hotAuthorsQuery, countQuery] =
    useQueries({
      queries: [
        {
          queryKey: ['hotbooks'],
          queryFn: bookServices.getHotBooks,
        },
        {
          queryKey: ['bestsellers'],
          queryFn: bookServices.getBestSellers,
        },
        {
          queryKey: ['authors'],
          queryFn: authorServices.getHotAuthors,
        },
        {
          queryKey: ['count'],
          queryFn: () => getReadLaterAndHaveReadCount(user.uid),
          enabled: !!user?.uid,
        },
      ],
    });

  if (
    hotBooksQuery.isLoading ||
    bestSellerQuery.isLoading ||
    hotAuthorsQuery.isLoading ||
    countQuery.isLoading
  ) {
    return <Loader />;
  }

  if (hotBooksQuery.isError) {
    return <div>Something went wrong with hotbooks</div>;
  }

  if (bestSellerQuery.isError) {
    return <div>Something went wrong with bestsellers</div>;
  }

  if (hotAuthorsQuery.isError) {
    return <div>Something went wrong with authors</div>;
  }

  if (countQuery.isError) {
    return <div>Something went wrong with count</div>;
  }

  const hotbooks = hotBooksQuery.data;
  const bestSellers = bestSellerQuery.data;
  const hotAuthors = hotAuthorsQuery.data;
  const { haveReadCount, readLaterCount } = countQuery.data;

  return (
    <div>
      <BookScroller
        data={hotAuthors}
        shape='circle'
        headerText='Hot Authors'
        isNavLink={true}
        navLink='/authors'
        isControls={true}
        isDataAvailable={true}
      />
      {user ? (
        <PersonalizedBanner
          username={user.displayName}
          booksRead={haveReadCount}
          booksToRead={readLaterCount}
          favoriteGenre='10'
        />
      ) : (
        <Banner />
      )}

      <BookScroller
        data={hotbooks}
        shape='square'
        headerText='Thrills of the Week'
        isNavLink={true}
        navLink='/weeklythrills'
        isAuthorName={true}
        isControls={true}
        isDataAvailable={false}
      />
      <GridScroller
        data={bestSellers}
        isControls={true}
        headerText='All-Time bestsellers'
      />
    </div>
  );
};

export default Home;

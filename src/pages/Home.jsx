import Banner from '../components/sections/Banner';
import GridScroller from '../components/sections/GridScroller';
import BookScroller from '../components/sections/BookScroller';
import bookServices from '../services/bookServices';
import authorServices from '../services/authorServices';
import { useQueries } from '@tanstack/react-query';
import Loader from '../components/Loader';

const Home = () => {
  const [hotBooksQuery, bestSellerQuery] = useQueries({
    queries: [
      {
        queryKey: ['hotbooks'],
        queryFn: bookServices.getHotBooks,
      },
      {
        queryKey: ['bestsellers'],
        queryFn: bookServices.getBestSellers,
      },
    ],
  });

  if (hotBooksQuery.isLoading || bestSellerQuery.isLoading) {
    return <Loader />;
  }

  if (hotBooksQuery.isError || bestSellerQuery.isError) {
    return <div>Something went wrong</div>;
  }

  const hotbooks = hotBooksQuery.data;
  const bestSellers = bestSellerQuery.data;

  return (
    <div>
      <BookScroller
        data={authorServices.getHotAuthors()}
        shape='circle'
        headerText='Hot Authors'
        isNavLink={true}
        navLink='/authors'
        isControls={true}
        isDataAvailable={true}
      />
      <Banner />
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

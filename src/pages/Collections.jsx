import BookScroller from '../components/sections/BookScroller';
import Loader from '../components/Loader';
import { useQueries } from '@tanstack/react-query';
import GridScroller from '../components/sections/GridScroller';
import authorServices from '../services/authorServices';
import { useAuth } from '../context/AuthProvider';
import {
  getReadLaters,
  getHaveReads,
  getFavorites,
} from '../services/userServices';
import '../styles/Collections.css';
import bookServices from '../services/bookServices';

const Collections = () => {
  // return <div>nothing</div>;
  const { user } = useAuth();

  const [
    followedAuthorsQuery,
    wantToReadQuery,
    haveReadQuery,
    latestBooksQuery,
    favoritesQuery,
  ] = useQueries({
    queries: [
      {
        queryKey: ['followedAuthors'],
        queryFn: () => authorServices.getFollowedAuthors(user.uid),
        enabled: !!user?.uid,
      },
      {
        queryKey: ['wantToRead'],
        queryFn: () => getReadLaters(user.uid),
        enabled: !!user?.uid,
      },
      {
        queryKey: ['haveRead'],
        queryFn: () => getHaveReads(user.uid),
        enabled: !!user?.uid,
      },
      {
        queryKey: ['latestBooksByAuthorUserFollows'],
        queryFn: () =>
          bookServices.getLatestBooksByAuthorsUserFollows(user.uid),
        enabled: !!user?.uid,
      },
      {
        queryKey: ['favorites'],
        queryFn: () => getFavorites(user.uid),
        enabled: !!user?.uid,
      },
    ],
  });

  if (
    followedAuthorsQuery.isLoading ||
    wantToReadQuery.isLoading ||
    haveReadQuery.isLoading ||
    latestBooksQuery.isLoading ||
    !user?.uid ||
    favoritesQuery.isLoading
  ) {
    return <Loader />;
  }

  if (followedAuthorsQuery.isError) {
    return <div>Something went wrong with followed authors</div>;
  }

  if (wantToReadQuery.isError) {
    return <div>Something went wrong with want to read</div>;
  }

  if (haveReadQuery.isError) {
    return <div>Something went wrong with have read</div>;
  }

  if (latestBooksQuery.isError) {
    return <div>Something went wrong with latest books</div>;
  }

  if (favoritesQuery.isError) {
    return <div>Something went wrong with favorites</div>;
  }

  const authorsYouFollow = followedAuthorsQuery.data ?? [];
  const wantToRead = wantToReadQuery.data ?? [];
  const haveRead = haveReadQuery.data ?? [];
  const latestBooks = latestBooksQuery.data ?? [];
  const favorites = favoritesQuery.data ?? [];

  return (
    <div className='collections'>
      <h1>Collections</h1>

      <BookScroller
        headerText={'Authors You Follow'}
        shape='circle'
        isControls={authorsYouFollow.length > 6}
        data={authorsYouFollow}
        isAuthorName
      />

      {latestBooks.length > 12 ? (
        <GridScroller
          data={latestBooks}
          headerText='Latest Books By Authors You Follow'
          isControls
        />
      ) : (
        <BookScroller
          headerText={'Latest Books By Authors You Follow'}
          shape='square'
          isControls={latestBooks.length > 6}
          data={latestBooks}
          isAuthorName
        />
      )}

      {wantToRead.length > 12 ? (
        <GridScroller data={wantToRead} headerText='Read Later' isControls />
      ) : (
        <BookScroller
          headerText={'Read Later'}
          shape='square'
          isControls={wantToRead.length > 6}
          data={wantToRead}
          isAuthorName
        />
      )}
      {haveRead.length > 12 ? (
        <GridScroller data={haveRead} headerText='Have Read' isControls />
      ) : (
        <BookScroller
          headerText={'Have Read'}
          shape='square'
          isControls={haveRead.length > 6}
          data={haveRead}
          isAuthorName
        />
      )}
      {favorites.length > 12 ? (
        <GridScroller data={favorites} headerText='Your Favorites' isControls />
      ) : (
        <BookScroller
          headerText={'Your Favorites'}
          shape='square'
          isControls={favorites.length > 6}
          data={favorites}
          isAuthorName
        />
      )}
    </div>
  );
};

export default Collections;

import BookScroller from '../components/sections/BookScroller';
import Loader from '../components/Loader';
import { useQueries } from '@tanstack/react-query';
import GridScroller from '../components/sections/GridScroller';
import authorServices from '../services/authorServices';
import { useAuth } from '../context/AuthProvider';
import { getReadLaters, getHaveReads } from '../services/userServices';

const Collections = () => {
  // return <div>nothing</div>;
  const { user } = useAuth();

  const [followedAuthorsQuery, wantToReadQuery, haveReadQuery] = useQueries({
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
    ],
  });

  if (
    followedAuthorsQuery.isLoading ||
    wantToReadQuery.isLoading ||
    haveReadQuery.isLoading
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

  const authorsYouFollow = followedAuthorsQuery.data ?? [];
  const wantToRead = wantToReadQuery.data ?? [];
  const haveRead = haveReadQuery.data ?? [];

  return (
    <div>
      <h1>Collections</h1>

      <BookScroller
        headerText={'Authors You Follow'}
        shape='circle'
        isControls={authorsYouFollow.length > 6}
        data={authorsYouFollow}
      />

      {wantToRead.length > 12 ? (
        <GridScroller data={wantToRead} />
      ) : (
        <BookScroller
          headerText={'Read Later'}
          shape='square'
          isControls={wantToRead.length > 6}
          data={wantToRead}
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
        />
      )}
    </div>
  );
};

export default Collections;

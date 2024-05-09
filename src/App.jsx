import Layout from './components/Layout';

function App() {
  // const URI = 'https://www.googleapis.com/books/v1';
  // const KEY = 'AIzaSyC-p9UR2MYRUH4ibfNJanhjCjoxa6WLJ2A';

  // const url = `${URI}/volumes?q=subject:thriller&key=` + KEY;
  // fetch(url)
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //     // Handle the response data here
  //   })
  //   .catch((error) => {
  //     console.error('There was a problem with the fetch operation:', error);
  //   });

  return (
    <>
      <Layout><div>children</div></Layout>
    </>
  );
}

export default App;

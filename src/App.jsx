import Layout from './components/Layout';
import HotAuthors from './components/sections/HotAuthors';
import Banner from './components/sections/Banner';

import './styles/App.css';

function App() {
  return (
    <>
      <Layout>
        <HotAuthors />
        <Banner />
      </Layout>
    </>
  );
}

export default App;

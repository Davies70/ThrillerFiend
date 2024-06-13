import Layout from './components/Layout';
import HotAuthors from './components/sections/HotAuthors';
import HotBooks from './components/sections/HotBooks';
import Banner from './components/sections/Banner';

import './styles/App.css';

function App() {
  return (
    <Layout>
      <HotAuthors />
      <Banner />
      <HotBooks />
    </Layout>
  );
}

export default App;

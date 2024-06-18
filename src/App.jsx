import Layout from './components/Layout';
import HotAuthors from './components/sections/HotAuthors';
import HotBooks from './components/sections/HotBooks';
import Banner from './components/sections/Banner';
import EasterEggs from './components/sections/EasterEggs';

import './styles/App.css';

function App() {
  return (
    <Layout>
      <HotAuthors />
      <Banner />
      <HotBooks />
      <EasterEggs />
    </Layout>
  );
}

export default App;

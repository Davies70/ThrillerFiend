import Layout from './components/Layout';
import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewThrills from './pages/NewThrills';
import Collections from './pages/Collections';
import NotFound from './pages/NotFound';

import './styles/App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new' element={<NewThrills />} />
          <Route path='/collections' element={<Collections />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

import Layout from './components/Layout';
import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewThrills from './pages/NewThrills';
import Collections from './pages/Collections';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import Author from './pages/Author';
import Book from './pages/Book';
import Books from './pages/Book';
import Authors from './pages/Authors';

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
          <Route path='/signin' element={<SignIn />} />
          <Route path='/author/:id' element={<Author />} />
          <Route path='/book/:id' element={<Book />} />
          <Route path='/books' element={<Books />} />
          <Route path='/authors' element={<Authors />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

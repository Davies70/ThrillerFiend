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

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    ochre: {
      main: '#E3D026',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    },
    blue: {
      main: '#25d1da',
      light: '#5ce3ed',
      dark: '#0ab9c7',
      contrastText: '#000000',
    },
    white: {
      main: '#ffffff',
      light: '#ffffff',
      dark: '#cccccc',
      contrastText: '#000000',
    },
  },
});

import './styles/App.css';

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </Router>
  );
}

export default App;

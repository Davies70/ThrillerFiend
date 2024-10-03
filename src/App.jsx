import Layout from './components/Layout';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FreeThrills from './pages/FreeThrills';
import Collections from './pages/Collections';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Author from './pages/Author';
import Book from './pages/Book';
import Books from './pages/Book';
import Authors from './pages/Authors';
import HotBooks from './pages/HotBooks';
import SimilarBooks from './pages/SimilarBooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './styles/theme';

import './styles/App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new' element={<FreeThrills />} />
              <Route path='/collections' element={<Collections />} />
              <Route path='*' element={<NotFound />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/author/:id' element={<Author />} />
              <Route path='/book/:id' element={<Book />} />
              <Route path='/books' element={<Books />} />
              <Route path='/authors' element={<Authors />} />
              <Route path='/hotbooks' element={<HotBooks />} />
              <Route path='/similarbooks/:id' element={<SimilarBooks />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;

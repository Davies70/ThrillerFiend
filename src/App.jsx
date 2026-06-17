import { Suspense, lazy } from "react";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme";
import Loader from "./components/Loader";

import "./styles/App.css";

const Home = lazy(() => import("./pages/Home"));
const FreeThrills = lazy(() => import("./pages/FreeThrills"));
const Collections = lazy(() => import("./pages/Collections"));
const NotFound = lazy(() => import("./pages/NotFound"));
const SignUp = lazy(() => import("./pages/SignUp"));
const SignIn = lazy(() => import("./pages/SignIn"));
const Author = lazy(() => import("./pages/Author"));
const Book = lazy(() => import("./pages/Book"));
const Authors = lazy(() => import("./pages/Authors"));
const HotBooks = lazy(() => import("./pages/HotBooks"));
const SimilarBooks = lazy(() => import("./pages/SimilarBooks"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<FreeThrills />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/author/:id" element={<Author />} />
                <Route path="/book/:id" element={<Book />} />
                <Route path="/books" element={<Book />} />
                <Route path="/authors" element={<Authors />} />
                <Route path="/hotbooks" element={<HotBooks />} />
                <Route path="/similarbooks/:id" element={<SimilarBooks />} />
              </Routes>
            </Suspense>
          </Layout>
        </ThemeProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;

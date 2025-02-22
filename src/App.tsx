import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home';
import { Admin } from './pages/Admin';
import Navigation from './components/Navigation';
import Container from '@mui/material/Container';
import BookList from './pages/book/BookList';
import BookCreate from './pages/book/BookCreate';
import { GithubConfigProvider } from './libs/hooks/github/GithubConfigProvider';

function App() {
  return (
    <Container>
      <GithubConfigProvider>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path='trainer'>
              <Route index element={<Home />} />
              <Route path='admin' element={<Admin />} />
              <Route path='books/create' element={<BookCreate />} />
              <Route path='books' element={<BookList />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </GithubConfigProvider>
    </Container>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home';
import { Admin } from './pages/Admin';
import Navigation from './components/Navigation';
import Error from './components/Error';
import Container from '@mui/material/Container';
import BookList from './pages/book/BookList';
import BookCreate from './pages/book/BookCreate';
import { GithubConfigProvider } from './libs/hooks/github/GithubConfigProvider';
import BookUpdate from './pages/book/BookUpdate';
import { ErrorProvider } from './libs/hooks/error/ErrorProvider';
import ChapterList from './pages/chapter/ChapterList';
import ChapterCreate from './pages/chapter/ChapterCreate';
import ChapterUpdate from './pages/chapter/ChapterUpdate';

function App() {
  return (
    <Container>
      <ErrorProvider>
        <GithubConfigProvider>
          <BrowserRouter>
            <Navigation />
            <Error />
            <Routes>
              <Route path='trainer'>
                <Route index element={<Home />} />
                <Route path='admin' element={<Admin />} />
                <Route path='books/create' element={<BookCreate />} />
                <Route path='books/update/:id' element={<BookUpdate />} />
                <Route path='books' element={<BookList />}></Route>
                <Route
                  path='book/:bookId/create'
                  element={<ChapterCreate />}
                ></Route>
                <Route
                  path='book/:bookId/update/:id'
                  element={<ChapterUpdate />}
                ></Route>
                <Route
                  path='book/:bookId/chapters'
                  element={<ChapterList />}
                ></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </GithubConfigProvider>
      </ErrorProvider>
    </Container>
  );
}

export default App;

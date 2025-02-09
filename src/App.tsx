import { ConfigContext } from './components/ConfigContext';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home';
import { Admin } from './pages/Admin';
import Navigation from './components/Navigation';
import Container from '@mui/material/Container';
import { useConfig } from './libs/hooks/useConfig';
import BookList from './pages/book/BookList';
import BookCreate from './pages/book/BookCreate';

function App() {
  const config = useConfig();

  return (
    <Container>
      <ConfigContext.Provider value={config}>
        {config.config.user !== '' ? (
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
        ) : (
          <Admin />
        )}
      </ConfigContext.Provider>
    </Container>
  );
}

export default App;

import { ConfigContext } from './components/ConfigContext';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home';
import { Admin } from './pages/Admin';
import Navigation from './components/Navigation';
import Container from '@mui/material/Container';
import { useConfig } from './libs/hooks/useConfig';

function App() {
  const config = useConfig();

  return (
    <Container>
      <ConfigContext.Provider value={config}>
        {config.config.user !== '' ? (
          <BrowserRouter>
            <Navigation />
            <Routes>
              <Route index element={<Home />} />
              <Route path='admin' element={<Admin />} />
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

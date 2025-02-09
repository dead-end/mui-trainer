import Home from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SettingsIcon from '@mui/icons-material/Settings';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router';

const Navigation = () => {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 4 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>
            Mui Trainer
          </Typography>
          <Button component={Link} to='/trainer' color='inherit'>
            <Home />
          </Button>
          <Button component={Link} to='/trainer/books' color='inherit'>
            <MenuBookIcon />
          </Button>
          <Button component={Link} to='/trainer/admin' color='inherit'>
            <SettingsIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navigation;

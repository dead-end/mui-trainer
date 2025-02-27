import { useError } from '../libs/hooks/error/useError';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ErrorIcon from '@mui/icons-material/Error';
import ListItemIcon from '@mui/material/ListItemIcon';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const Error = () => {
  const { error, clearError } = useError();

  const list = error.map((e, idx) => (
    <ListItem key={idx}>
      <ListItemIcon>
        <ErrorIcon color='error' />
      </ListItemIcon>
      <Typography variant='body1'>{e}</Typography>
    </ListItem>
  ));

  return (
    <Dialog open={error.length > 0}>
      <DialogTitle sx={{ paddingX: 4, paddingY: 4 }} color='error'>
        Errors
      </DialogTitle>
      <DialogContent dividers>
        <List>{list}</List>
      </DialogContent>
      <DialogActions sx={{ paddingX: 4, paddingY: 4 }}>
        <Button variant='contained' color='error' onClick={clearError}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Error;

import { useError } from '../libs/hooks/error/useError';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ErrorIcon from '@mui/icons-material/Error';
import ListItemIcon from '@mui/material/ListItemIcon';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import ListItemText from '@mui/material/ListItemText';

const Error = () => {
  const { error, clearError } = useError();

  const list = error.map((e, idx) => (
    <ListItem key={idx}>
      <ListItemIcon>
        <ErrorIcon color='error' />
      </ListItemIcon>
      <ListItemText>{e}</ListItemText>
    </ListItem>
  ));

  return (
    <Dialog open={error.length > 0}>
      <DialogTitle color='error'>Error</DialogTitle>
      <DialogContent>
        <DialogContentText>List of errors found so far!</DialogContentText>
        <List>{list}</List>
      </DialogContent>
      <DialogActions>
        <Button color='error' onClick={clearError}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Error;

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type TProps<T> = {
  title: string;
  message: string;
  confirm: T | undefined;
  setConfirm: React.Dispatch<React.SetStateAction<T | undefined>>;
  confirmFct: () => void;
};

const Confirmation = <T,>({
  title,
  message,
  confirm,
  setConfirm,
  confirmFct,
}: TProps<T>) => {
  const onOk = () => {
    confirmFct();
    setConfirm(undefined);
  };

  const onCancel = () => {
    setConfirm(undefined);
  };

  return (
    <Dialog open={confirm !== undefined}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onOk} autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirmation;

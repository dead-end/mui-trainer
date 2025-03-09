import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type TProps<T> = {
  title: string;
  message: string;
  confirmValue: T | undefined;
  setConfirmValue: React.Dispatch<React.SetStateAction<T | undefined>>;
  confirmFct: (value: T) => Promise<void>;
};

const Confirmation = <T,>({
  title,
  message,
  confirmValue: confirmValue,
  setConfirmValue: setConfirmValue,
  confirmFct,
}: TProps<T>) => {
  const onOk = () => {
    if (confirmValue) {
      confirmFct(confirmValue).then(() => setConfirmValue(undefined));
    }
  };

  const onCancel = () => {
    setConfirmValue(undefined);
  };

  return (
    <Dialog open={confirmValue !== undefined}>
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

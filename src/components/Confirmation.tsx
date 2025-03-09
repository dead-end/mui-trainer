import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type TProps = {
  title: string;
  message: string;
  confirm: boolean;
  setConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  confirmFct: () => void;
};

const Confirmation = ({
  title,
  message,
  confirm,
  setConfirm,
  confirmFct,
}: TProps) => {
  const onOk = () => {
    confirmFct();
    setConfirm(false);
  };

  const onCancel = () => {
    setConfirm(false);
  };

  return (
    <Dialog open={confirm}>
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

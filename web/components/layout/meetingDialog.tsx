import { Meeting } from '@/utils/types';
import { Dialog, DialogContent, Typography, DialogTitle } from '@mui/material';

interface MeetingDialogProps {
  open: boolean;
  onClose: () => void;
  meeting: Meeting;
}

export default function MeetingDialog({
  open,
  onClose,
  meeting,
}: MeetingDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Detalles de la reunión</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{meeting.client.name}</Typography>
      </DialogContent>
    </Dialog>
  );
}

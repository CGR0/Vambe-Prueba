import { Meeting } from '@/utils/types';
import {
  Dialog,
  DialogContent,
  Typography,
  DialogTitle,
  Tab,
  Tabs,
} from '@mui/material';
import MeetingInfo from './dialogs/meetingInfo';
import { useState } from 'react';
import TranscriptionInfo from './dialogs/transcriptionInfo';
import AnalizedInfo from './dialogs/analizedInfo';
import CloseIcon from '@mui/icons-material/Close';
import CustomIconButton from '../ui/customIconButton';

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
  const [selectedTab, setSelectedTab] = useState<
    'meeting' | 'transcription' | 'analized'
  >('meeting');

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <div className="flex justify-between items-center">
          <Typography variant="h4" className="text-center flex-grow">
            Detalles de la reunión
          </Typography>
          <CustomIconButton
            icon={<CloseIcon />}
            onClick={onClose}
            color="error"
          />
        </div>
        <Tabs
          value={selectedTab}
          onChange={(e, value) => setSelectedTab(value)}
          className="w-full"
          variant="fullWidth"
          centered
        >
          <Tab label="Reunión" value="meeting" />
          <Tab label="Transcripción" value="transcription" />
          <Tab label="Analizado" value="analized" />
        </Tabs>
      </DialogTitle>
      <DialogContent>
        {selectedTab === 'meeting' && <MeetingInfo meeting={meeting} />}
        {selectedTab === 'transcription' && (
          <TranscriptionInfo meeting={meeting} />
        )}
        {selectedTab === 'analized' && <AnalizedInfo meeting={meeting} />}
      </DialogContent>
    </Dialog>
  );
}

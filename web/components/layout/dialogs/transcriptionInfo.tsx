import { Meeting } from '../../../utils/types';

export default function TranscriptionInfo({ meeting }: { meeting: Meeting }) {
  return (
    <div>
      <p className="text-justify">{meeting.transcription.transcription}</p>
    </div>
  );
}

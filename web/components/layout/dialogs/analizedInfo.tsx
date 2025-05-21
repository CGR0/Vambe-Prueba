import DialogAttribute from '../../ui/dialogAttribute';
import { Meeting } from '../../../utils/types';

export default function AnalizedInfo({ meeting }: { meeting: Meeting }) {
  return (
    <div className="flex flex-col gap-4">
      <DialogAttribute
        title="Línea de negocio"
        value={meeting.transcription.business_line || 'No especificado'}
      />
      <DialogAttribute
        title="Etapa del negocio"
        value={meeting.transcription.business_stage || 'No especificado'}
      />
      <DialogAttribute
        title="Consultas diarias"
        value={meeting.transcription.daily_consultations || 'No especificado'}
      />
      <DialogAttribute
        title="Cómo llegó a Vambe"
        value={meeting.transcription.how_came_to_vambe || 'No especificado'}
      />
      <DialogAttribute
        title="Problema"
        value={
          meeting.transcription.problem
            ? meeting.transcription.problem.charAt(0).toUpperCase() +
              meeting.transcription.problem.slice(1) +
              '.'
            : 'No especificado'
        }
      />
      <DialogAttribute
        title="Motivos"
        value={
          meeting.transcription.reasons
            ? meeting.transcription.reasons.charAt(0).toUpperCase() +
              meeting.transcription.reasons.slice(1) +
              '.'
            : 'No especificado'
        }
      />
      <DialogAttribute
        title="Expectativas"
        value={
          meeting.transcription.expectations
            ? meeting.transcription.expectations.charAt(0).toUpperCase() +
              meeting.transcription.expectations.slice(1) +
              '.'
            : 'No especificado'
        }
      />
    </div>
  );
}

import DialogAttribute from '../../ui/dialogAttribute';
import { Meeting } from '../../../utils/types';

export default function MeetingInfo({ meeting }: { meeting: Meeting }) {
  return (
    <div className="flex flex-col gap-4">
      <DialogAttribute
        title="Fecha de la reunión"
        value={meeting.date.toString().split('T')[0]}
      />
      <DialogAttribute title="Nombre del cliente" value={meeting.client.name} />
      <DialogAttribute title="Email del cliente" value={meeting.client.email} />
      <DialogAttribute
        title="Teléfono del cliente"
        value={meeting.client.phone}
      />
      <DialogAttribute title="Vendedor asignado" value={meeting.seller.name} />
    </div>
  );
}

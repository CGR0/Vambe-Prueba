'use client';

import { useContext, useEffect, useState } from 'react';
import { DataContext } from '@/hooks/dataContext';
import {
  Paper,
  Table,
  TableContainer,
  TableBody,
  TablePagination,
} from '@mui/material';
import CustomHeader from '../ui/table/customHeader';
import CustomRow from '../ui/table/customRow';
import CustomIconButton from '../ui/customIconButton';
import { InfoOutlined } from '@mui/icons-material';
import { Meeting } from '@/utils/types';
import MeetingDialog from './meetingDialog';

export default function MeetingsTable() {
  const context = useContext(DataContext);
  if (!context) return null;
  const { filteredData } = context;

  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [data, setData] = useState<Meeting[]>(
    filteredData.meetings.slice(0, 5),
  );
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const handleClose = () => {
    setOpen(false);
    setSelectedMeeting(null);
  };

  useEffect(() => {
    setData(filteredData.meetings.slice(page * 5, (page + 1) * 5));
  }, [page]);

  useEffect(() => {
    setData(filteredData.meetings.slice(page * 5, (page + 1) * 5));
    setPage(0);
  }, [filteredData]);

  return (
    <div className="flex flex-col gap-4" style={{ width: '100%' }}>
      <TableContainer component={Paper}>
        <Table>
          <CustomHeader
            titles={[
              'Fecha',
              'Nombre del cliente',
              'Email del cliente',
              'Teléfono del cliente',
              'Vendedor asignado',
              'Cierre de la venta',
              'Más detalles',
            ]}
          />
          <TableBody>
            {data.map((meeting) => (
              <CustomRow
                key={meeting.id}
                data={[
                  meeting.date.toString().split('T')[0],
                  meeting.client.name,
                  meeting.client.email,
                  meeting.client.phone,
                  meeting.seller.name,
                  meeting.closed ? 'Si' : 'No',
                  <CustomIconButton
                    icon={<InfoOutlined />}
                    onClick={() => {
                      setSelectedMeeting(meeting);
                      setOpen(true);
                    }}
                  />,
                ]}
              />
            ))}
          </TableBody>
        </Table>
        {selectedMeeting && (
          <MeetingDialog
            open={open}
            onClose={handleClose}
            meeting={selectedMeeting}
          />
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={filteredData.meetings.length}
        rowsPerPage={5}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
      />
    </div>
  );
}

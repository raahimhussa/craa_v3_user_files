import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Card,
} from '@mui/material';

import Assessment from 'src/models/assessment';
import Finding from 'src/models/finding';
import Note from 'src/models/note';
import compose from '@shopify/react-compose';
import { observer } from 'mobx-react';
import withFind from 'src/hocs/withFind';

const MonitoringNotesView = ({
  notes,
  findings,
}: {
  notes: Note[];
  findings: Finding[];
}) => {
  return (
    <Box>
      <Typography sx={{ fontWeight: 700, mb: 0.5, mt: 4 }}>
        Monitoring Notes
      </Typography>
      <Card className="preview_card">
        <Table className="preview_table">
          <TableHead>
            <TableCell>Create Order</TableCell>
            <TableCell>Document</TableCell>
            <TableCell>Monitoring Note</TableCell>
            <TableCell>Non-Error Comment</TableCell>
          </TableHead>
          <TableBody>
            {notes.map((note, index) => {
              if (note.type === 'compliance') return null;
              return (
                <TableRow key={note._id}>
                  <TableCell width={'5%'}>{index + 1}</TableCell>
                  <TableCell width={'15%'}>
                    {note.viewport?.simDoc?.title}
                  </TableCell>
                  <TableCell width={'60%'}>{note.text}</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </Box>
  );
};

export default compose<any>(
  withFind({
    collectionName: 'notes',
    version: 2,
    getFilter: (props: any) => ({
      'viewport.userSimulationId': props.userSimulationId,
    }),
  })
)(observer(MonitoringNotesView));

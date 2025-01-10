import { Box, Paper, Table, TableCell, TableRow, Card } from '@mui/material';

import Assessment from 'src/models/assessment';
import User from 'src/models/user';
import UserSimulation from 'src/models/userSimulation';
import compose from '@shopify/react-compose';
import { observer } from 'mobx-react';
import withFindOne from 'src/hocs/withFindOne';
import { Typography } from '@components';
import { useEffect } from 'react';
import moment from 'moment';
import { Utils } from '@utils'

const UserInfoView = ({
  user,
  countries,
  userSimulation,
  simulations,
}: {
  user: User;
  countries: any[];
  userSimulation: UserSimulation;
  simulations: any[];
}) => {
  const usage = Utils.convert(userSimulation.usageTime, 'astr')

  return (
    <Box>
      <Typography sx={{ fontWeight: 700, mb: 0.5 }}>User info</Typography>
      <Card className="preview_card" sx={{ width: '40%' }}>
        <Table className="preview_table">
          <TableRow>
            <TableCell className="title">Name</TableCell>
            <TableCell>{user.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="title">Country</TableCell>
            <TableCell>
              {
                countries.find(
                  //@ts-ignore
                  (_country) => _country._id === user.profile?.countryId
                )?.name
              }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="title">Simulation</TableCell>
            <TableCell>
              {/* {userSimulationId && 'baseline'}
            {userSimulationId && 'followup'} */}
              {
                simulations.find((s: any) => s._id === userSimulation.simulationId).name
              }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="title">Date Complete</TableCell>
            <TableCell>
            {userSimulation.submittedAt
                  ? moment(userSimulation.submittedAt).format(
                      'MM-DD-YYYY hh:mm:ss'
                    )
                  : null}              
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="title">Time to Complete</TableCell>
            <TableCell>
            {usage.hours}:{usage.minutes}:{usage.seconds}  
            </TableCell>
          </TableRow>
        </Table>
      </Card>
    </Box>
  );
};
export default compose<any>(
  withFindOne({
    collectionName: 'users',
    getFilter: ({ userId }: { userId: string }) => ({
      _id: userId,
    }),
  })
  // withFindOne({
  //   collectionName: 'userSimulations',
  //   getFilter: ({ userSimulationId }: { userSimulationId: string }) => ({
  //     _id: userSimulationId,
  //   }),
  // }),
  // withFindOne({
  //   collectionName: 'userSimulations',
  //   getFilter: ({ userSimulationId }: { userSimulationId: string }) => ({
  //     _id: userSimulationId,
  //   }),
  // })
)(observer(UserInfoView));

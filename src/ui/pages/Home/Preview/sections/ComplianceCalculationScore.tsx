import {
  Box,
  Card,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import Assessment from 'src/models/assessment';
import compose from '@shopify/react-compose';
import { observer } from 'mobx-react';
import withFindOne from 'src/hocs/withFindOne';
import { withFind } from '@hocs';
import Note from 'src/models/note';
import { useEffect, useState } from 'react';
import customTheme from 'src/ui/theme/customizedTheme';

const ComplianceCalculationScoreView = ({ notes }: { notes: Note[] }) => {
  const [study, setStudy] = useState({
    nop: { correct: 0, incorrect: 0 },
    nosh: { correct: 0, incorrect: 0 },
    percent: { correct: 0, incorrect: 0 },
  });
  const [rescue, setRescue] = useState({ correct: 0, incorrect: 0 });
  console.log(notes);

  function getSummary() {
    let studyObj = {
      nop: { correct: 0, incorrect: 0 },
      nosh: { correct: 0, incorrect: 0 },
      percent: { correct: 0, incorrect: 0 },
    };
    let rescueObj = { correct: 0, incorrect: 0 };
    notes.map(async (note) => {
      //study medication
      if (note.complianceNote.percent !== '') {
        Number(note.complianceNote.taken) ===
        note.viewport?.simDoc?.numberOfPillsTakenBySubject
          ? studyObj.nop.correct++
          : studyObj.nop.incorrect++;
        Number(note.complianceNote.shouldTaken) ===
        note.viewport?.simDoc?.numberOfPillsPrescribed
          ? studyObj.nosh.correct++
          : studyObj.nosh.incorrect++;
        Number(note.complianceNote.percent) ===
        Number(
          (
            (note.viewport?.simDoc?.numberOfPillsTakenBySubject! /
              note.viewport?.simDoc?.numberOfPillsPrescribed!) *
            100
          ).toFixed(0)
        )
          ? studyObj.percent.correct++
          : studyObj.percent.incorrect++;
      } else {
        Number(note.complianceNote.taken) ===
        note.viewport?.simDoc?.numberOfPillsTakenBySubject
          ? rescueObj.correct++
          : rescueObj.incorrect++;
      }
      setStudy(studyObj);
      setRescue(rescueObj);
    });
  }

  useEffect(() => {
    getSummary();
  }, []);

  return (
    <>
      {notes.length !== 0 ? (
        <Box>
          <Typography sx={{ fontWeight: 700, mb: 0.5, mt: 4 }}>
            Compliance Calculation Score
          </Typography>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mt: 2,
            }}
          >
            <Box sx={{ width: '49%' }}>
              <Typography sx={{ fontWeight: 700, mb: 1, fontSize: '14.5px' }}>
                Summary
              </Typography>
              <Card className="preview_card">
                <Table className="preview_table">
                  <TableHead>
                    <TableCell width={'50%'}>Study Drug</TableCell>
                    <TableCell>% Correct</TableCell>
                    <TableCell>Correct</TableCell>
                    <TableCell>Incorrect</TableCell>
                    <TableCell>Total</TableCell>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Number of pills taken by subject</TableCell>
                      <TableCell>
                        {(
                          (study.nop.correct /
                            (study.nop.correct + study.nop.incorrect)) *
                          100
                        ).toFixed(0)}
                        %
                      </TableCell>
                      <TableCell>{study.nop.correct}</TableCell>
                      <TableCell>{study.nop.incorrect}</TableCell>
                      <TableCell>
                        {study.nop.correct + study.nop.incorrect}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        Number of pills that should have been taken by subject
                      </TableCell>
                      <TableCell>
                        {(isNaN(
                          (study.nosh.correct /
                            (study.nosh.correct + study.nosh.incorrect)) *
                            100
                        )
                          ? 0
                          : (study.nosh.correct /
                              (study.nosh.correct + study.nosh.incorrect)) *
                            100
                        ).toFixed(0)}
                        %
                      </TableCell>
                      <TableCell>{study.nosh.correct}</TableCell>
                      <TableCell>{study.nosh.incorrect}</TableCell>
                      <TableCell>
                        {study.nosh.correct + study.nosh.incorrect}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Percent(%) Compliance</TableCell>
                      <TableCell>
                        {(isNaN(
                          (study.percent.correct /
                            (study.percent.correct + study.percent.incorrect)) *
                            100
                        )
                          ? 0
                          : (study.percent.correct /
                              (study.percent.correct +
                                study.percent.incorrect)) *
                            100
                        ).toFixed(0)}
                        %
                      </TableCell>
                      <TableCell>{study.percent.correct}</TableCell>
                      <TableCell>{study.percent.incorrect}</TableCell>
                      <TableCell>
                        {study.percent.correct + study.percent.incorrect}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>
              <Card className="preview_card" sx={{ mt: 2 }}>
                <Table className="preview_table">
                  <TableHead>
                    <TableCell width={'50%'}>Rescue Medication</TableCell>
                    <TableCell>% Correct</TableCell>
                    <TableCell>Correct</TableCell>
                    <TableCell>Incorrect</TableCell>
                    <TableCell>Total</TableCell>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Number of pills taken by subject</TableCell>
                      <TableCell>
                        {(isNaN(
                          (rescue.correct /
                            (rescue.correct + rescue.incorrect)) *
                            100
                        )
                          ? 0
                          : (rescue.correct /
                              (rescue.correct + rescue.incorrect)) *
                            100
                        ).toFixed(0)}
                        %
                      </TableCell>
                      <TableCell>{rescue.correct}</TableCell>
                      <TableCell>{rescue.incorrect}</TableCell>
                      <TableCell>{rescue.correct + rescue.incorrect}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>
            </Box>
            <Box sx={{ width: '49%' }}>
              <Typography sx={{ fontWeight: 700, mb: 1, fontSize: '14.5px' }}>
                Details
              </Typography>
              <Card className="preview_card">
                <Table className="preview_table">
                  <TableHead>
                    <TableCell>Calculation</TableCell>
                    <TableCell>Result</TableCell>
                    <TableCell>CRA Input</TableCell>
                    <TableCell>Answer Key</TableCell>
                  </TableHead>
                  <TableBody>
                    {notes.map((note) => {
                      return note.viewport?.simDoc?.kind ===
                        'StudyMedication' ? (
                        <>
                          <TableRow>
                            <TableCell
                              colSpan={4}
                              sx={{
                                bgcolor: '#cccccc',
                                fontWeight: 700,
                              }}
                            >
                              {note.viewport?.simDoc?.title}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Number of pills taken by subject
                            </TableCell>
                            <TableCell
                              sx={{
                                bgcolor:
                                  Number(note.complianceNote.taken) ===
                                  note.viewport?.simDoc
                                    ?.numberOfPillsTakenBySubject
                                    ? customTheme.craa?.palette.green
                                    : customTheme.craa?.palette.red,
                                color: 'white',
                                fontWeight: 500,
                              }}
                            >
                              {Number(note.complianceNote.taken) ===
                              note.viewport?.simDoc?.numberOfPillsTakenBySubject
                                ? 'Correct'
                                : 'Incorrect'}
                            </TableCell>
                            <TableCell>{note.complianceNote.taken}</TableCell>
                            <TableCell>
                              {
                                note.viewport?.simDoc
                                  ?.numberOfPillsTakenBySubject
                              }
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Number of pills that should have been taken by
                              subject
                            </TableCell>
                            <TableCell
                              sx={{
                                bgcolor:
                                  Number(note.complianceNote.shouldTaken) ===
                                  note.viewport?.simDoc?.numberOfPillsPrescribed
                                    ? customTheme.craa?.palette.green
                                    : customTheme.craa?.palette.red,
                                color: 'white',
                                fontWeight: 500,
                              }}
                            >
                              {Number(note.complianceNote.shouldTaken) ===
                              note.viewport?.simDoc?.numberOfPillsPrescribed
                                ? 'Correct'
                                : 'Incorrect'}
                            </TableCell>
                            <TableCell>
                              {note.complianceNote.shouldTaken}
                            </TableCell>
                            <TableCell>
                              {note.viewport?.simDoc?.numberOfPillsPrescribed}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Percent(%) Compliance</TableCell>
                            <TableCell
                              sx={{
                                bgcolor:
                                  note.complianceNote.percent ===
                                  (
                                    (note.viewport?.simDoc
                                      ?.numberOfPillsTakenBySubject! /
                                      note.viewport?.simDoc
                                        ?.numberOfPillsPrescribed!) *
                                    100
                                  ).toFixed(0)
                                    ? customTheme.craa?.palette.green
                                    : customTheme.craa?.palette.red,
                                color: 'white',
                                fontWeight: 500,
                              }}
                            >
                              {note.complianceNote.percent ===
                              (isNaN(
                                (note.viewport?.simDoc
                                  ?.numberOfPillsTakenBySubject! /
                                  note.viewport?.simDoc
                                    ?.numberOfPillsPrescribed!) *
                                  100
                              )
                                ? 0
                                : (note.viewport?.simDoc
                                    ?.numberOfPillsTakenBySubject! /
                                    note.viewport?.simDoc
                                      ?.numberOfPillsPrescribed!) *
                                  100
                              ).toFixed(0)
                                ? 'Correct'
                                : 'Incorrect'}
                            </TableCell>
                            <TableCell>
                              {note.complianceNote.percent}%
                            </TableCell>
                            <TableCell>
                              {(isNaN(
                                (note.viewport?.simDoc
                                  ?.numberOfPillsTakenBySubject! /
                                  note.viewport?.simDoc
                                    ?.numberOfPillsPrescribed!) *
                                  100
                              )
                                ? 0
                                : (note.viewport?.simDoc
                                    ?.numberOfPillsTakenBySubject! /
                                    note.viewport?.simDoc
                                      ?.numberOfPillsPrescribed!) *
                                  100
                              ).toFixed(0)}
                              %
                            </TableCell>
                          </TableRow>
                        </>
                      ) : (
                        <>
                          <TableRow>
                            <TableCell
                              colSpan={4}
                              sx={{
                                bgcolor: '#cccccc',
                                fontWeight: 700,
                              }}
                            >
                              {note.viewport?.simDoc?.title}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Number of pills taken by subject
                            </TableCell>
                            <TableCell
                              sx={{
                                bgcolor:
                                  Number(note.complianceNote.taken) ===
                                  note.viewport?.simDoc
                                    ?.numberOfPillsTakenBySubject
                                    ? customTheme.craa?.palette.green
                                    : customTheme.craa?.palette.red,
                                color: 'white',
                                fontWeight: 500,
                              }}
                            >
                              {Number(note.complianceNote.taken) ===
                              note.viewport?.simDoc?.numberOfPillsTakenBySubject
                                ? 'Correct'
                                : 'Incorrect'}
                            </TableCell>
                            <TableCell>{note.complianceNote.taken}</TableCell>
                            <TableCell>
                              {
                                note.viewport?.simDoc
                                  ?.numberOfPillsTakenBySubject
                              }
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                  </TableBody>
                </Table>
              </Card>
            </Box>
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};
export default compose<any>(
  withFind({
    collectionName: 'notes',
    version: 2,
    getFilter: ({
      userId,
      userSimulationId,
    }: {
      userId: string;
      userSimulationId: string;
    }) => ({
      'viewport.userSimulationId': userSimulationId,
      type: 'compliance',
      userId: userId,
    }),
  })
)(observer(ComplianceCalculationScoreView));

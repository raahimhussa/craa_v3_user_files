import {
  Box,
  Button,
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import MouseIcon from '@mui/icons-material/Mouse';
import Answer from 'src/models/answer';
import Assessment from 'src/models/assessment';
import Domain from 'src/models/domain';
import Finding from 'src/models/finding';
import SimDoc from 'src/models/simDoc';
import UserSimulation from 'src/models/userSimulation';
import assessment from 'src/models/assessment';
import compose from '@shopify/react-compose';
import { observer } from 'mobx-react';
import { withFind } from '@hocs';
import withFindOne from 'src/hocs/withFindOne';
import { useEffect, useState } from 'react';
import axios from 'axios';

const UnidentifiedFindingsView = ({
  userSimulation,
  answers,
  findings,
  simDocs,
  domains,
  logs,
}: {
  userSimulation: UserSimulation;
  answers: Answer[];
  findings: Finding[];
  simDocs: SimDoc[];
  domains: Domain[];
  logs: any;
}) => {
  const severity = ['Critical', 'Major', 'Minor'];
  const [isViewKey, setIsVeiwKey] = useState(false);
  console.log(findings);

  return (
    <Box>
      <Typography sx={{ fontWeight: 700, mb: 0.5, mt: 4 }}>
        Unidentified Findings
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mt: 2,
          mb: 1.5,
        }}
      >
        <Button
          variant="contained"
          sx={{
            p: '0.1rem 0.5rem !important',
            boxShadow: 'none !important',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: '6px !important',
            display: 'flex',
            alignItems: 'center',
            mr: 0.5,
          }}
          onClick={() => {
            setIsVeiwKey(!isViewKey);
          }}
        >
          <MouseIcon
            sx={{
              fontSize: 15,
              mr: 0.5,
            }}
          />
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 700,
            }}
          >
            Click here
          </Typography>
        </Button>
        <Typography
          sx={{
            fontSize: '14px',
          }}
        >
          to view <b>key monitoring concepts</b> that were <b>missed</b> in the
          simulation.
        </Typography>
      </Box>
      <Card className="preview_card">
        <Table
          className="preview_table"
          id={'preview-unidentifiedfindings-table'}
        >
          <TableHead>
            <TableRow>
              <TableCell className="preview-head-cell">
                Findings Not Identified
              </TableCell>
              <TableCell className="preview-head-cell">Severity</TableCell>
              <TableCell className="preview-head-cell">Domain</TableCell>
              <TableCell className="preview-head-cell">Document 1</TableCell>
              <TableCell className="preview-head-cell">Document 2</TableCell>
              <TableCell className="preview-head-cell">Document 3</TableCell>
              <TableCell className="preview-head-cell">Evaluation</TableCell>
              <TableCell className="preview-head-cell">Relevant CFR</TableCell>
              <TableCell className="preview-head-cell">
                Relevant ICH-GCP
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userSimulation.results?.notIdentifiedAnswers?.map(
              (answer: any) => {
                const notIdentifiedFindings = findings.filter((_finding) => {
                  if (_finding._id === answer?.findingId) return _finding;
                }) as Finding[];
                console.log(notIdentifiedFindings);
                let duration = 0;
                let isEvaluated = 'Not compared';
                logs.map((log: any, index: any) => {
                  if (notIdentifiedFindings[0]?.simDocIds.length < 2) {
                    isEvaluated = 'N/A';
                    return;
                  }
                  let isViewed = true;
                  let simDocIds: string[] = [];
                  log.viewports.map((viewport: any) => {
                    simDocIds.push(viewport.simDoc?._id);
                  });
                  notIdentifiedFindings[0]?.simDocIds.map((simdocId) => {
                    if (!isViewed) {
                      return;
                    }
                    if (!simDocIds.includes(simdocId)) {
                      isViewed = false;
                    }
                  });
                  if (isViewed) {
                    for (let i = index + 1; i < logs.length; i++) {
                      if (
                        log.viewports[0]?.simDoc?._id !==
                          logs[i].viewports[0]?.simDoc?._id &&
                        log.viewports[1]?.simDoc?._id !==
                          logs[i].viewports[1]?.simDoc?._id &&
                        (notIdentifiedFindings[0]?.simDocIds.length === 3
                          ? log.viewports[2]?.simDoc?._id !==
                            logs[i].viewports[2]?.simDoc?._id
                          : true)
                      ) {
                        return;
                      }
                      duration = logs[i].duration - log.duration;
                      if (
                        duration >=
                        notIdentifiedFindings[0]?.simDocIds.length * 10
                      ) {
                        isEvaluated = 'Compared';
                      }
                      return;
                    }
                  }
                });

                return (
                  <>
                    {notIdentifiedFindings.map((notIdentifiedFinding) => {
                      return (
                        <TableRow
                          key={`${answer._id}-${notIdentifiedFinding._id}`}
                        >
                          <TableCell className="preview-body-cell">
                            <Typography
                              sx={{
                                fontSize: '12.5px',
                                fontWeight: 600,
                                textAlign: 'left',
                              }}
                            >
                              {notIdentifiedFinding?.text}
                            </Typography>
                            {isViewKey &&
                            //@ts-ignore
                            notIdentifiedFinding?.keyconcept !== undefined ? (
                              <ul
                                style={{
                                  fontSize: '12.5px',
                                  fontWeight: 400,
                                  textAlign: 'left',
                                  border: '1px solid orange',
                                  padding: '0.5rem 2rem',
                                  borderRadius: '6px',
                                }}
                              >
                                <li>
                                  {
                                    //@ts-ignore
                                    notIdentifiedFinding?.keyconcept
                                      ?.description
                                  }
                                </li>
                              </ul>
                            ) : (
                              <></>
                            )}
                          </TableCell>
                          <TableCell className="preview-body-cell">
                            {severity[notIdentifiedFinding?.severity]}
                          </TableCell>
                          <TableCell className="preview-body-cell">
                            {
                              domains.find(
                                (_domain) =>
                                  _domain._id === notIdentifiedFinding?.domainId
                              )?.name
                            }
                          </TableCell>
                          <TableCell className="preview-body-cell">
                            {
                              //@ts-ignore
                              notIdentifiedFinding?.simDocs !== undefined
                                ? //@ts-ignore
                                  notIdentifiedFinding?.simDocs[0]?.title
                                : ''
                            }
                          </TableCell>
                          <TableCell className="preview-body-cell">
                            {
                              //@ts-ignore
                              notIdentifiedFinding?.simDocs !== undefined
                                ? //@ts-ignore
                                  notIdentifiedFinding?.simDocs[1]?.title
                                : ''
                            }
                          </TableCell>
                          <TableCell className="preview-body-cell">
                            {
                              //@ts-ignore
                              notIdentifiedFinding?.simDocs !== undefined
                                ? //@ts-ignore
                                  notIdentifiedFinding?.simDocs[2]?.title
                                : ''
                            }
                          </TableCell>
                          <TableCell className="preview-body-cell">
                            {isEvaluated}
                          </TableCell>
                          <TableCell className="preview-body-cell">-</TableCell>
                          <TableCell className="preview-body-cell">-</TableCell>
                        </TableRow>
                      );
                    })}
                  </>
                );
              }
            )}
          </TableBody>
        </Table>
      </Card>
    </Box>
  );
};
export default compose<any>(
  withFind({
    collectionName: 'logs',
    version: 2,
    getFilter: ({ userSimulation }: { userSimulation: any }) => ({
      'viewports.userSimulationId': userSimulation._id,
      event: 'select simDoc',
    }),
  })
)(observer(UnidentifiedFindingsView));
// withFind({
//   collectionName: 'simDocs',
//   getFilter: ({ findings }: { findings: Finding[] }) => {
//     const mainSimDocIds = findings
//       .map((_finding) => _finding.simDocId)
//       .filter((_id) => _id !== 'undefined');
//     const connectedSimDocIds = findings
//       .reduce((acc: string[], _finding) => {
//         return [...acc, ..._finding.simDocIds];
//       }, [])
//       .filter((_id) => _id !== 'undefined');
//     const simDocIdSet = new Set([...mainSimDocIds, ...connectedSimDocIds]);
//     return {
//       _id: {
//         $in: Array.from(simDocIdSet),
//       },
//     };
//   },
// })

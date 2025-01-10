import { Box, Typography } from '@mui/material';
import { observer, useLocalObservable } from 'mobx-react';
import Draggable from 'react-draggable';
import Image from 'next/image';
import { useRootStore } from 'src/stores';
import { useEffect, useState } from 'react';
import Viewport from 'src/models/viewport';
import { grey } from '@mui/material/colors';
import axios from 'axios';

function HtmlDocumentView({
  simDoc,
  onClickPDF,
  doc,
  pageNum,
  documents,
  viewport,
  scale,
}: {
  simDoc: any;
  onClickPDF: any;
  doc: any;
  pageNum: any;
  documents: any;
  viewport: Viewport;
  scale: any;
}) {
  const { uiState } = useRootStore();
  const [variables, setVariables] = useState([]);
  useEffect(() => {
    viewport.onLoadHtml(
      documents[0]?.versions[documents[0]?.versions?.length - 1][
        documents[0]?.versions[documents[0].versions?.length - 1].length - 1
      ].pages.length,
      viewport._id
    );
    getVariables();
  }, []);

  useEffect(() => {
    documents[0]?.versions[documents[0]?.versions.length - 1][
      documents[0]?.versions[documents[0]?.versions.length - 1].length - 1
    ].pages.map((page: any) => {
      variables?.map((variable: any) => {
        page.content = page.content.replaceAll(
          `{{${variable.key}}}`,
          variable.value
        );
      });
    });
  }, [variables]);

  const getVariables = async () => {
    const params = {
      filter: {
        groupId: documents[0]?.groupId,
      },
    };
    const data = await axios.get('/v1/documentVariables', { params });
    setVariables(data.data);
  };
  return (
    <Box
      sx={{
        borderColor: grey[500],
        // overflowY: 'auto',
        // overflowX: 'auto',
        overflowY: viewport?.index !== 2 ? 'auto' : 'none',
        overflowX: viewport?.index !== 2 ? 'auto' : 'none',
        // width: uiState.windowDimensions.width! / count,
        width: '100%',
        // height: uiState.windowDimensions.height - 80,
        height: 'calc(100% - 80px)',
        // paddingBottom: 30,
        bgcolor: 'white',
        cursor: 'grab',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: grey[700],
        position: 'realative',
      }}
      onClick={onClickPDF}
    >
      <Box
        sx={{
          // transform: 'scale(1.25)',
          width: 'calc(100vh /1.35)',
          height: 'calc(100vh - 30px)',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            height: '100%',
          }}
        >
          {documents ? (
            <div
              className="docPage"
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
                transform: `scale(${scale})`,
                userSelect: 'none',
                padding: '1rem 1rem',
                transformOrigin: 'top left',
                // position: 'absolute',
                // top: 0,
                // padding: '1rem',
                // fontSize: '8%',
              }}
              dangerouslySetInnerHTML={{
                __html: documents[0]?.versions[
                  documents[0]?.versions?.length - 1
                ][
                  documents[0]?.versions[documents[0].versions?.length - 1]
                    .length - 1
                ].pages.find((page: any) => page.order == pageNum)?.content,
              }}
            />
          ) : (
            <Typography>No Document</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
export default observer(HtmlDocumentView);

import { Box } from '@mui/material';
import { observer, useLocalObservable } from 'mobx-react';
import Draggable from 'react-draggable';
import Image from 'next/image';
import { useRootStore } from 'src/stores';
import { useState } from 'react';
function MedicationView({
  simDoc,
  onClickPDF,
}: {
  simDoc: any;
  onClickPDF: any;
}) {
  const { uiState } = useRootStore();
  console.log(simDoc);
  const pillCnt = Array.apply(null, Array(simDoc.numberOfPillsToShow));
  return (
    <Box
      sx={{
        display: 'flex',
        height: uiState.windowDimensions.height,
        cursor: 'grab',
      }}
      onClick={onClickPDF}
    >
      <Box
        sx={{
          width: '30%',
          display: 'flex',
          flexWrap: 'wrap',
          height: '20px',
        }}
      >
        {pillCnt.map((cnt,i) => (
          <Draggable
            handle=".handle"
            // bounds="parent"
            defaultPosition={{ x: 50, y: 100 }}
            key={i}
          >
            <Box
              className="handle"
              sx={{
                width: 40,
                height: 40,
                zIndex: 2,
              }}
            >
              <Image
                height={35}
                width={35}
                alt="red"
                draggable={false}
                src={
                  simDoc.kind === 'StudyMedication'
                    ? '/img/components/medication/blueCapsule.png'
                    : '/img/components/medication/redCapsule.png'
                }
              />
              {/* <img src='/img/components/medication/blueCapsule.png' width='40' height='40' /> */}
            </Box>
          </Draggable>
        ))}
      </Box>
      <Draggable
        handle=".beaker-handle"
        // bounds="parent"
        defaultPosition={{ x: 250, y: 250 }}
      >
        <Box
          className="beaker-handle"
          sx={{
            width: 250,
            height: '250px',
            zIndex: 2,
          }}
        >
          <Image
            height={280}
            width={190}
            // layout="fill"
            alt="red"
            draggable={false}
            src="/img/components/medication/beaker.png"
          />
        </Box>
      </Draggable>
    </Box>
  );
}
export default observer(MedicationView);

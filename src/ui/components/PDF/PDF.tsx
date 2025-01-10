import { Box, Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import _ from 'lodash';
import { observer, useLocalObservable } from 'mobx-react';
import { createRef, useEffect, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useMeasure } from 'react-use';
import Viewport from 'src/models/viewport';
import { useRootStore } from 'src/stores';
import uniqid from 'uniqid';
import HtmlDocument from '../HtmlDocument/HtmlDocument';
import Medication from '../Medication/Medication';
import Placeholder from '../Placeholder/Placeholder';
import { PDFDocumentProxy } from './type';

function PDFView({
  onClickPDF = () => null,
  vertical = true,
  url = '',
  totalPage = 0,
  currentPage = 0,
  scale = 1,
  onSuccess = (pdf: PDFDocumentProxy) => null,
  simDoc = {},
  viewport,
}: {
  onClickPDF?: any;
  vertical?: boolean;
  url?: string;
  totalPage?: number;
  currentPage?: number;
  scale?: number;
  onSuccess?: Function;
  simDoc: any;
  viewport: Viewport;
}) {
  const { uiState, viewportStore } = useRootStore();
  const containerRef: any = useRef(null);
  const initialLoadRef: any = useRef(true);
  const [refVisible, setRefVisible] = useState(false);
  const onLoadSuccess = async (pdf: PDFDocumentProxy) => {
    localState.totalPage = pdf._pdfInfo.numPages;
    onSuccess(pdf);
  };

  const localState = useLocalObservable(() => ({
    totalPage: totalPage,
  }));

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Adjust this threshold to fit your needs
    };

    const handleIntersection = (entries: any) => {
      entries.forEach((entry: any) => {
        if (!initialLoadRef.current && entry.isIntersecting) {
          viewport.setCurrentPage(
            Number(entry.target.id.split('_')[1]) + 1,
            viewport._id
          );
        }
      });
      if (initialLoadRef.current) {
        window.location.hash = `${simDoc?._id}_${
          viewport.simDoc?.currentPage! - 1
        }`;
      }
      initialLoadRef.current = false;
    };
    const observer = new IntersectionObserver(handleIntersection, options);

    const containerElement = containerRef.current;
    const pageElements = containerElement?.querySelectorAll('div');
    pageElements?.forEach((page: any) => {
      observer.observe(page);
    });
    // Clean up the observer when component unmounts
    return () => {
      pageElements?.forEach((page: any) => {
        observer.unobserve(page);
      });
    };
  }, [refVisible]);

  const defaultPageProps = {
    // width: uiState.windowDimensions.width! / 2,
    width: viewport.index === 2 ? 840 : uiState.windowDimensions.width! / 2,
    height: uiState.windowDimensions.height,
    scale: scale,
  };

  let count = viewportStore.getMountedViewportCount();
  if (viewportStore.getMountedViewportCount() > 2) {
    count = 2;
  }

  if (simDoc?.kind === 'StudyMedication' || simDoc?.kind === 'RescueMedication')
    return <Medication simDoc={simDoc} onClickPDF={onClickPDF} />;
  if (simDoc?.kind === 'Html')
    return (
      <HtmlDocument
        simDoc={simDoc}
        onClickPDF={onClickPDF}
        pageNum={currentPage}
        viewport={viewport}
        scale={scale}
      />
    );
  if (!url) return <Placeholder />;

  return (
    <Box
      onClick={onClickPDF}
      sx={{
        borderColor: grey[500],
        // overflowY: 'auto',
        // overflowX: 'auto',
        overflowY: viewport?.index !== 2 ? 'auto' : 'none',
        overflowX: viewport?.index !== 2 ? 'auto' : 'none',
        // width: uiState.windowDimensions.width! / count,
        width: '100%',
        // height: uiState.windowDimensions.height - 80,
        height: 'calc(100% - 10px)',
        // paddingBottom: 30,
        bgcolor: 'white',
        cursor: 'grab',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: grey[700],
      }}
    >
      <Document
        file={url}
        onLoadError={(error) => {
          alert(error.message);
        }}
        onLoadSuccess={onLoadSuccess}
      >
        <div
          ref={(el) => {
            containerRef.current = el;
            setRefVisible(!!el);
          }}
        >
          {_.range(0, localState.totalPage).map(
            (value: number, index: number) => (
              <div
                id={`${simDoc._id}_${index}`}
                style={{ marginBottom: '1rem' }}
              >
                <Page {...defaultPageProps} key={uniqid()} pageIndex={value} />
              </div>
            )
          )}
        </div>
      </Document>
    </Box>
  );
}
export default observer(PDFView);

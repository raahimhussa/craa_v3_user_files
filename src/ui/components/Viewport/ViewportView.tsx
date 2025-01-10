import { Box } from '@components';
import PDFController from '../PDFController/PDFController';
import PDFFrame from '../PDFFrame/PDFFrame';
import Viewport from 'src/models/viewport';
import { observer } from 'mobx-react';

function ViewportView({
  viewport,
  pdfController = true,
}: {
  viewport: Viewport;
  pdfController?: boolean;
}) {
  if (!viewport) return null;
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        border: viewport.index !== 2 ? '1px solid white !important' : 'none',
        bgcolor: '#525659',
        alignItems: 'center',
        minWidth: '681px',
        height: 'calc(100% - 10px)',
      }}
    >
      {/* {pdfController && <PDFController viewport={viewport} />} */}
      <PDFFrame viewport={viewport} />
    </Box>
  );
}
export default observer(ViewportView);

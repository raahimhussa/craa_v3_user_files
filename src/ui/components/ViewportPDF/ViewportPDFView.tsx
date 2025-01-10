import axios from 'axios';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import Viewport from 'src/models/viewport';
import PDF from '../PDF/PDF';
import { PDFDocumentProxy } from '../PDF/type';
function ViewportPDFView({ viewport }: { viewport: Viewport }) {
  return (
    <PDF
      onClickPDF={() => viewport.toggleActive(viewport._id)}
      totalPage={viewport.simDoc?.totalPage}
      // currentPage={viewport.simDoc?.currentPage}
      scale={viewport.simDoc?.scale}
      url={viewport.simDoc?.files[0]?.url}
      onSuccess={(pdf: PDFDocumentProxy) =>
        viewport.onLoadPdf(pdf, viewport._id)
      }
      simDoc={viewport.simDoc}
      viewport={viewport}
    />
  );
}
export default observer(ViewportPDFView);

import compose from '@shopify/react-compose';
import dynamic from 'next/dynamic';
const PDFViewer = dynamic(import('./PDFViewerView'), { ssr: false });
export default compose<any>()(PDFViewer);

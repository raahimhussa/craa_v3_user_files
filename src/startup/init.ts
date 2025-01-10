import axios from 'axios';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // console.error(error.response);
    return Promise.reject(error);
  }
);

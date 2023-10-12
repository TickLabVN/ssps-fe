import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@material-tailwind/react';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import 'react-toastify/dist/ReactToastify.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <StyleSheetManager
      shouldForwardProp={(propName, target) => {
        if (typeof target === 'string') {
          return isPropValid(propName);
        }
        return true;
      }}
    >
      <ThemeProvider>
        <ToastContainer limit={1} />
        <App />
      </ThemeProvider>
    </StyleSheetManager>
  </BrowserRouter>
);

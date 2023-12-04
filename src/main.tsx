import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { ThemeProvider } from '@material-tailwind/react';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import 'react-toastify/dist/ReactToastify.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import './index.css';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      gcTime: 3600000
    }
  }
});

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
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <PayPalScriptProvider options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
            <QueryClientProvider client={queryClient}>
              <ToastContainer limit={1} />
              <App />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </PayPalScriptProvider>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </StyleSheetManager>
  </BrowserRouter>
);

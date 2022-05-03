import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import App from './App';
import { ColorMode, PageContainer } from './components';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ColorMode>
        <CssBaseline>
          <PageContainer>
            <App />
          </PageContainer>
        </CssBaseline>
      </ColorMode>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

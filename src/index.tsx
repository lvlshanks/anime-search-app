import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { PageContainer } from './components';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <PageContainer>
        <App />
      </PageContainer>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

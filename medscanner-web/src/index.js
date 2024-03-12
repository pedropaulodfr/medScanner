import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Sidebar from './components/Sidebar/Sidebar'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Sidebar></Sidebar> */}
    <App />
  </React.StrictMode>
);
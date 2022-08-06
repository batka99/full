import React from 'react';
import ReactDOM from "react-dom/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Offline, Online } from "react-detect-offline";
import { UserStore } from './components/context/userContext';
import { QrStore } from './components/context/qpayContext';
import {
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { ServiceStore } from './components/context/serviceContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Online>
      <UserStore>
        <QrStore>
          <ServiceStore>
          <App />
          </ServiceStore>
        </QrStore>
      </UserStore>
    </Online>
    <Offline>
          <div className="col-12 d-flex justify-content-center align-items-center vh-100">
            <FontAwesomeIcon 
            icon={faTriangleExclamation}
            className="mr-2 ml-2"
            size="5x" />
            <h5 className='ml-2' > Уучлаарай алдаа гарсан байна</h5>
          </div>
    </Offline>  
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

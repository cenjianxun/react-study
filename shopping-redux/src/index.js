import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { Elements } from '@stripe/react-stripe-js'
import reportWebVitals from './reportWebVitals';
import { store, persistor } from './store/store';
import { stripePRomise } from './utils/stripe/stripe.utils';
import './index.scss';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// user在product上面是因为有的产品依据用户地理位置决定要不要发货等等，下层可以拿到上层数据，反之不行。
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Elements stripe={stripePRomise}>
            <App />
          </Elements>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import App from './App';
import configureStore from './store/configureStore'
import { Provider } from 'react-redux';
import { startGetAccount } from './actions/usersAction';
import { startAddClient, startGetAllClients } from './actions/clientActions';

const store = configureStore()

if(localStorage.getItem('token')){
  store.dispatch(startGetAccount())
  if(localStorage.getItem('admin')){
  store.dispatch(startGetAllClients())
}
  if(localStorage.getItem('client')){
    store.dispatch(startAddClient())
  }
}

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
)


ReactDOM.render(
    jsx,
  document.getElementById('root')
);



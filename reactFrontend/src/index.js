import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './routes'
import { BrowserRouter } from 'react-router-dom';

const App = () =>{
  return(
  <BrowserRouter forceRefresh={true}>
    <Routes/>
  </BrowserRouter>
  ) 
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);



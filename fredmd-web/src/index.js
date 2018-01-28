import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import PatientPage from './Components/PatientPage';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route} from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
    <div>
        <Route exact path="/" component={App}/>
        <Route path="/patient" component={PatientPage}/>   
    </div>
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Nuevo from './components/Nuevo';
import Editar from './components/Editar';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <React.Fragment>
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/Nuevo' element={<Nuevo />} />
        <Route path='/Editar/:id' element={<Editar />} />
      </Routes>
    </Router>
  </React.Fragment>
    
  );
}

export default App;

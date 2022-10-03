import React from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { ReportsOne, ReportsThree, ReportsTwo } from './pages/Reports';
import Users from './pages/User';

const config = {
  headers : { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Ikd1c3Rhdm8gZG9zIHNhbnRvcyIsImVtYWlsIjoiZ3VzdHZzYW50b3NAaG90bWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjY0Mzg4MjExLCJleHAiOjE2NjQ2NDc0MTF9.5G5TUeDYdQJ8YgVaMPtDkFC6TeIeXvIAYwGbKS_Qw0s' }
}

function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/reports/reports1' exact element={<ReportsOne />} />
          <Route path='/reports/reports2' exact element={<ReportsTwo />} />
          <Route path='/reports/reports3' exact element={<ReportsThree />} />
          <Route path='/user' exact element={<Users />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
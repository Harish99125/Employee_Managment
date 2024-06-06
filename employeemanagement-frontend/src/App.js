import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderComponent from './component/HeaderComponent';
import FooterComponent from './component/FooterComponent';
import ListEmployeeComponent from './component/ListEmployeeComponent';
import AddEmployeeComponent from './component/AddEmployeeComponent';
import ViewEmployeeComponent from './component/ViewEmployeeComponent';

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <div className="container">
        <Routes>
          <Route path="/" element={<ListEmployeeComponent />} />
          <Route path="/employee" element={<ListEmployeeComponent />} />
          <Route path="/add-employee" element={<AddEmployeeComponent />} />
          <Route path="/add-employee/:id" element={<AddEmployeeComponent />} />
          <Route path="/view-employee/:id" element={<ViewEmployeeComponent />} />
        </Routes>
      </div>
      <FooterComponent />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;

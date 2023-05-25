import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './pages/LoginForm/LoginForm';
import FileList from './pages/FileList/FileList';
import SingleFile from './pages/File';

import './App.css';
import './index.css';
import './normalize.css';

const App = () => {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/files" element={<FileList />} />
            <Route path="/files/:fileId" element={<SingleFile />} />
        </Routes>
      </Router>
  );
};

export default App;

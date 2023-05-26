import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import FileList from './pages/Files';

import './App.css';
import './index.css';
import './normalize.css';

const App = () => {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/files" element={<FileList />} />
            <Route path="/files/:linkId" element={<FileList />} />
        </Routes>
      </Router>
  );
};

export default App;

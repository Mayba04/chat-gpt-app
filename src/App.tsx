import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './store';
import LoginPage from './components/LoginPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ChatPage from './components/ChatPage';
import Sidebar from './components/Sidebar';
import './App.css';
import { RootState } from './reducers';
import ProfilePage from './components/ProfilePage';
import ErrorPage from './components/ErrorPage';

const App: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/chat" element={user ? <LayoutWithMenu><ChatPage /></LayoutWithMenu> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <LayoutWithMenu><ProfilePage /></LayoutWithMenu> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

const LayoutWithMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
};

export default App;

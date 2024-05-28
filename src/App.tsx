import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './store';
import LoginPage from './components/LoginPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ChatPage from './components/ChatPage';
import Sidebar from './components/Sidebar';
import SidebarAdmin from './components/SidebarAdmin'; 
import './App.css';
import { RootState } from './reducers';
import ProfilePage from './components/ProfilePage';
import ErrorPage from './components/ErrorPage';
import AdminCommentsPage from './components/AdminCommentsPage';
import PendingVerificationSessions from './components/PendingVerificationSessions'; 

const App: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const role = useSelector((state: RootState) => state.user.role) || ''; 

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/chat" element={user ? <LayoutWithMenu role={role}><ChatPage /></LayoutWithMenu> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <LayoutWithMenu role={role}><ProfilePage /></LayoutWithMenu> : <Navigate to="/login" />} />
          <Route path="/pending-verification-sessions" element={role === 'Admin' ? <LayoutWithMenu role={role}><PendingVerificationSessions /></LayoutWithMenu> : <Navigate to="/login" />} />
          <Route path="/admin-comments-sessions" element={role === 'Admin' ? <LayoutWithMenu role={role}><AdminCommentsPage /></LayoutWithMenu>:<Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

const LayoutWithMenu: React.FC<{ role: string; children: React.ReactNode }> = ({ role, children }) => {
  return (
    <div>
      {role === 'Admin' ? <SidebarAdmin /> : <Sidebar />}
      {children}
    </div>
  );
};

export default App;

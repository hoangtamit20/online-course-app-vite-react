import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Login from './components/auth/login';
import HomePage from './components/home/homepage';
import Register from './components/auth/register';
import ResetPassword from './components/auth/resetpassword';
import ResetPasswordConfirm from './components/auth/resetpasswordconfirm';
import RegisterResult from './components/auth/registerresult';
import { QueryClient, QueryClientProvider } from 'react-query';
import React, { useEffect, useState } from 'react';
import CourseTypeCRUD from './components/admin/managecoursetype/coursetypecrud';
import { Toast, ToastContainer } from 'react-bootstrap';
import { checkIfUserIsAdmin } from './services/roleservice';
import NavBarTop from './components/base/navbartop';
// import your components here
const queryClient = new QueryClient();


function ProtectedRoute({ children, showToast, ...rest }) {
  const location = useLocation();
  const checkUserPermission = checkIfUserIsAdmin();

  useEffect(() => {
    if (!checkUserPermission && location.pathname === '/admin/manage-course-type/course-type-crud') {
      showToast(true);
      setTimeout(() => showToast(false), 5000);
    }
  }, [checkUserPermission, location]);

  return checkUserPermission ? children : <Navigate to="/login" />;
}


function NavBarWrapper() {
  const location = useLocation();
  const authPaths = ['/login', '/register', '/reset-password', '/reset-password-confirm', '/register-result'];

  return !authPaths.includes(location.pathname) ? <NavBarTop /> : null;
}


function App() {
  const [showToast, setShowToast] = useState(false);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <NavBarWrapper />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/reset-password-confirm" element={<ResetPasswordConfirm />} />
            <Route path="/register-result" element={<RegisterResult />} />
            <Route path="/" element={<HomePage />} />
            {/* Route for admin */}
            <Route path="/admin/manage-course-type/course-type-crud" element={
              <ProtectedRoute showToast={setShowToast}>
                <CourseTypeCRUD />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>

        <ToastContainer position="top-end" className='mt-3 me-3'>
          <Toast show={showToast} onClose={() => setShowToast(false)} delay={5000} autohide className="bg-danger">
            <Toast.Header>
              <strong className="me-auto">Access Denied</strong>
            </Toast.Header>
            <Toast.Body>You don't have permission to access this page.</Toast.Body>
          </Toast>
        </ToastContainer>
      </QueryClientProvider>
    </>
  );
}

export default App;
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { QueryClient, QueryClientProvider } from "react-query";
import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
    useLocation,
} from "react-router-dom";
import CourseTypeCRUD from "./components/admin/managecoursetype/coursetypecrud";
import HomePage from "./pages/home/HomePage";
import Login from "./pages/login/Login";
import RegisterResult from "./pages/register-result/RegisterResult";
import Register from "./pages/register/Register";
import ResetPasswordConfirm from "./pages/reset-password-confirm/ResetPasswordConfirm";
import ResetPassword from "./pages/reset-password/ResetPassword";
import { checkIfUserIsAdmin } from "./services/roleservice";

// import your components here
const queryClient = new QueryClient();

function ProtectedRoute({ children, showToast, ...rest }) {
    const location = useLocation();
    const checkUserPermission = checkIfUserIsAdmin();

    useEffect(() => {
        if (
            !checkUserPermission &&
            location.pathname === "/admin/manage-course-type/course-type-crud"
        ) {
            showToast(true);
            setTimeout(() => showToast(false), 5000); // hide the toast after 5 seconds
        }
    }, [checkUserPermission, location]);

    return checkUserPermission ? children : <Navigate to="/login" />;
}

function App() {
    const [showToast, setShowToast] = useState(false);

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route
                        path="/reset-password-confirm"
                        element={<ResetPasswordConfirm />}
                    />
                    <Route
                        path="/register-result"
                        element={<RegisterResult />}
                    />
                    <Route path="/" element={<HomePage />} />
                    {/* Route for admin */}
                    <Route
                        path="/admin/manage-course-type/course-type-crud"
                        element={
                            <ProtectedRoute showToast={setShowToast}>
                                <CourseTypeCRUD />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>

            <ToastContainer position="top-end" className="mt-3 me-3">
                <Toast
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    delay={5000}
                    autohide
                    className="bg-danger"
                >
                    <Toast.Header>
                        <strong className="me-auto">Access Denied</strong>
                    </Toast.Header>
                    <Toast.Body>
                        You don't have permission to access this page.
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </QueryClientProvider>
    );
}

export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import UserDashboard from './components/UserDashboard';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [activeComponent, setActiveComponent] = useState(null);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
         if (token) {
              try {
                   const payloadBase64 = token.split('.')[1];
                   const payload = JSON.parse(atob(payloadBase64));
                   const role = payload.role || 'user';
                   setIsLoggedIn(true);
                   setUserRole(role);
            } catch (error) {
                 console.error("Error while decoding token:", error);
              localStorage.removeItem('token');
             localStorage.removeItem('role');
            setIsLoggedIn(false);
             setUserRole(null)
         }
        }
    }, []);

    const handleLoginSuccess = (role) => {
        setIsLoggedIn(true);
        setShowRegisterForm(false);
        setUserRole(role);
        localStorage.setItem('role', role);
    };


    const handleRegisterClick = () => {
        setShowRegisterForm(true);
    };

    const handleBackToLogin = () => {
        setShowRegisterForm(false);
    };

   const handleNavbarClick = (component) => {
        setActiveComponent(component);
    }

    const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
        setIsLoggedIn(false);
        setUserRole(null);
        setActiveComponent(null);
    };

    return (
        <Router>
            <div>
                <Routes>
                    <Route
                        path="/"
                        element={
                            !isLoggedIn ? (
                                !showRegisterForm ? (
                                    <LoginForm onLoginSuccess={handleLoginSuccess} onRegisterClick={handleRegisterClick} />
                                ) : (
                                    <RegisterForm onBackToLogin={handleBackToLogin} />
                                )
                            ) : (
                                <Navigate to={`/${userRole}`} />
                            )
                        }
                    />
                     <Route
                       path="/admin/*"
                    element={
                       isLoggedIn && userRole === 'admin' ? (
                        <>
                           <Navbar onNavbarClick={handleNavbarClick} onLogout={handleLogout} />
                           <div className="container mt-4">
                             <Routes>
                                <Route path="booklist" element={<BookList />} />
                                <Route path="bookform" element={<BookForm />} />
                            </Routes>
                            </div>
                         </>
                            ) : (
                             <Navigate to="/" />
                           )
                         }
                  />
                   <Route
                       path="/user/*"
                      element={
                           isLoggedIn && userRole === 'user' ? (
                           <>
                             <UserDashboard onLogout={handleLogout} />
                           </>
                         ) : (
                           <Navigate to="/" />
                        )
                      }
                 />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Routes, Route,useLocation, Navigate } from "react-router-dom";
import {Home,Auth, Orders,Tables,Menu, Dashboard} from "./pages";
import  Header from "./components/shared/Header";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './Redux/Slices/userSlice';
import useLoadData from "./hooks/useLoadData";
import FullScreenLoader from "./components/shared/FullScreenLoader";

function Layout() {
    // All hooks must be called at the top, before any conditional logic
    const isLoading = useLoadData();
    const location = useLocation();
    const dispatch = useDispatch();
    const { isAuth } = useSelector((state) => state.user);
    const [isInitialized, setIsInitialized] = useState(false);

    const hiddenHeaderRoutes = ["/auth"];

    // Initialize user state from localStorage on app load
    useEffect(() => {
        const userData = localStorage.getItem('userData');
        const accessToken = localStorage.getItem('accessToken');

        if (userData && accessToken) {
            try {
                const parsedUserData = JSON.parse(userData);
                dispatch(setUser(parsedUserData));
            } catch (error) {
                console.error('Error parsing stored user data:', error);
                // Clear invalid data
                localStorage.removeItem('userData');
                localStorage.removeItem('accessToken');
            }
        }
        setIsInitialized(true);
    }, [dispatch]);

    // Early returns after all hooks have been called
    if(isLoading) {
        return <FullScreenLoader/>
    }

    // Show loading or redirect to auth while initializing
    if (!isInitialized) {
        return <div className="flex items-center justify-center min-h-screen bg-black text-white">Loading...</div>;
    }

    return (
        <>
          {!hiddenHeaderRoutes.includes(location.pathname) && isAuth && <Header/>}
          <Routes>
            {/* Default route - always redirect to auth page */}
            <Route
              path="/"
              element={<Navigate to="/auth" replace />}
            />

            {/* Home route - protected */}
            <Route
              path="/home"
              element={
                <ProtectedRoutes>
                  <Home/>
                </ProtectedRoutes>
              }
            />

            {/* Auth route - redirect to home if already authenticated */}
            <Route
              path="/auth"
              element={isAuth ? <Navigate to="/home" replace /> : <Auth/>}
            />

            {/* Protected routes */}
            <Route
              path="/orders"
              element={
                <ProtectedRoutes>
                  <Orders />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/menu"
              element={
                <ProtectedRoutes>
                  <Menu />
                </ProtectedRoutes>
              }
            />
               <Route
              path="/dashboard"
              element={
                <ProtectedRoutes>
                  <Dashboard />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/tables"
              element={
                <ProtectedRoutes>
                  <Tables/>
                </ProtectedRoutes>
              }
            />

            {/* Catch all route - redirect to auth if not authenticated */}
            <Route
              path="*"
              element={
                isAuth ? (
                  <div className="flex items-center justify-center min-h-screen bg-black text-white">
                    <div className="text-center">
                      <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
                      <p className="text-gray-400 mb-4">The page you're looking for doesn't exist.</p>
                      <Navigate to="/home" replace />
                    </div>
                  </div>
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            />
          </Routes>
        </>
    )
}

function ProtectedRoutes({children}){
  const { isAuth } = useSelector((state) => state.user);

  // Check for both Redux state and localStorage token
  const accessToken = localStorage.getItem('accessToken');

  if (!isAuth || !accessToken) {
    // Clear any invalid tokens
    if (!isAuth && accessToken) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userData');
    }
    return <Navigate to="/auth" replace />;
  }

  return children;
}


function App() {
  return(
    <Router>
      <Layout/>
    </Router>
  )
}



export default App

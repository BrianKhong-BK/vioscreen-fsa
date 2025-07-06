import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { useState, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { APIContext } from "./contexts/APIContext";
import axios from "axios";
import HomePage from "./pages/HomePage";
import HomeLayout from "./pages/HomeLayout";
import DashboardLayout from "./pages/DashboardLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import BookingPage from "./pages/BookingPage";
import MyBookingPage from "./pages/MyBookingPage";
import EditBookingPage from "./pages/EditBookingPage";
import ErrorPage400 from "./pages/ErrorPage400";
import ErrorPage500 from "./pages/ErrorPage500";
import RequireAuth from "./components/RequireAuth";

export default function App() {
  const [authToken, setAuthToken] = useLocalStorage("authToken", "");
  const [serverStatus, setServerStatus] = useState(null);
  const URL =
    "https://a38c57ab-d785-48f6-b7d5-5975bbabda99-00-3j9kc1hn7brcc.sisko.replit.dev";

  const Layout = authToken ? DashboardLayout : HomeLayout;

  useEffect(() => {
    axios
      .get(`${URL}/test`)
      .then(() => setServerStatus(true))
      .catch(() => setServerStatus(false));
  }, [URL]);

  if (serverStatus === null) {
    return <div className="text-white text-center p-5">Checking server...</div>;
  }

  return (
    <>
      <APIContext.Provider value={{ URL }}>
        <AuthContext.Provider value={{ authToken, setAuthToken }}>
          <BrowserRouter>
            <Routes>
              {serverStatus ? (
                <>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/book-seats/:id" element={<BookingPage />} />
                    <Route
                      path="/mybooking"
                      element={
                        <RequireAuth>
                          <MyBookingPage />
                        </RequireAuth>
                      }
                    />
                    <Route
                      path="/edit/:data"
                      element={
                        <RequireAuth>
                          <EditBookingPage />
                        </RequireAuth>
                      }
                    />
                  </Route>

                  <Route path="/login" element={<LoginPage />} />

                  <Route path="/signup" element={<SignupPage />} />

                  <Route path="*" element={<ErrorPage400 />} />
                </>
              ) : (
                <Route path="*" element={<ErrorPage500 />} />
              )}
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      </APIContext.Provider>
    </>
  );
}

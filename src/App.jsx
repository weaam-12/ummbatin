import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageProvider } from "./pages/LanguageContext";
import { AuthProvider } from "./AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Complaints from "./pages/Complaints";
import Payments from "./pages/Payments";
import Forms from "./pages/Forms";
import EmergencyPage from "./pages/EmergencyPage.jsx";
import About from "./pages/About";
import PrivateRoute from "./pages/PrivateRoute"; // Protect Admin Route

import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import WaterReceiptForm from "./pages/WaterReceiptForm";
import GarbageComplaint from "./pages/GarbageComplaint";
import GarbageService from "./pages/GarbageService";
import PaymentForm from "./pages/PaymentForm";
import ErrorBoundary from "./pages/ErrorBoundary";
import UserServiceRequests from "./pages/UserServiceRequests";
import AdminServiceManagement from "./pages/AdminServiceManagement";

import "./pages/i18n";
import "./api.js";

const App = () => {
    const { i18n } = useTranslation();

    return (
        <LanguageProvider>
            <AuthProvider>
                <Router>
                    <div className="App">
                        <Navbar />
                        <main>
                            <ErrorBoundary>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/complaints" element={<Complaints />} />
                                    <Route path="/payments" element={<Payments />} />
                                    <Route path="/forms" element={<Forms />} />
                                    <Route path="/water-receipt" element={<WaterReceiptForm />} />
                                    <Route path="/emergency" element={<EmergencyPage />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/garbage-service" element={<GarbageService />} />
                                    <Route path="/payment-form" element={<PaymentForm />} />

                                    {/* Separate user and admin pages */}
                                    <Route path="/user-service-requests" element={<UserServiceRequests />} />
                                    <Route path="/admin-service-management" element={
                                        <PrivateRoute>
                                            <AdminServiceManagement />
                                        </PrivateRoute>
                                    } />

                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </ErrorBoundary>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </AuthProvider>
        </LanguageProvider>
    );
};

export default App;

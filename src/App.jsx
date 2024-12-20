import React from "react";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import AboutPage from "./components/pages/AboutPage";
import AdminPage from "./components/pages/AdminPage";
import ProfilePage from "./components/pages/ProfilePage";
import CartPage from "./components/pages/CartPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MyOrders from "./components/pages/MyOrders";
import RequestForm from "./components/Utilis/RequestForm";
import NotFoundPage from "./components/pages/NotFoundPage";
import CheckoutSuccess from "./components/pages/CheckoutSuccess";
import CheckoutFail from "./components/pages/CheckoutFail";
import TokenRefreshHandler from "./components/Utilis/TokenRefreshHandler";
import UserProvider from "./context/UserProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <TokenRefreshHandler />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/request" element={<RequestForm />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute roleRequired="admin">
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <MyOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="/checkout-cancel" element={<CheckoutFail />} />
          </Routes>
        </UserProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;

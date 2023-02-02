import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./booking/Home";
import TopNav from "./component/TopNav";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./component/PriavteRoute";
import Dashboard from "./user/Dashboard";
import DashboardSeller from "./user/DashboardSeller";
import NewHotel from "./hotels/NewHotel";
import StripeCallback from "./stripe/StripeCallback";
import EditHotel from "./hotels/EditHotel";
import ViewHotel from "./hotels/ViewHotel";
import StripeCancel from "./stripe/StripeCancel";
import StripeSuccess from "./stripe/StripeSuccess";
import SearchResult from "./hotels/SearchResult";
function App() {
  return (
    <Router>
      <TopNav />
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route exact path="/dashboard/seller" element={
          <PrivateRoute>
            <DashboardSeller />
          </PrivateRoute>
        } />
        <Route exact path="/hotels/new" element={
          <PrivateRoute>
            <NewHotel />
          </PrivateRoute>
        } />
        <Route exact path="/stripe/callback" element={
          <PrivateRoute>
            <StripeCallback />
          </PrivateRoute>
        } />
        <Route exact path="/hotels/:hotelId" element={<Home />} />
        <Route exact path="/hotel/edit/:hotelId" element={
          <PrivateRoute>
            <EditHotel />
          </PrivateRoute>
        } />
        <Route exact path="/hotel/:hotelId" element={<ViewHotel />} />
        <Route exact path="/stripe/success/:hotelId" element={
          <PrivateRoute>
            <StripeSuccess />
          </PrivateRoute>
        } />
        <Route exact path="/stripe/cancel/:hotelId" element={
          <PrivateRoute>
            <StripeCancel />
          </PrivateRoute>
        } />
        <Route exact path="/search-result" element={<SearchResult />} />

      </Routes>
    </Router>
  );
}

export default App;

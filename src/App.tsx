import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import BigDayPage from "./pages/BigDayPage";
import GuestPage from "./pages/GuestPage";
import TablePage from "./pages/TablePage";
import RSVPPage from "./pages/RSVPPage";
import MenuPage from "./pages/MenuPage";
import DashboardPage from "./pages/DashboardPage";
import "./styles/App.css";
import PublicRSVPForm from "./components/RSVP/PublicRSVPForm";
import CustomRSVPForm from "./components/RSVP/CustomRSVPForm";

const NoMatch: React.FC = () => {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="bigdays" element={<BigDayPage />} />
        <Route path="guests" element={<GuestPage />} />
        <Route path="tables" element={<TablePage />} />
        <Route path="rsvps" element={<RSVPPage />} />
        <Route path="menus" element={<MenuPage />} />
        {/* <Route path="/public-rsvp/:hashKey" element={<PublicRSVPForm />} /> */}
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path="/public-rsvp/:hashKey" element={<CustomRSVPForm />} />
    </Routes>
  );
};

export default App;

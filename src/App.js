import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Admin from "./Admin";
import DescriptionPage from "./DescriptionPage";
import AddEtablissement from "./AddEtablissement";
import AuthAdmin from "./AuthAdmin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/description/:id" element={<DescriptionPage />} />
        <Route path="/AddEtablissement" element={<AddEtablissement />} />
        <Route path="/AuthAdmin" element={<AuthAdmin />} />
      </Routes>
    </Router>
  );
};

export default App;

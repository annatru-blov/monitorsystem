import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/NavBar/NavBar";
import Login from "./Components/Login/Login";
import SystemTable from "./Components/SystemTable/SystemTable";
import RegistrationForm from "./Components/RegistrationForm/RegistrationForm";
import "./App.css";
import ProfileContainer from "./Components/Profile/ProfileContainer";


export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null); 

  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [middleName, setMiddleName] = useState(null);
  const [identificationNumber, setIdentificationNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  const handleLogin = (userId, login, password, firstName, lastName, middleName, identificationNumber, email, phoneNumber ) => {
    console.log(userId);
    console.log(login);
    setIsAuthenticated(true);
    setUserId(userId);
    setLogin(login);
    setPassword(password);
    setFirstName(firstName);
    setLastName(lastName);
    setMiddleName(middleName);
    setIdentificationNumber(identificationNumber);
    setEmail(email);
    setPhoneNumber(phoneNumber);
    
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    setLogin(null);
    setPassword(null);
    setFirstName(null);
    setLastName(null);
    setMiddleName(null);
    setIdentificationNumber(null);
    setEmail(null);
    setPhoneNumber(null);
  };


  return (
    <Router>
      <div className="navbar">
    
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to={`/profile/${userId}`}  /> 
              ) : (
                <Login onLogin={handleLogin}/>
              )
            }
          />
          <Route
            path="/systemtable"
            element={isAuthenticated ? <SystemTable  userId={userId} firstName={firstName} lastName={lastName} logout={handleLogout}/> : <Navigate to="/" />}
          />
          <Route
            path="/profile/:userId" 
            element={isAuthenticated ? <ProfileContainer/> : <Navigate to="/" />}
          />
          <Route path="/registrationform" element={<RegistrationForm />} />
        </Routes>
      </div>
    </Router>
  );
}

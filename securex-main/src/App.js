import React, { useState } from 'react'; 
import { Routes, Route, Navigate } from 'react-router-dom';
import TrPage from './Containers/TcPage/TrPage';
import Create from './Components/Create';  
import Login from './Components/Login'; 
import StdPage from './Containers/StPage/StdPage'; 
import Logintr from './Components/Logintr';
import MPage from './Containers/MPage/MPage';
import ExamPage from './Containers/Exam/ExamPage';
import { LeaderBoard } from './Containers/LeaderBoard'; // Adjust the import path

const App = () => {
  const [user, setUser] = useState(null); // Initialize user state
  const [isLogin, setIsLogin] = useState(true); // Initialize isLogin state

  const handleRegister = (newUser) => {
    setUser(newUser); // Set registered user
  };

  const handleLogin = (loginData) => {
    setUser(loginData); // Set user on login
  };

  return (
    <div>
      <LeaderBoard>
      <Routes>
        <Route path="/" element={<MPage />} /> {/* Default route to MPage */}
        <Route path="/logintr" element={<Logintr onSubmit={handleLogin} />} />
        <Route path="/login" element={<Login onRegister={handleRegister} onLogin={handleLogin} isLogin={isLogin} setIsLogin={setIsLogin} />} />
        <Route path="/trpage" element={<TrPage />} />
        <Route path="/create" element={<Create />} />
        <Route path="/stdpage" element={user ? <StdPage user={user} /> : <Navigate to="/login" />} />
        <Route path="/exam" element={<ExamPage user={user} />} /> {/* Pass user to ExamPage if needed */}
      </Routes>
      </LeaderBoard>
    </div>
  );
};

export default App;

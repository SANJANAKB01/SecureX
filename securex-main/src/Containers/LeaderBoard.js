import React, { createContext, useContext, useState } from 'react';

const LeaderboardContext = createContext();

export const useLeaderboard = () => useContext(LeaderboardContext);

export const LeaderBoard = ({ children }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  const addToLeaderboard = (id, name, warningCount, terminated) => {
    setLeaderboard((prev) => [
      ...prev,
      { id, name, warningCount, terminated },
    ]);
  };

  return (
    <LeaderboardContext.Provider value={{ leaderboard, addToLeaderboard }}>
      {children}  {/* This will render the children components */}
    </LeaderboardContext.Provider>
  );
};

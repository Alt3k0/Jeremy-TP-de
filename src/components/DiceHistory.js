import React from 'react';

const DiceHistory = ({ history }) => {
  return (
    <div>
      <h2>Dice Roll History</h2>
      <ul>
        {history.map((roll, index) => (
          <li key={index}>{roll}</li>
        ))}
      </ul>
    </div>
  );
};

export default DiceHistory;
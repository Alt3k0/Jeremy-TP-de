import React from 'react';

const RollButton = ({ onRoll }) => {
    return (
        <button onClick={onRoll}>
            Roll the Die
        </button>
    );
};

export default RollButton;
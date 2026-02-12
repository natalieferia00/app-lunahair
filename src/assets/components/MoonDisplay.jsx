import React from 'react';

export const MoonDisplay = ({ phase }) => {
  return (
    <svg width="80" height="80" viewBox="0 0 100 100" style={{ margin: '15px auto', display: 'block' }}>
      <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2" />
      {phase === 'Luna Llena' && <circle cx="50" cy="50" r="38" fill="#fff" />}
      {phase === 'Luna Nueva' && <circle cx="50" cy="50" r="38" fill="#1c1c22" />}
      {phase === 'Luna Creciente' && <path d="M50,12 A38,38 0 1,1 50,88 A28,38 0 0,0 50,12" fill="white" />}
      {phase === 'Luna Menguante' && <path d="M50,12 A38,38 0 0,0 50,88 A28,38 0 1,1 50,12" fill="white" />}
    </svg>
  );
};
import React from 'react';

const Stats = ({ totalCount, completedCount, pendingCount }) => {
  if (totalCount === 0) {
    return null;
  }
  return (
    <div className="stats" id="stats">
      <div className="stat-item">
        <span className="stat-number" id="total-count">{totalCount}</span>
        <span className="stat-label">Totali</span>
      </div>
      <div className="stat-item">
        <span className="stat-number" id="completed-count">{completedCount}</span>
        <span className="stat-label">Completate</span>
      </div>
      <div className="stat-item">
        <span className="stat-number" id="pending-count">{pendingCount}</span>
        <span className="stat-label">Da fare</span>
      </div>
    </div>
  );
};

export default Stats;
import React from 'react';

const FiltersBar = ({ filter, onSetFilter }) => {
  return (
    <div className="filters-bar">
      <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => onSetFilter('all')}>Tutte</button>
      <button className={`filter-btn ${filter === 'pending' ? 'active' : ''}`} onClick={() => onSetFilter('pending')}>Da fare</button>
      <button className={`filter-btn ${filter === 'completed' ? 'active' : ''}`} onClick={() => onSetFilter('completed')}>Completate</button>
    </div>
  );
};

export default FiltersBar;
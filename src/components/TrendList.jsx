import React from 'react';
import TrendCard from './TrendCard';
import './TrendList.css';

export default function TrendList({ trends, onTrendClick }) {
  if (!trends || trends.length === 0) {
    return <div className="no-trends">No trends found matching your criteria.</div>;
  }

  return (
    <div className="trend-grid">
      {trends.map((trend, index) => (
        <div 
          key={trend.id} 
          style={{ animationDelay: `${index * 50}ms` }} 
          className="animate-fade-in-stagger"
          onClick={() => onTrendClick && onTrendClick(trend)}
        >
          <TrendCard trend={trend} />
        </div>
      ))}
    </div>
  );
}

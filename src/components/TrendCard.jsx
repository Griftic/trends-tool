import React from 'react';
import './TrendCard.css';

export default function TrendCard({ trend }) {
  const isPositiveInfo = trend.growth >= 0;
  
  // Fonction utilitaire simple pour dessiner une ligne SVG (Sparkline basique)
  const drawSparkline = (data) => {
    if (!data || data.length === 0) return '';
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    // Normaliser sur une hauteur de 40px et largeur de 100%
    const points = data.map((val, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 40 - ((val - min) / range) * 40;
      return `${x},${y}`;
    }).join(' ');
    
    return points;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'exploding': return 'var(--accent-secondary)';
      case 'growing': return 'var(--trend-up)';
      case 'declining': return 'var(--trend-down)';
      default: return 'var(--trend-neutral)';
    }
  };

  const sparklineColor = isPositiveInfo ? 'var(--trend-up)' : 'var(--trend-down)';

  return (
    <div className="glass-panel trend-card animate-fade-in">
      <div className="trend-header">
        <span className="trend-category">{trend.category}</span>
        <div 
          className="trend-status-badge" 
          style={{ 
            backgroundColor: `${getStatusColor(trend.status)}20`,
            color: getStatusColor(trend.status),
            border: `1px solid ${getStatusColor(trend.status)}50`
          }}
        >
          {trend.status.toUpperCase()}
        </div>
      </div>
      
      <h3 className="trend-title">{trend.keyword}</h3>
      <p className="trend-desc">{trend.description}</p>
      
      <div className="trend-metrics">
        <div className="metric">
          <span className="metric-label">Search Volume</span>
          <span className="metric-value">{trend.volume}</span>
        </div>
        <div className="metric">
          <span className="metric-label">Growth (5yr)</span>
          <span className={`metric-value ${isPositiveInfo ? 'positive' : 'negative'}`}>
            {isPositiveInfo ? '+' : ''}{trend.growth}%
          </span>
        </div>
      </div>
      
      <div className="trend-chart">
        <svg viewBox="0 0 100 45" preserveAspectRatio="none" className="sparkline-svg">
          {/* Gradient for fill */}
          <defs>
            <linearGradient id={`grad-${trend.id}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={sparklineColor} stopOpacity="0.4" />
              <stop offset="100%" stopColor={sparklineColor} stopOpacity="0.0" />
            </linearGradient>
          </defs>
          
          <polyline
            fill="none"
            stroke={sparklineColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={drawSparkline(trend.history)}
          />
          <polygon
            fill={`url(#grad-${trend.id})`}
            points={`0,45 ${drawSparkline(trend.history)} 100,45`}
          />
        </svg>
      </div>
    </div>
  );
}

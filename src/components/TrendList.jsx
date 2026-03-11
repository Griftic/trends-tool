import React from 'react';
import TrendCard from './TrendCard';
import { useLanguage } from '../i18n';
import './TrendList.css';

export default function TrendList({ trends, onTrendClick }) {
  const { t } = useLanguage();

  if (!trends || trends.length === 0) {
    return <div className="no-trends">{t('noTrends')}</div>;
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

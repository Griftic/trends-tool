import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { X, TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react';
import { useLanguage } from '../i18n';
import GoogleTrends from './GoogleTrends';
import './TrendModal.css';

export default function TrendModal({ trend, onClose }) {
  const { t, tCat } = useLanguage();

  if (!trend) return null;

  const chartData = trend.history.map((val, index) => ({
    month: `M${index + 1}`,
    value: val
  }));

  const isPositiveInfo = trend.growth >= 0;
  
  const getStatusIcon = (status) => {
    switch(status) {
      case 'exploding': return <Activity size={18} />;
      case 'growing': return <TrendingUp size={18} />;
      case 'declining': return <TrendingDown size={18} />;
      default: return <Minus size={18} />;
    }
  };

  const statusColor = getStatusColor(trend.status);
  const chartColor = isPositiveInfo ? '#10b981' : '#ef4444';

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <div className="modal-badges">
            <span className="badge category-badge">{tCat(trend.category)}</span>
            <span 
              className="badge status-badge"
              style={{ 
                backgroundColor: `${statusColor}20`,
                color: statusColor,
                border: `1px solid ${statusColor}50`
              }}
            >
              {getStatusIcon(trend.status)}
              {t(trend.status).toUpperCase()}
            </span>
          </div>
          <h2>{trend.keyword}</h2>
          <p className="modal-desc">{trend.description}</p>
        </div>

        <div className="modal-stats-grid">
          <div className="stat-box">
            <span className="stat-label">{t('searchVolume')}</span>
            <span className="stat-value">{trend.volume}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">{t('growth')}</span>
            <span className={`stat-value ${isPositiveInfo ? 'text-up' : 'text-down'}`}>
              {isPositiveInfo ? '+' : ''}{trend.growth}%
            </span>
          </div>
        </div>

        <div className="modal-chart-section">
          <h3>{t('interestOverTime')}</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColor} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => val >= 1000 ? `${(val/1000).toFixed(1)}k` : val} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#191c24', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: chartColor }}
                />
                <Area type="monotone" dataKey="value" stroke={chartColor} strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* NOUVEAUTÉ : Widget Live Google Trends */}
        <div className="modal-chart-section" style={{ marginTop: '2.5rem' }}>
          <h3>{t('googleTrendsLive')}</h3>
          <GoogleTrends keyword={trend.keyword} />
        </div>

      </div>
    </div>
  );
}

function getStatusColor(status) {
  switch(status) {
    case 'exploding': return '#ec4899';
    case 'growing': return '#10b981';
    case 'declining': return '#ef4444';
    default: return '#64748b';
  }
}

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Globe } from 'lucide-react';
import TrendList from './components/TrendList';
import TrendModal from './components/TrendModal';
import { mockTrends } from './data/mockTrends';
import { useLanguage } from './i18n';

function App() {
  const { t, tCat, lang, toggleLanguage } = useLanguage();

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedTrend, setSelectedTrend] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(mockTrends.map(t => t.category));
    return ['all', ...Array.from(cats)].sort();
  }, []);

  const filteredTrends = useMemo(() => {
    return mockTrends.filter(t => {
      // Logique existante...
      let matchStatus = false;
      
      if (filterStatus === 'all') {
        matchStatus = true;
      } else if (filterStatus === 'new-emerging') {
        // Détecter un passage de <1000 à >10000 dans l'historique
        const hasLowStart = t.history.some(val => val < 1000); // Note: History mock data is often simulated as index, we check if starting low and ending high (relative volume mapping).
        // Since mock data history ranges usually from 0->2500 max, we analyze the growth instead or check volume string '1.2M' etc.
        // Let's implement the specific logic: History starts <= 1000 AND later > 10000 ? 
        // As our mock data history numbers are smaller (e.g. 5 to 420), we map it: if it grew by > 300% and ends up high.
        // For accurate tracking as requested: We check if there's any value in history < 1000 AND any subsequent value > 10000.
        // We will modify our mock data slightly to accommodate this, or use the volume tag.
        
        // Exact Logic: Check history values directly
        let foundLow = false;
        let foundHigh = false;
        for (let i = 0; i < t.history.length; i++) {
          if (t.history[i] < 1000) foundLow = true;
          if (foundLow && t.history[i] > 10000) foundHigh = true;
        }
        matchStatus = foundHigh;
      } else {
        matchStatus = t.status === filterStatus;
      }

      const matchCategory = filterCategory === 'all' || t.category === filterCategory;
      const matchSearch = t.keyword.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchCategory && matchSearch;
    });
  }, [filterStatus, filterCategory, searchQuery]);

  return (
    <div className="app-container">
      {/* Settings Bar */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '0.5rem' }}>
        <button 
          onClick={toggleLanguage}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: 'var(--bg-card)', color: 'var(--text-main)',
            border: '1px solid var(--border-color)', borderRadius: '20px',
            padding: '0.4rem 1rem', cursor: 'pointer', fontSize: '0.85rem',
            fontWeight: '600'
          }}
        >
          <Globe size={14} />
          {lang === 'fr' ? 'Passer en EN' : 'Switch to FR'}
        </button>
      </div>

      <header className="header" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '1.5rem', borderBottom: 'none', paddingTop: 0 }}>
        <div className="header-title" style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <h1 style={{ fontSize: '3rem' }}>{t('title')}</h1>
          <p style={{ fontSize: '1.1rem' }}>{t('subtitle')}</p>
        </div>
        
        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              className="search-input glass-panel" 
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="filters-row glass-panel" style={{ padding: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div className="filter-group">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginRight: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('statusLabel')}</span>
            {['all', 'new-emerging', 'exploding', 'growing', 'stable', 'declining'].map(status => (
              <button 
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
              >
                {t(status)}
              </button>
            ))}
          </div>

          <div className="filter-group">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginRight: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('industryLabel')}</span>
            <select 
              className="category-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? t('all') : tCat(cat)}
                </option>
              ))}
            </select>
          </div>

        </div>
      </header>

      <main>
        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading signals...</p>
          </div>
        ) : (
          <TrendList trends={filteredTrends} onTrendClick={setSelectedTrend} />
        )}
      </main>

      {selectedTrend && (
        <TrendModal trend={selectedTrend} onClose={() => setSelectedTrend(null)} />
      )}
      
      <footer style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', paddingBottom: '2rem' }}>
        <p>{t('footer')}</p>
      </footer>
    </div>
  );
}

export default App;

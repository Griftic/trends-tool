import React, { useState, useEffect, useMemo } from 'react';
import { Search } from 'lucide-react';
import TrendList from './components/TrendList';
import TrendModal from './components/TrendModal';
import { mockTrends } from './data/mockTrends';

function App() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedTrend, setSelectedTrend] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulation d'un chargement initial (Skeleton)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Extraire les catégories uniques pour le menu déroulant
  const categories = useMemo(() => {
    const cats = new Set(mockTrends.map(t => t.category));
    return ['all', ...Array.from(cats)].sort();
  }, []);

  // Logique de filtrage combinée (Status + Catégorie + Recherche)
  const filteredTrends = useMemo(() => {
    return mockTrends.filter(t => {
      const matchStatus = filterStatus === 'all' || t.status === filterStatus;
      const matchCategory = filterCategory === 'all' || t.category === filterCategory;
      const matchSearch = t.keyword.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchCategory && matchSearch;
    });
  }, [filterStatus, filterCategory, searchQuery]);

  return (
    <div className="app-container">
      <header className="header" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '1.5rem' }}>
        <div className="header-title" style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <h1 style={{ fontSize: '3rem' }}>Emerging Trends</h1>
          <p style={{ fontSize: '1.1rem' }}>Discover explosive growth topics before they peak.</p>
        </div>
        
        {/* Barre de Recherche */}
        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              className="search-input glass-panel" 
              placeholder="Search trends, keywords, or industries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filtres avancés */}
        <div className="filters-row glass-panel" style={{ padding: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div className="filter-group">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginRight: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Growth Status:</span>
            {['all', 'exploding', 'growing', 'stable', 'declining'].map(status => (
              <button 
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="filter-group">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginRight: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Industry:</span>
            <select 
              className="category-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
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
            <p>Analyzing global data signals...</p>
          </div>
        ) : (
          <TrendList trends={filteredTrends} onTrendClick={setSelectedTrend} />
        )}
      </main>

      {/* Rendu Fixe de la Modale */}
      {selectedTrend && (
        <TrendModal trend={selectedTrend} onClose={() => setSelectedTrend(null)} />
      )}
      
      <footer style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', paddingBottom: '2rem' }}>
        <p>Data is mocked for demonstration purposes • v2 Upgrade with Recharts</p>
      </footer>
    </div>
  );
}

export default App;

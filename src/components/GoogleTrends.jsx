import React, { useEffect, useRef } from 'react';

export default function GoogleTrends({ keyword }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Clear container to avoid duplicate widgets on re-renders
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    const script = document.createElement('script');
    script.src = 'https://ssl.gstatic.com/trends_nrtr/3241_RC01/embed_loader.js';
    script.async = true;
    
    script.onload = () => {
      // Small timeout to ensure Trends object is fully ready
      setTimeout(() => {
        if (window.trends && window.trends.embed && containerRef.current) {
          window.trends.embed.renderExploreWidgetTo(
            containerRef.current,
            "TIMESERIES",
            {
              comparisonItem: [{ keyword: keyword, geo: "", time: "today 5-y" }],
              category: 0,
              property: ""
            },
            {
              exploreQuery: `date=today%205-y&q=${encodeURIComponent(keyword)}`,
              guestPath: "https://trends.google.com:443/trends/embed/"
            }
          );
        }
      }, 100);
    };

    document.body.appendChild(script);

    return () => {
      // Clean up the container
      if (containerRef.current) containerRef.current.innerHTML = '';
      
      // Essayer de retirer le script s'il est toujours dans le body
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [keyword]);

  return (
    <div 
      className="google-trends-widget-container" 
      style={{
        width: '100%', 
        minHeight: '450px', 
        backgroundColor: '#fff', 
        borderRadius: '8px', 
        overflow: 'hidden',
        marginTop: '1.5rem',
        padding: '10px' // Ajout de padding pour éviter que le graph touche les bords
      }}
    >
      <div ref={containerRef} style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
}

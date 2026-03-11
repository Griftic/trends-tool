export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Appel au flux RSS de Google Trends
    const response = await fetch('https://trends.google.com/trending/rss?geo=US');
    if (!response.ok) {
        throw new Error(`Google RSS Fetch failed: ${response.statusText}`);
    }
    
    const xmlText = await response.text();
    
    // Extraction manuelle via Regex pour éviter tout crash de dépendance (ex: xml2js) sur Vercel Serverless
    const itemsRegex = /<item>(.*?)<\/item>/gs;
    let match;
    const items = [];
    while ((match = itemsRegex.exec(xmlText)) !== null) {
        items.push(match[1]);
    }
    
    if (items.length === 0) {
      return res.status(200).json([]);
    }

    const discoveredTrends = [];

    // On parcourt les éléments du flux RSS (généralement 20 top sujets de la journée)
    for (let i = 0; i < Math.min(items.length, 10); i++) {
        const itemHtml = items[i];
        
        // Extraction des valeurs avec Regex
        const titleMatch = itemHtml.match(/<title>(.*?)<\/title>/);
        const keyword = titleMatch ? titleMatch[1] : 'Unknown';
        
        // Ex: "<ht:approx_traffic>50,000+</ht:approx_traffic>"
        const trafficMatch = itemHtml.match(/<ht:approx_traffic>(.*?)<\/ht:approx_traffic>/);
        let trafficStr = trafficMatch ? trafficMatch[1] : '1K+';
        
        // Nettoyage de la virgule pour la cohérence ('50,000+' -> '50K')
        trafficStr = trafficStr.replace(/,/g, '').replace(/\+/g, '');
        const trafficNum = parseInt(trafficStr, 10) || 1000;
        
        const finalVolumeStr = trafficNum >= 1000 ? `${(trafficNum/1000).toFixed(0)}K` : trafficStr;

        const descMatch = itemHtml.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) || itemHtml.match(/<description>(.*?)<\/description>/);
        const description = descMatch && descMatch[1] ? descMatch[1] : `Sujet actuellement en tendance majeure sur Google.`;

        // On simule une courbe "Exploding" puisque ce sont stricto sensu les top trends du jour
        // On génère 12 points pour le graphique des 12 derniers mois
        const simulatedHistory = [];
        let currentValue = Math.max(10, trafficNum / 100); // Point de départ bas
        
        for (let j = 0; j < 12; j++) {
            // Croissance exponentielle sur les derniers mois
            if (j > 8) {
                currentValue = currentValue * (1.5 + Math.random());
            } else {
                currentValue = currentValue + (Math.random() * 50 - 20);
            }
            simulatedHistory.push(Math.max(1, Math.floor(currentValue)));
        }
        
        // Le dernier point est la vraie valeur lue
        simulatedHistory[11] = trafficNum;

        // Calcul du pourcentage simulé de croissance
        const firstValue = simulatedHistory[0] || 1;
        let growth = Math.round(((trafficNum - firstValue) / firstValue) * 100);
        if (growth > 5000) growth = Math.floor(Math.random() * 2000) + 500; // Cap pour l'UI

        discoveredTrends.push({
            id: `live-rss-${Date.now()}-${i}`,
            keyword: keyword,
            category: 'Live News',
            growth: growth,
            volume: finalVolumeStr,
            status: 'exploding', // Par définition, le flux RSS ne donne que des sujets en explosion
            description: description,
            history: simulatedHistory
        });
    }

    res.status(200).json(discoveredTrends);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch living trends via RSS', message: err.message });
  }
}

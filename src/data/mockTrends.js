export const mockTrends = [
  // Tech & AI
  { id: '1', keyword: 'AI Video Generators', category: 'Technology', growth: 425, volume: '2.4M', status: 'exploding', description: 'Tools converting text or images to video using generative AI models.', history: [20, 35, 45, 80, 150, 320, 500, 800, 1200, 1800, 2200, 2400] },
  { id: '4', keyword: 'Agentic Workflows', category: 'Technology', growth: 512, volume: '420K', status: 'exploding', description: 'Autonomous AI systems capable of executing multi-step tasks independently.', history: [5, 10, 15, 25, 40, 70, 120, 200, 280, 340, 390, 420] },
  { id: '8', keyword: 'Vector Databases', category: 'Technology', growth: 195, volume: '780K', status: 'growing', description: 'Databases optimized for storing and querying high-dimensional vectors, crucial for LLMs.', history: [80, 100, 150, 220, 300, 400, 480, 550, 620, 680, 740, 780] },
  { id: '11', keyword: 'Small Language Models', category: 'Technology', growth: 340, volume: '550K', status: 'exploding', description: 'Compact AI models (SLMs) designed to run locally on devices with less compute power.', history: [10, 15, 25, 50, 90, 150, 250, 350, 420, 480, 520, 550] },
  { id: '12', keyword: 'RAG Architecture', category: 'Technology', growth: 275, volume: '890K', status: 'growing', description: 'Retrieval-Augmented Generation linking AI to external knowledge bases.', history: [50, 80, 120, 200, 310, 450, 600, 720, 800, 840, 870, 890] },
  
  // Health & Wellness
  { id: '3', keyword: 'GLP-1 Alternatives', category: 'Health', growth: 280, volume: '850K', status: 'growing', description: 'Natural supplements positioning themselves as alternatives to popular weight-loss drugs.', history: [100, 110, 105, 120, 150, 220, 300, 450, 550, 680, 750, 850] },
  { id: '5', keyword: 'Mouth Taping', category: 'Health', growth: 145, volume: '1.2M', status: 'growing', description: 'The practice of taping one\'s mouth shut during sleep to promote nasal breathing.', history: [300, 320, 350, 400, 480, 550, 650, 750, 900, 1000, 1100, 1200] },
  { id: '13', keyword: 'Colostrum Supplement', category: 'Health', growth: 310, volume: '420K', status: 'exploding', description: 'Bovine first-milk supplements trending for gut health and immunity.', history: [20, 25, 30, 45, 70, 120, 180, 250, 320, 380, 400, 420] },
  { id: '14', keyword: 'L-Theanine', category: 'Health', growth: 65, volume: '1.5M', status: 'stable', description: 'Amino acid found in tea used to reduce anxiety, often paired with caffeine.', history: [800, 850, 900, 950, 1000, 1100, 1200, 1300, 1350, 1400, 1450, 1500] },
  { id: '15', keyword: 'Huberman Protocol', category: 'Health', growth: 0, volume: '600K', status: 'declining', description: 'Morning routines and health protocols popularized by specific neuroscientists.', history: [100, 300, 600, 800, 950, 850, 800, 750, 700, 650, 620, 600] },

  // Consumer Goods & Food
  { id: '2', keyword: 'Zyn', category: 'Consumer Goods', growth: 310, volume: '1.8M', status: 'exploding', description: 'Tobacco-free nicotine pouches gaining massive popularity among young adults.', history: [50, 60, 80, 120, 200, 350, 600, 900, 1200, 1500, 1700, 1800] },
  { id: '16', keyword: 'Tinned Fish', category: 'Food', growth: 120, volume: '850K', status: 'growing', description: 'Premium canned seafood (sardines, mackerel) trending as an aesthetic, high-protein snack.', history: [150, 180, 200, 250, 300, 380, 450, 550, 650, 750, 800, 850] },
  { id: '17', keyword: 'Electrolyte Powders', category: 'Food', growth: 85, volume: '2.1M', status: 'stable', description: 'Hydration multipliers replacing traditional sports drinks like Gatorade.', history: [1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100] },
  { id: '18', keyword: 'Mushroom Coffee', category: 'Food', growth: 45, volume: '1.1M', status: 'stable', description: 'Coffee alternatives blended with functional mushrooms like Lion\'s Mane.', history: [500, 600, 700, 800, 850, 900, 950, 1000, 1050, 1050, 1080, 1100] },

  // Fashion & Lifestyle
  { id: '6', keyword: 'Gorpcore', category: 'Fashion', growth: -18, volume: '450K', status: 'declining', description: 'A style focused on utilitarian, functional, outdoors-inspired gear.', history: [400, 450, 550, 650, 700, 680, 650, 600, 550, 500, 480, 450] },
  { id: '19', keyword: 'Quiet Luxury', category: 'Fashion', growth: -25, volume: '380K', status: 'declining', description: 'Minimalist clothing emphasizing high quality materials over visible logos.', history: [200, 400, 700, 900, 800, 700, 600, 550, 500, 450, 400, 380] },
  { id: '20', keyword: 'Mob Wife Aesthetic', category: 'Fashion', growth: 450, volume: '500K', status: 'exploding', description: 'Maximalist style featuring vintage furs, animal prints, and bold gold jewelry.', history: [5, 10, 15, 20, 25, 40, 80, 150, 250, 350, 450, 500] },
  
  // Finance & Business
  { id: '21', keyword: 'Fractional CMO', category: 'Business', growth: 180, volume: '120K', status: 'growing', description: 'Companies hiring part-time Chief Marketing Officers instead of full-time executives.', history: [10, 15, 20, 30, 45, 60, 75, 90, 100, 110, 115, 120] },
  { id: '22', keyword: 'Prop Firm Trading', category: 'Finance', growth: 210, volume: '800K', status: 'growing', description: 'Firms providing capital to retail day traders who pass evaluation challenges.', history: [80, 100, 150, 200, 300, 400, 500, 600, 680, 720, 760, 800] },
  { id: '23', keyword: 'Creator Economy 2.0', category: 'Business', growth: 95, volume: '350K', status: 'stable', description: 'Shift from ad-revenue to direct monetization via subscriptions and owned products.', history: [100, 150, 200, 220, 250, 280, 300, 320, 330, 340, 345, 350] },
  
  // Social & Culture
  { id: '7', keyword: 'De-influencing', category: 'Social', growth: -15, volume: '320K', status: 'declining', description: 'Creators actively telling audiences what NOT to buy, countering traditional models.', history: [100, 250, 450, 600, 700, 650, 550, 450, 400, 350, 330, 320] },
  { id: '24', keyword: 'Digital Nomad Visas', category: 'Social', growth: 225, volume: '650K', status: 'growing', description: 'Programs launched by countries to attract remote workers with favorable tax rates.', history: [50, 80, 120, 180, 250, 350, 450, 520, 580, 610, 630, 650] }
];

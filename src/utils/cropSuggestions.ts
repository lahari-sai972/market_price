import { CropSuggestion, WeatherCondition } from '../types';
import { getAllCities } from './locationData';

// Generate weather data for all cities
const generateWeatherData = () => {
  const cities = getAllCities();
  const weatherData: Record<string, WeatherCondition> = {};
  
  // Regional weather patterns
  const regionalPatterns: Record<string, Partial<WeatherCondition>> = {
    'north': {
      temperature: '20-35°C',
      humidity: '50-70%',
      rainfall: '500-800mm',
      season: 'Semi-arid',
      soilType: 'Alluvial'
    },
    'west': {
      temperature: '22-32°C',
      humidity: '60-75%',
      rainfall: '600-1200mm',
      season: 'Semi-arid to Tropical',
      soilType: 'Black cotton'
    },
    'south': {
      temperature: '24-34°C',
      humidity: '65-80%',
      rainfall: '800-1500mm',
      season: 'Tropical',
      soilType: 'Red laterite'
    },
    'east': {
      temperature: '22-32°C',
      humidity: '70-85%',
      rainfall: '1200-2000mm',
      season: 'Tropical',
      soilType: 'Alluvial'
    }
  };
  
  cities.forEach(city => {
    const cityKey = city.toLowerCase().replace(/\s+/g, '');
    let pattern = regionalPatterns['north']; // default
    
    // Assign regional patterns based on city
    if (['mumbai', 'pune', 'nagpur', 'nashik', 'aurangabad', 'ahmedabad', 'surat', 'vadodara', 'rajkot'].some(c => cityKey.includes(c))) {
      pattern = regionalPatterns['west'];
    } else if (['chennai', 'bangalore', 'mysore', 'coimbatore', 'madurai', 'thiruvananthapuram', 'kochi', 'kozhikode', 'hyderabad', 'warangal', 'visakhapatnam', 'vijayawada'].some(c => cityKey.includes(c))) {
      pattern = regionalPatterns['south'];
    } else if (['kolkata', 'howrah', 'durgapur', 'asansol', 'siliguri', 'bhubaneswar', 'cuttack', 'rourkela'].some(c => cityKey.includes(c))) {
      pattern = regionalPatterns['east'];
    }
    
    weatherData[cityKey] = {
      location: city,
      temperature: pattern.temperature || '25-30°C',
      humidity: pattern.humidity || '60-70%',
      rainfall: pattern.rainfall || '700-900mm',
      season: pattern.season || 'Tropical',
      soilType: pattern.soilType || 'Alluvial'
    };
  });
  
  return weatherData;
};

// Crop suggestions based on location and weather conditions
export const cropSuggestionData: Record<string, CropSuggestion[]> = {
  'delhi': [
    {
      cropName: 'Wheat',
      suitability: 'excellent',
      season: 'Rabi (Oct-Mar)',
      expectedYield: '4.0-4.5 tons/hectare',
      waterRequirement: 'medium',
      soilType: 'Alluvial',
      growthPeriod: '120-150 days',
      marketDemand: 'high',
      description: 'Ideal for Delhi\'s climate with good market demand and stable prices.'
    },
    {
      cropName: 'Mustard',
      suitability: 'excellent',
      season: 'Rabi (Oct-Feb)',
      expectedYield: '1.5-2.0 tons/hectare',
      waterRequirement: 'low',
      soilType: 'Alluvial',
      growthPeriod: '90-120 days',
      marketDemand: 'high',
      description: 'Perfect for winter season with excellent oil content and market value.'
    },
    {
      cropName: 'Maize',
      suitability: 'good',
      season: 'Kharif (Jun-Oct)',
      expectedYield: '5.0-6.0 tons/hectare',
      waterRequirement: 'medium',
      soilType: 'Alluvial',
      growthPeriod: '90-120 days',
      marketDemand: 'medium',
      description: 'Suitable for monsoon season with good yield potential.'
    }
  ],
  'mumbai': [
    {
      cropName: 'Rice',
      suitability: 'excellent',
      season: 'Kharif (Jun-Nov)',
      expectedYield: '3.5-4.0 tons/hectare',
      waterRequirement: 'high',
      soilType: 'Coastal alluvial',
      growthPeriod: '120-150 days',
      marketDemand: 'high',
      description: 'Perfect for high rainfall and humidity conditions of Mumbai region.'
    },
    {
      cropName: 'Sugarcane',
      suitability: 'excellent',
      season: 'Year-round',
      expectedYield: '80-100 tons/hectare',
      waterRequirement: 'high',
      soilType: 'Coastal alluvial',
      growthPeriod: '12-18 months',
      marketDemand: 'high',
      description: 'Thrives in tropical climate with abundant water availability.'
    },
    {
      cropName: 'Cotton',
      suitability: 'moderate',
      season: 'Kharif (May-Oct)',
      expectedYield: '1.5-2.0 tons/hectare',
      waterRequirement: 'medium',
      soilType: 'Coastal alluvial',
      growthPeriod: '180-200 days',
      marketDemand: 'medium',
      description: 'Moderate suitability due to high humidity but good market potential.'
    }
  ],
  'bangalore': [
    {
      cropName: 'Coffee',
      suitability: 'excellent',
      season: 'Year-round',
      expectedYield: '0.8-1.2 tons/hectare',
      waterRequirement: 'medium',
      soilType: 'Red laterite',
      growthPeriod: '3-4 years (perennial)',
      marketDemand: 'high',
      description: 'Ideal climate and soil conditions for premium coffee cultivation.'
    },
    {
      cropName: 'Ragi',
      suitability: 'excellent',
      season: 'Kharif (Jun-Oct)',
      expectedYield: '2.5-3.0 tons/hectare',
      waterRequirement: 'low',
      soilType: 'Red laterite',
      growthPeriod: '90-120 days',
      marketDemand: 'high',
      description: 'Perfect for red soil and moderate rainfall conditions.'
    },
    {
      cropName: 'Maize',
      suitability: 'good',
      season: 'Kharif (Jun-Oct)',
      expectedYield: '4.5-5.5 tons/hectare',
      waterRequirement: 'medium',
      soilType: 'Red laterite',
      growthPeriod: '90-120 days',
      marketDemand: 'medium',
      description: 'Good adaptation to Bangalore\'s climate with decent market demand.'
    }
  ],
  'chennai': [
    {
      cropName: 'Rice',
      suitability: 'excellent',
      season: 'Kharif & Rabi',
      expectedYield: '4.0-5.0 tons/hectare',
      waterRequirement: 'high',
      soilType: 'Alluvial',
      growthPeriod: '120-150 days',
      marketDemand: 'high',
      description: 'Traditional crop with excellent adaptation to Tamil Nadu climate.'
    },
    {
      cropName: 'Groundnut',
      suitability: 'excellent',
      season: 'Kharif (Jun-Oct)',
      expectedYield: '2.0-2.5 tons/hectare',
      waterRequirement: 'medium',
      soilType: 'Alluvial',
      growthPeriod: '100-120 days',
      marketDemand: 'high',
      description: 'Excellent for tropical climate with strong market demand for oil.'
    },
    {
      cropName: 'Cotton',
      suitability: 'good',
      season: 'Kharif (May-Oct)',
      expectedYield: '1.8-2.2 tons/hectare',
      waterRequirement: 'medium',
      soilType: 'Alluvial',
      growthPeriod: '180-200 days',
      marketDemand: 'high',
      description: 'Good potential with proper irrigation and pest management.'
    }
  ],
  'kolkata': [
    {
      cropName: 'Rice',
      suitability: 'excellent',
      season: 'Kharif (Jun-Dec)',
      expectedYield: '4.5-5.5 tons/hectare',
      waterRequirement: 'high',
      soilType: 'Alluvial',
      growthPeriod: '120-150 days',
      marketDemand: 'high',
      description: 'Perfect for Bengal\'s high rainfall and alluvial soil conditions.'
    },
    {
      cropName: 'Jute',
      suitability: 'excellent',
      season: 'Kharif (Apr-Jul)',
      expectedYield: '2.5-3.0 tons/hectare',
      waterRequirement: 'high',
      soilType: 'Alluvial',
      growthPeriod: '120-150 days',
      marketDemand: 'medium',
      description: 'Traditional fiber crop ideal for humid conditions and alluvial soil.'
    },
    {
      cropName: 'Potato',
      suitability: 'good',
      season: 'Rabi (Nov-Mar)',
      expectedYield: '20-25 tons/hectare',
      waterRequirement: 'medium',
      soilType: 'Alluvial',
      growthPeriod: '90-120 days',
      marketDemand: 'high',
      description: 'Good winter crop with excellent market demand and storage potential.'
    }
  ],
  'hyderabad': [
    {
      cropName: 'Cotton',
      suitability: 'excellent',
      season: 'Kharif (May-Oct)',
      expectedYield: '2.0-2.5 tons/hectare',
      waterRequirement: 'medium',
      soilType: 'Black cotton',
      growthPeriod: '180-200 days',
      marketDemand: 'high',
      description: 'Ideal for black cotton soil with excellent fiber quality and market value.'
    },
    {
      cropName: 'Sorghum',
      suitability: 'excellent',
      season: 'Kharif (Jun-Oct)',
      expectedYield: '3.0-3.5 tons/hectare',
      waterRequirement: 'low',
      soilType: 'Black cotton',
      growthPeriod: '90-120 days',
      marketDemand: 'medium',
      description: 'Drought-resistant crop perfect for semi-arid conditions.'
    },
    {
      cropName: 'Maize',
      suitability: 'good',
      season: 'Kharif (Jun-Oct)',
      expectedYield: '4.0-5.0 tons/hectare',
      waterRequirement: 'medium',
      soilType: 'Black cotton',
      growthPeriod: '90-120 days',
      marketDemand: 'medium',
      description: 'Good adaptation with proper irrigation and nutrient management.'
    }
  ],
  'pune': [
    {
      cropName: 'Sugarcane',
      suitability: 'excellent',
      season: 'Year-round',
      expectedYield: '90-120 tons/hectare',
      waterRequirement: 'high',
      soilType: 'Black',
      growthPeriod: '12-18 months',
      marketDemand: 'high',
      description: 'Excellent for Maharashtra\'s black soil with strong sugar industry support.'
    },
    {
      cropName: 'Grapes',
      suitability: 'excellent',
      season: 'Year-round (perennial)',
      expectedYield: '15-20 tons/hectare',
      waterRequirement: 'medium',
      soilType: 'Black',
      growthPeriod: '2-3 years (perennial)',
      marketDemand: 'high',
      description: 'Premium fruit crop with excellent export potential and high returns.'
    },
    {
      cropName: 'Onion',
      suitability: 'good',
      season: 'Rabi (Nov-Apr)',
      expectedYield: '30-40 tons/hectare',
      waterRequirement: 'medium',
      soilType: 'Black',
      growthPeriod: '120-150 days',
      marketDemand: 'high',
      description: 'High-value crop with excellent market demand and storage potential.'
    }
  ],
  'jaipur': [
    {
      cropName: 'Bajra',
      suitability: 'excellent',
      season: 'Kharif (Jun-Oct)',
      expectedYield: '2.0-2.5 tons/hectare',
      waterRequirement: 'low',
      soilType: 'Sandy loam',
      growthPeriod: '75-90 days',
      marketDemand: 'medium',
      description: 'Perfect drought-resistant crop for arid conditions of Rajasthan.'
    },
    {
      cropName: 'Mustard',
      suitability: 'excellent',
      season: 'Rabi (Oct-Feb)',
      expectedYield: '1.2-1.8 tons/hectare',
      waterRequirement: 'low',
      soilType: 'Sandy loam',
      growthPeriod: '90-120 days',
      marketDemand: 'high',
      description: 'Ideal winter crop with excellent oil content and market value.'
    },
    {
      cropName: 'Wheat',
      suitability: 'good',
      season: 'Rabi (Nov-Apr)',
      expectedYield: '2.5-3.5 tons/hectare',
      waterRequirement: 'medium',
      soilType: 'Sandy loam',
      growthPeriod: '120-150 days',
      marketDemand: 'high',
      description: 'Good potential with proper irrigation in winter season.'
    }
  ]
};

// Generate the weather data for all cities
const locationWeatherData = generateWeatherData();

export const getCropSuggestions = (location: string): CropSuggestion[] => {
  const locationKey = location.toLowerCase().replace(/\s+/g, '');
  return cropSuggestionData[locationKey] || [];
};

export const getWeatherInfo = (location: string): WeatherCondition | null => {
  const locationKey = location.toLowerCase().replace(/\s+/g, '');
  return locationWeatherData[locationKey] || null;
};
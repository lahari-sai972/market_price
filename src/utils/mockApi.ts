import { PriceRequest, PriceResponse } from '../types';
import { getAllCities } from './locationData';

// Mock crop prices (price per kg in rupees)
const generateCropPrices = () => {
  const cities = getAllCities();
  const crops = ['wheat', 'rice', 'sugarcane', 'cotton', 'maize'];
  const prices: Record<string, Record<string, number>> = {};
  
  // Base prices for different crops (per kg)
  const basePrices = {
    wheat: 25,
    rice: 45,
    sugarcane: 3.5,
    cotton: 58,
    maize: 22
  };
  
  crops.forEach(crop => {
    prices[crop] = {};
    cities.forEach(city => {
      // Add regional variation (±20% from base price)
      const variation = (Math.random() - 0.5) * 0.4; // ±20%
      const basePrice = basePrices[crop as keyof typeof basePrices];
      prices[crop][city.toLowerCase().replace(/\s+/g, '')] = basePrice * (1 + variation);
    });
  });
  
  return prices;
};

const cropPrices = generateCropPrices();
const staticPrices = {
  'wheat': {
    'delhi': 25.50,
    'mumbai': 27.00,
    'bangalore': 26.25,
    'chennai': 24.75,
    'kolkata': 25.00,
    'hyderabad': 26.50,
    'pune': 26.00,
    'jaipur': 24.50
  },
  'rice': {
    'delhi': 45.00,
    'mumbai': 48.50,
    'bangalore': 46.75,
    'chennai': 44.25,
    'kolkata': 43.00,
    'hyderabad': 45.50,
    'pune': 47.00,
    'jaipur': 42.75
  },
  'sugarcane': {
    'delhi': 3.50,
    'mumbai': 3.75,
    'bangalore': 3.60,
    'chennai': 3.40,
    'kolkata': 3.45,
    'hyderabad': 3.65,
    'pune': 3.70,
    'jaipur': 3.35
  },
  'cotton': {
    'delhi': 58.00,
    'mumbai': 62.50,
    'bangalore': 59.75,
    'chennai': 57.25,
    'kolkata': 56.00,
    'hyderabad': 60.50,
    'pune': 61.00,
    'jaipur': 55.75
  },
  'maize': {
    'delhi': 22.50,
    'mumbai': 24.00,
    'bangalore': 23.25,
    'chennai': 21.75,
    'kolkata': 22.00,
    'hyderabad': 23.50,
    'pune': 23.75,
    'jaipur': 21.50
  }
};

const marketTrends = ['up', 'down', 'stable'] as const;

export const predictPrice = async (request: PriceRequest): Promise<PriceResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const basePrice = cropPrices[request.cropType.toLowerCase()]?.[request.location.toLowerCase()] || 30.00;
  
  // Add some randomization to simulate real market fluctuations
  const fluctuation = (Math.random() - 0.5) * 4; // ±2 rupees
  const pricePerKg = Math.max(basePrice + fluctuation, 5); // Minimum 5 rupees per kg
  
  // Convert tons to kg for calculation (1 ton = 1000 kg)
  const quantityInKg = request.quantity * 1000;
  const totalPrice = pricePerKg * quantityInKg;
  const trend = marketTrends[Math.floor(Math.random() * marketTrends.length)];

  return {
    cropType: request.cropType,
    location: request.location,
    quantity: request.quantity,
    pricePerKg: Math.round(pricePerKg * 100) / 100,
    totalPrice: Math.round(totalPrice * 100) / 100,
    marketTrend: trend,
    lastUpdated: new Date().toLocaleString()
  };
};
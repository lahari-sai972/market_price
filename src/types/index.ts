export interface User {
  id: string;
  email: string;
  name: string;
}

export interface PriceRequest {
  location: string;
  cropType: string;
  quantity: number;
}

export interface PriceResponse {
  cropType: string;
  location: string;
  quantity: number;
  pricePerKg: number;
  totalPrice: number;
  marketTrend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

export interface CropSuggestion {
  cropName: string;
  suitability: 'excellent' | 'good' | 'moderate';
  season: string;
  expectedYield: string;
  waterRequirement: 'low' | 'medium' | 'high';
  soilType: string;
  growthPeriod: string;
  marketDemand: 'high' | 'medium' | 'low';
  description: string;
}

export interface WeatherCondition {
  location: string;
  temperature: string;
  humidity: string;
  rainfall: string;
  season: string;
  soilType: string;
}
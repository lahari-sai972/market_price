import React, { useState, useEffect } from 'react';
import { MapPin, Thermometer, Droplets, Calendar, TrendingUp, Leaf, Award, Clock } from 'lucide-react';
import { getCropSuggestions, getWeatherInfo } from '../utils/cropSuggestions';
import { getStateByCity } from '../utils/locationData';
import { CropSuggestion, WeatherCondition } from '../types';

const CropSuggestions: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [suggestions, setSuggestions] = useState<CropSuggestion[]>([]);
  const [weatherInfo, setWeatherInfo] = useState<WeatherCondition | null>(null);
  const selectedState = selectedLocation ? getStateByCity(selectedLocation) : null;

  const locations = [
    'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Jaipur'
  ];

  useEffect(() => {
    if (selectedLocation) {
      const cropSuggestions = getCropSuggestions(selectedLocation);
      const weather = getWeatherInfo(selectedLocation);
      setSuggestions(cropSuggestions);
      setWeatherInfo(weather);
    } else {
      setSuggestions([]);
      setWeatherInfo(null);
    }
  }, [selectedLocation]);

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case 'excellent':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'good':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getWaterRequirementColor = (requirement: string) => {
    switch (requirement) {
      case 'high':
        return 'text-blue-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getMarketDemandIcon = (demand: string) => {
    switch (demand) {
      case 'high':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'medium':
        return <TrendingUp className="w-4 h-4 text-yellow-600" />;
      case 'low':
        return <TrendingUp className="w-4 h-4 text-red-600" />;
      default:
        return <TrendingUp className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Smart Crop Suggestions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized crop recommendations based on your location's climate, soil conditions, and market demand
          </p>
        </div>

        {/* Location Selection */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <MapPin className="w-6 h-6 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Select Your Location</h2>
          </div>

          <div className="max-w-md">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Choose your location</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Weather Information */}
        {weatherInfo && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <Thermometer className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Climate & Soil Information - {weatherInfo.location}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
                <div className="flex items-center mb-2">
                  <Thermometer className="w-5 h-5 text-orange-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Temperature</h3>
                </div>
                <p className="text-2xl font-bold text-orange-600">{weatherInfo.temperature}</p>
                <p className="text-sm text-gray-600">Average range</p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center mb-2">
                  <Droplets className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Rainfall</h3>
                </div>
                <p className="text-2xl font-bold text-blue-600">{weatherInfo.rainfall}</p>
                <p className="text-sm text-gray-600">Annual average</p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center mb-2">
                  <Leaf className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Soil Type</h3>
                </div>
                <p className="text-lg font-bold text-green-600">{weatherInfo.soilType}</p>
                <p className="text-sm text-gray-600">Primary soil</p>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-purple-600 mr-2" />
                <h3 className="font-semibold text-gray-900 mr-4">Climate Zone:</h3>
                <span className="text-lg font-bold text-purple-600">{weatherInfo.season}</span>
                <span className="ml-2 text-sm text-gray-600">• Humidity: {weatherInfo.humidity}</span>
              </div>
            </div>
          </div>
        )}

        {/* Crop Suggestions */}
        {suggestions.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Leaf className="w-6 h-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Recommended Crops for {selectedLocation}, {selectedState}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestions.map((crop, index) => (
                <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{crop.cropName}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSuitabilityColor(crop.suitability)}`}>
                      {crop.suitability.charAt(0).toUpperCase() + crop.suitability.slice(1)}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{crop.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-600">Season</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{crop.season}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Award className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-600">Expected Yield</span>
                      </div>
                      <span className="text-sm font-semibold text-green-600">{crop.expectedYield}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Droplets className={`w-4 h-4 mr-2 ${getWaterRequirementColor(crop.waterRequirement)}`} />
                        <span className="text-sm text-gray-600">Water Need</span>
                      </div>
                      <span className={`text-sm font-semibold ${getWaterRequirementColor(crop.waterRequirement)}`}>
                        {crop.waterRequirement.charAt(0).toUpperCase() + crop.waterRequirement.slice(1)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-600">Growth Period</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{crop.growthPeriod}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {getMarketDemandIcon(crop.marketDemand)}
                        <span className="text-sm text-gray-600 ml-2">Market Demand</span>
                      </div>
                      <span className={`text-sm font-semibold ${
                        crop.marketDemand === 'high' ? 'text-green-600' :
                        crop.marketDemand === 'medium' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {crop.marketDemand.charAt(0).toUpperCase() + crop.marketDemand.slice(1)}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex items-center">
                        <Leaf className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-600">Soil: </span>
                        <span className="text-sm font-semibold text-gray-900 ml-1">{crop.soilType}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Tips */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
              <h3 className="font-semibold text-gray-900 mb-3">💡 Smart Farming Tips for {selectedLocation}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <p className="mb-2">• Consider crop rotation to maintain soil health</p>
                  <p className="mb-2">• Monitor weather forecasts for optimal planting times</p>
                  <p>• Use drip irrigation for water conservation</p>
                </div>
                <div>
                  <p className="mb-2">• Test soil regularly for nutrient management</p>
                  <p className="mb-2">• Choose disease-resistant varieties when available</p>
                  <p>• Plan harvest timing based on market price trends</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Location Selected */}
        {!selectedLocation && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Leaf className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Discover Perfect Crops for Your Region</h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Select your location above to get personalized crop recommendations based on local climate conditions, 
              soil type, water availability, and market demand. Our AI-powered suggestions help you make informed 
              farming decisions for maximum profitability.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Thermometer className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Climate Analysis</h4>
                <p className="text-sm text-gray-600">Temperature, rainfall, and humidity data</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Soil Compatibility</h4>
                <p className="text-sm text-gray-600">Soil type and nutrient requirements</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Market Insights</h4>
                <p className="text-sm text-gray-600">Demand trends and profitability</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropSuggestions;
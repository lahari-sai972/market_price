import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { MapPin, Wheat, Package, TrendingUp, TrendingDown, Minus, Calculator } from 'lucide-react';

import { predictPrice } from '../utils/mockApi';
import { PriceResponse } from '../types';
import { statesAndCities, getCitiesByState } from '../utils/locationData';

// Moved outside the component to prevent re-creating the array on every render
const CROP_TYPES = ['Wheat', 'Rice', 'Sugarcane', 'Cotton', 'Maize'];

const PricePredictor: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    state: '',
    location: '',
    cropType: '',
    quantity: ''
  });
  const [prediction, setPrediction] = useState<PriceResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  useEffect(() => {
    if (formData.state) {
      const cities = getCitiesByState(formData.state);
      setAvailableCities(cities);
      setFormData(prev => ({ ...prev, location: '' }));
    } else {
      setAvailableCities([]);
    }
  }, [formData.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.location || !formData.cropType || !formData.quantity) {
      setError(t('errorFillFields'));
      return;
    }

    const quantityStr = formData.quantity.trim();
    if (!/^\d*\.?\d+$/.test(quantityStr)) {
      setError(t('errorValidQuantity'));
      return;
    }

    const quantity = parseFloat(quantityStr);
    if (isNaN(quantity) || quantity <= 0) {
      setError(t('errorValidQuantity'));
      return;
    }

    setIsLoading(true);
    try {
      const result = await predictPrice({
        location: formData.location,
        cropType: formData.cropType,
        quantity: quantity
      });
      setPrediction(result);
    } catch (err) {
      setError(t('errorPredictionFailed'));
      setPrediction(null); // Clear stale data on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getTrendDetails = (trend: string) => {
    switch (trend) {
      case 'up':
        return { 
          icon: <TrendingUp className="w-5 h-5 text-green-500" />, 
          color: 'text-green-600' 
        };
      case 'down':
        return { 
          icon: <TrendingDown className="w-5 h-5 text-red-500" />, 
          color: 'text-red-600' 
        };
      default:
        return { 
          icon: <Minus className="w-5 h-5 text-gray-500" />, 
          color: 'text-gray-600' 
        };
    }
  };

  const trendDetails = prediction ? getTrendDetails(prediction.marketTrend) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Price Prediction Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Calculator className="w-6 h-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">{t('pricePrediction')}</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('state')}
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="">{t('selectState')}</option>
                    {statesAndCities.map((state) => (
                      <option key={state.name} value={state.name}>
                        {t(state.name)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('city')}
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    disabled={!formData.state}
                    required
                  >
                    <option value="">{formData.state ? t('selectCity') : t('selectStateFirst')}</option>
                    {availableCities.map((city) => (
                      <option key={city} value={city}>
                        {t(city)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="cropType" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('cropType')}
                </label>
                <div className="relative">
                  <Wheat className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    id="cropType"
                    name="cropType"
                    value={formData.cropType}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="">{t('selectCropType')}</option>
                    {CROP_TYPES.map((crop) => (
                      <option key={crop} value={crop}>
                        {t(crop)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('quantityTons')}
                </label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    placeholder={t('enterQuantity')}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              {error && (
                <div 
                  role="alert" 
                  aria-live="assertive" 
                  className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {t('calculatingPrice')}
                  </div>
                ) : (
                  t('getPricePrediction')
                )}
              </button>
            </form>
          </div>

          {/* Price Results */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('priceInformation')}</h2>

            {prediction && trendDetails ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-amber-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t(prediction.cropType)} - {t(prediction.location)}
                    </h3>
                    <div className="flex items-center">
                      {trendDetails.icon}
                      <span className={`ml-2 text-sm font-medium ${trendDetails.color}`}>
                        {t(prediction.marketTrend)} {/* Fixed translation call */}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-sm text-gray-600 mb-1">{t('pricePerKg')}</p>
                      <p className="text-2xl font-bold text-green-600">₹{prediction.pricePerKg}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-sm text-gray-600 mb-1">{t('quantity')}</p>
                      <p className="text-2xl font-bold text-gray-900">{prediction.quantity} {t('tons')}</p>
                    </div>
                  </div>

                  <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">{t('totalEstimatedValue')}</p>
                    <p className="text-3xl font-bold text-amber-600">₹{prediction.totalPrice.toLocaleString()}</p>
                  </div>

                  <div className="mt-4 text-xs text-gray-500">
                    {t('lastUpdated')}: {prediction.lastUpdated}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">{t('marketInsights')}</h4>
                  <p className="text-sm text-blue-800">
                    {t('currentMarketTrendFor')} {t(prediction.cropType)} {t('in')} {t(prediction.location)} {t('is')}{' '}
                    <span className={`font-semibold ${trendDetails.color}`}>
                      {t(prediction.marketTrend)} {/* Fixed translation call */}
                    </span>
                    . {t('pricesBasedOnInfo')}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noPredictionYet')}</h3>
                <p className="text-gray-600">
                  {t('enterCropDetailsText')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricePredictor;
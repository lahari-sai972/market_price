import React from 'react';
import { Calculator, MessageCircle, Wheat, LogOut, Lightbulb } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavigationProps {
  currentPage: 'predictor' | 'contact' | 'suggestions';
  onPageChange: (page: 'predictor' | 'contact' | 'suggestions') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const { user, logout } = useAuth();

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <Wheat className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AgriPrice Pro</h1>
              <p className="text-sm text-gray-600">Market Price Predictor</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-6">
              <button
                onClick={() => onPageChange('predictor')}
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === 'predictor'
                    ? 'bg-green-100 text-green-700 font-medium'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Calculator className="w-4 h-4 mr-2" />
                Price Predictor
              </button>
              <button
                onClick={() => onPageChange('suggestions')}
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === 'suggestions'
                    ? 'bg-green-100 text-green-700 font-medium'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Crop Suggestions
              </button>
              <button
                onClick={() => onPageChange('contact')}
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === 'contact'
                    ? 'bg-green-100 text-green-700 font-medium'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact
              </button>
            </nav>

            {/* User Info and Logout */}
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-gray-600">Welcome back,</p>
                <p className="font-semibold text-gray-900 capitalize">{user?.name}</p>
              </div>
              <button
                onClick={logout}
                className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex space-x-2">
            <button
              onClick={() => onPageChange('predictor')}
              className={`p-2 rounded-lg transition-all duration-200 ${
                currentPage === 'predictor'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Calculator className="w-5 h-5" />
            </button>
            <button
              onClick={() => onPageChange('suggestions')}
              className={`p-2 rounded-lg transition-all duration-200 ${
                currentPage === 'suggestions'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Lightbulb className="w-5 h-5" />
            </button>
            <button
              onClick={() => onPageChange('contact')}
              className={`p-2 rounded-lg transition-all duration-200 ${
                currentPage === 'contact'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
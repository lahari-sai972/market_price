import React, { useState } from 'react';
import Navigation from './Navigation';
import PricePredictor from './PricePredictor';
import CropSuggestions from './CropSuggestions';
import ContactPage from './ContactPage';

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'predictor' | 'contact' | 'suggestions'>('predictor');

  const handlePageChange = (page: 'predictor' | 'contact' | 'suggestions') => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
      <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
      
      {currentPage === 'predictor' && <PricePredictor />}
      {currentPage === 'suggestions' && <CropSuggestions />}
      {currentPage === 'contact' && <ContactPage />}
    </div>
  );
};

export default Dashboard;
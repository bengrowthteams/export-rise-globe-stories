
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleReturnToMap = () => {
    console.log('404 Return to Map clicked - preserving filters');
    
    // Save current filter state before navigating (if any exists)
    const currentFilters = sessionStorage.getItem('selectedSectors');
    if (currentFilters) {
      sessionStorage.setItem('filtersToRestore', currentFilters);
    }
    
    // Use simple navigation
    navigate('/');
    
    // Ensure we scroll to map section after navigation
    setTimeout(() => {
      const mapSection = document.getElementById('map-section');
      if (mapSection) {
        const navHeight = 56;
        const elementPosition = mapSection.offsetTop;
        const offsetPosition = elementPosition - navHeight;
        
        window.scrollTo({ 
          top: offsetPosition, 
          behavior: 'smooth' 
        });
        console.log('Scrolled to map section from 404 page');
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <button 
          onClick={handleReturnToMap}
          className="text-blue-500 hover:text-blue-700 underline"
        >
          Return to Map
        </button>
      </div>
    </div>
  );
};

export default NotFound;

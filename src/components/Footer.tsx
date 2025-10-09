import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <a 
            href="https://www.growth-teams.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center hover:opacity-60 transition-opacity duration-200"
          >
            <img 
              src="/lovable-uploads/6660cc2f-78f5-40c9-9279-abe45f6d3098.png" 
              alt="Growth Teams" 
              className="h-10 w-auto opacity-80"
            />
          </a>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Growth Teams. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import { Link } from 'react-router-dom';
import BulkLinkGenerator from '../components/features/linkGenerator/BulkLinkGenerator';

const HomePage = () => {
  return (
    <div>
      <div className="absolute top-4 right-4">
        <Link
          to="/"
          className="px-4 py-2 text-blue-100 hover:text-white transition-colors"
        >
          ← Back to Welcome
        </Link>
      </div>
      <BulkLinkGenerator />
    </div>
  );
};

export default HomePage;
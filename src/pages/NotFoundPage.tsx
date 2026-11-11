import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="container" style={{ padding: 'var(--space-16) 0', textAlign: 'center' }}>
      <div className="empty-state" style={{ maxWidth: '520px', margin: '0 auto' }}>
        <div className="empty-state-icon">
          <FileQuestion size={36} />
        </div>
        <h1 className="empty-state-title">Page Not Found</h1>
        <p className="empty-state-desc">
          The page you are trying to visit does not exist or has been moved. Use the navigation links to continue browsing.
        </p>
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={16} />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
};


import React from 'react';
import { Star } from 'lucide-react';

interface RatingBadgeProps {
  rating: number;
  ratingCount: number;
  showSampleLabel?: boolean;
}

export const RatingBadge: React.FC<RatingBadgeProps> = ({
  rating,
  ratingCount,
  showSampleLabel = false,
}) => {
  return (
    <div className="product-card-rating" title="Demo rating based on sample product catalogue data">
      <Star size={14} className="rating-star" fill="currentColor" />
      <span style={{ fontWeight: 600 }}>{rating.toFixed(1)}</span>
      <span>({ratingCount})</span>
      {showSampleLabel && (
        <span className="demo-rating-note">• Demo Data</span>
      )}
    </div>
  );
};


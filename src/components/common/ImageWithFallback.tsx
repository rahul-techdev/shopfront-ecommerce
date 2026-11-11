import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc,
  className,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  // Clean minimal SVG placeholder with subtle geometric pattern
  const defaultFallback =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600" fill="#F1F3F5">
        <rect width="600" height="600" fill="#F1F3F5"/>
        <circle cx="300" cy="270" r="70" fill="#E2E8F0"/>
        <path d="M180 430 L260 330 L340 430 Z" fill="#CBD5E1"/>
        <path d="M300 430 L380 350 L450 430 Z" fill="#94A3B8"/>
        <text x="300" y="490" font-family="sans-serif" font-size="18" font-weight="600" fill="#64748B" text-anchor="middle">Product Image Preview</text>
      </svg>`
    );

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
    }
  };

  return (
    <img
      src={hasError ? fallbackSrc || defaultFallback : src}
      alt={alt}
      onError={handleError}
      loading="lazy"
      className={className}
      {...props}
    />
  );
};


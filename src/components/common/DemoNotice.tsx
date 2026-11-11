import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface DemoNoticeProps {
  variant?: 'banner' | 'callout';
  message?: string;
}

export const DemoNotice: React.FC<DemoNoticeProps> = ({
  variant = 'banner',
  message = 'Student Portfolio Demo: This is a frontend demonstration e-commerce storefront. No real payments, banking credentials, or orders are processed.',
}) => {
  if (variant === 'callout') {
    return (
      <div className="demo-callout-box" role="note">
        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
          <ShieldAlert size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong>Demonstration Only:</strong> {message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <aside className="demo-banner" aria-label="Portfolio Demonstration Notice">
      <span className="demo-tag">Student Demo</span>
      <span>{message}</span>
    </aside>
  );
};

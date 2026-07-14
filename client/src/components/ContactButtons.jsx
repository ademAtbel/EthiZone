import React from 'react';
import { useApp } from '../context/AppContext';

export default function ContactButtons({ phoneNumber, onMessage }) {
  const { t } = useApp();
  
  const handleCall = () => {
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`;
    }
  };

  return (
    <div className="contact-buttons-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {/* Message Button */}
      <button
        type="button"
        onClick={onMessage}
        className="contact-btn message-btn"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
        <span>Message</span>
      </button>

      {/* Phone Button */}
      <button
        type="button"
        onClick={handleCall}
        className="contact-btn call-btn"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        <span>Call</span>
      </button>

      <style>{`
        .contact-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 6px;
          padding: 8px 16px;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s ease-in-out;
          cursor: pointer;
          outline: none;
          flex: 1;
          justify-content: center;
        }

        .message-btn {
          background-color: #2F6F3A;
          color: white;
          border: 1px solid #2F6F3A;
        }
        .message-btn:hover {
          background-color: #255C30;
          border-color: #255C30;
        }
        .message-btn:focus {
          box-shadow: 0 0 0 2px rgba(47, 111, 58, 0.4);
        }

        .call-btn {
          background-color: #ffffff;
          color: #1f2937;
          border: 1px solid #d1d5db;
        }
        .call-btn:hover {
          background-color: #f3f4f6;
        }
        .call-btn:focus {
          box-shadow: 0 0 0 2px rgba(47, 111, 58, 0.4);
        }

        /* Dark mode overrides (assuming body.dark-theme is used in your app) */
        body:not(.light-theme) .call-btn {
          background-color: #0A1128;
          border-color: #374151;
          color: #ffffff;
        }
        body:not(.light-theme) .call-btn:hover {
          background-color: #152447;
        }
      `}</style>
    </div>
  );
}

import React from 'react';

export default function GoogleAuthButton({ className, onClick }) {
  const handleGoogleClick = (e) => {
    if (onClick) {
      onClick(e);
    } else {
      alert("Google Sign-In is under construction! Please register with your email and phone number.");
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className={`google-auth-btn ${className || ''}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        width: '100%',
        padding: '12px 16px',
        background: '#ffffff',
        border: '1px solid #dadce0',
        borderRadius: '8px',
        color: '#3c4043',
        fontSize: '0.95rem',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.2s, box-shadow 0.2s',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        marginBottom: '16px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f8f9fa';
        e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#ffffff';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18">
        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
        <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.938 5.48 18 9 18z" fill="#34A853"/>
        <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.995 8.995 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
        <path d="M9 3.58c1.32 0 2.508.454 3.44 1.345l2.582-2.58C13.463.806 11.426 0 9 0 5.48 0 2.438 2.062.957 5.038l3.007 2.332C4.672 5.164 6.656 3.58 9 3.58z" fill="#EA4335"/>
      </svg>
      <span>Continue with Google</span>
    </button>
  );
}

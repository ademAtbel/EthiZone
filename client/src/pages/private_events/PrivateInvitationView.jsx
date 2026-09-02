import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Lock, ShieldAlert, CheckCircle, Calendar, MapPin, QrCode, Send, PhoneCall } from 'lucide-react';
import PrivateEventGallery from './PrivateEventGallery';

const PrivateInvitationView = () => {
  const { token } = useParams();

  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [requiresPhone, setRequiresPhone] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Event & Guest Data
  const [eventData, setEventData] = useState(null);
  const [guestData, setGuestData] = useState(null);

  // RSVP Form State
  const [rsvpStatus, setRsvpStatus] = useState('attending');
  const [plusOnesCount, setPlusOnesCount] = useState(0);
  const [dietary, setDietary] = useState('');
  const [message, setMessage] = useState('');
  const [rsvpSubmitting, setRsvpSubmitting] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  const verifyInvitation = async (phoneInput) => {
    try {
      setLoading(true);
      setErrorMsg('');

      const res = await fetch('/api/private-events/verify-invitation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, phone: phoneInput || phone })
      });

      const data = await res.json();

      if (res.status === 401 && data.requiresPhoneVerification) {
        setRequiresPhone(true);
        setAuthorized(false);
        return;
      }

      if (!res.ok || !data.authorized) {
        setAuthorized(false);
        setErrorMsg(data.message || 'ACCESS DENIED: Unauthorized guest link.');
        return;
      }

      // Authorization Granted!
      setAuthorized(true);
      setEventData(data.event);
      setGuestData(data.guest);
      if (data.guest.status !== 'invited') setRsvpStatus(data.guest.status);
      if (data.guest.plusOnesCount) setPlusOnesCount(data.guest.plusOnesCount);
      if (data.guest.dietaryRestrictions) setDietary(data.guest.dietaryRestrictions);
      if (data.guest.messageToHost) setMessage(data.guest.messageToHost);

    } catch (err) {
      setErrorMsg('Network error verifying invitation.');
      setAuthorized(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      verifyInvitation('');
    }
  }, [token]);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (!phone) return;
    verifyInvitation(phone);
  };

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    try {
      setRsvpSubmitting(true);
      const res = await fetch('/api/private-events/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          phone,
          status: rsvpStatus,
          plusOnesCount,
          dietaryRestrictions: dietary,
          messageToHost: message
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setRsvpSuccess(true);
      setGuestData(data.guest);
      setTimeout(() => setRsvpSuccess(false), 3000);
    } catch (err) {
      alert(err.message);
    } finally {
      setRsvpSubmitting(false);
    }
  };

  const design = eventData?.design || {};
  const primaryColor = design.primaryColor || '#c5a85a';

  return (
    <div className="private-invitation-wrapper py-5 px-3" style={{ minHeight: '100vh', background: 'var(--bg-app)', color: 'var(--text-main)' }}>
      <div className="container max-w-xl mx-auto" style={{ maxWidth: '600px' }}>
        
        {/* ========================================================= */}
        {/* 1. ACCESS DENIED / PHONE VERIFICATION SCREEN              */}
        {/* ========================================================= */}
        {!authorized ? (
          <div className="glass-panel p-5 rounded-3 text-center shadow-lg" style={{ border: '2px solid rgba(239, 68, 68, 0.3)' }}>
            <div className="mb-4">
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                <Lock size={36} />
              </div>
            </div>

            <h3 className="fw-bold mb-2">Private Event Security Verification</h3>
            <p className="text-muted text-sm mb-4">
              This invitation is private and encrypted. Please enter your phone number to verify authorization.
            </p>

            {errorMsg && (
              <div className="alert alert-danger text-sm p-3 mb-4 rounded-3 d-flex align-items-center justify-content-center gap-2">
                <ShieldAlert size={18} /> {errorMsg}
              </div>
            )}

            <form onSubmit={handlePhoneSubmit} className="max-w-xs mx-auto">
              <div className="mb-3 position-relative">
                <PhoneCall size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
                <input 
                  type="text" 
                  className="form-control text-center text-lg fw-bold tracking-wider" 
                  style={{ paddingLeft: '40px' }}
                  placeholder="e.g. 5713429228"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required 
                />
              </div>
              <button type="submit" disabled={loading} className="btn btn-primary w-100 py-2 fw-semibold">
                {loading ? 'Verifying Phone Authorization...' : 'Verify Access'}
              </button>
            </form>
          </div>
        ) : (

          /* ========================================================= */
          /* 2. AUTHORIZED GUEST INVITATION CARD                        */
          /* ========================================================= */
          <div className="invitation-card-container">
            
            {/* Top Guest Greeting Banner */}
            <div className="alert alert-success text-center text-sm py-2 mb-3 rounded-3 d-flex align-items-center justify-content-center gap-2">
              <CheckCircle size={16} /> Verified Invited Guest: <strong>{guestData.name}</strong>
            </div>

            {/* Main Styled Invitation Box */}
            <div 
              className="glass-panel rounded-3 overflow-hidden shadow-2xl"
              style={{ 
                border: `2px solid ${primaryColor}`,
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                color: '#ffffff'
              }}
            >
              {design.coverPhoto && (
                <img src={design.coverPhoto} alt="Cover" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
              )}

              <div className="p-4 p-md-5 text-center">
                <span className="badge bg-secondary text-uppercase mb-2 tracking-widest">{eventData.eventType}</span>
                <h1 style={{ fontFamily: design.fontFamily === 'serif' ? 'Georgia, serif' : 'Inter, sans-serif', color: primaryColor, fontSize: '2.2rem', fontWeight: '800', margin: '10px 0' }}>
                  {eventData.eventTitle}
                </h1>

                <p style={{ fontStyle: 'italic', color: '#cbd5e1', fontSize: '0.95rem', margin: '15px 0 30px 0' }}>
                  "{design.customMessage || eventData.description || 'We request the honor of your presence.'}"
                </p>

                {/* Event Schedule Info Box */}
                <div className="glass-panel p-3 mb-4 rounded-3 text-start" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Calendar size={18} style={{ color: primaryColor }} />
                    <span className="fw-semibold" style={{ fontSize: '0.95rem' }}>
                      {new Date(eventData.eventDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {eventData.eventTime}
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <MapPin size={18} style={{ color: primaryColor }} />
                    <span style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
                      <strong>{eventData.venueName}</strong> — {eventData.address}
                    </span>
                  </div>
                </div>

                {/* RSVP Form */}
                <div className="rsvp-section p-4 rounded-3 text-start mb-4" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <h5 className="fw-bold mb-3" style={{ color: primaryColor }}>Confirm Your Attendance (RSVP)</h5>
                  
                  {rsvpSuccess && (
                    <div className="alert alert-success text-sm py-2 mb-3">RSVP updated successfully!</div>
                  )}

                  <form onSubmit={handleRsvpSubmit}>
                    <div className="mb-3">
                      <label className="form-label text-xs fw-semibold text-light">Attending Status</label>
                      <div className="btn-group w-100" role="group">
                        <button 
                          type="button" 
                          className={`btn btn-sm ${rsvpStatus === 'attending' ? 'btn-success' : 'btn-outline-light'}`}
                          onClick={() => setRsvpStatus('attending')}
                        >
                          Will Attend
                        </button>
                        <button 
                          type="button" 
                          className={`btn btn-sm ${rsvpStatus === 'maybe' ? 'btn-warning text-dark' : 'btn-outline-light'}`}
                          onClick={() => setRsvpStatus('maybe')}
                        >
                          Maybe
                        </button>
                        <button 
                          type="button" 
                          className={`btn btn-sm ${rsvpStatus === 'declined' ? 'btn-danger' : 'btn-outline-light'}`}
                          onClick={() => setRsvpStatus('declined')}
                        >
                          Regretfully Decline
                        </button>
                      </div>
                    </div>

                    {rsvpStatus === 'attending' && eventData.settings?.allowPlusOne && (
                      <div className="mb-3">
                        <label className="form-label text-xs fw-semibold text-light">Additional Plus-Ones Count</label>
                        <input 
                          type="number" 
                          min={0} 
                          max={5}
                          className="form-control form-control-sm"
                          value={plusOnesCount}
                          onChange={(e) => setPlusOnesCount(e.target.value)}
                        />
                      </div>
                    )}

                    <div className="mb-3">
                      <label className="form-label text-xs fw-semibold text-light">Dietary Restrictions / Special Requests</label>
                      <input 
                        type="text" 
                        className="form-control form-control-sm"
                        placeholder="e.g. Vegetarian, Allergy to nuts..."
                        value={dietary}
                        onChange={(e) => setDietary(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label text-xs fw-semibold text-light">Message for Host</label>
                      <textarea 
                        className="form-control form-control-sm"
                        rows={2}
                        placeholder="Warm wishes for the host..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>

                    <button type="submit" disabled={rsvpSubmitting} className="btn btn-primary btn-sm w-100 d-flex align-items-center justify-content-center gap-1">
                      <Send size={14} /> Submit RSVP Response
                    </button>
                  </form>
                </div>

                {/* Personalized Entry Pass QR Ticket */}
                <div className="qr-ticket-box p-3 rounded-3 text-center" style={{ background: '#ffffff', color: '#0f172a' }}>
                  <div className="text-xs font-monospace text-uppercase mb-1" style={{ letterSpacing: '2px' }}>Personal Gate Check-In Pass</div>
                  <div className="fw-bold fs-5 mb-2">{guestData.name}</div>
                  <div style={{ background: '#f8fafc', padding: '16px', display: 'inline-block', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
                    <QrCode size={120} style={{ color: '#0f172a' }} />
                  </div>
                  <div className="text-xs font-monospace text-muted mt-2">Ticket Code: {guestData.inviteToken}</div>
                </div>

              </div>
            </div>

            {/* Post-Event Gallery */}
            <PrivateEventGallery eventId={eventData.id} />
          </div>
        )}

      </div>
    </div>
  );
};

export default PrivateInvitationView;

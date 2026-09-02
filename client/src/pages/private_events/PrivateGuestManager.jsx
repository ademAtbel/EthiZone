import React, { useState, useEffect } from 'react';
import { UserPlus, Copy, Trash2, CheckCircle, Clock, AlertCircle, QrCode, Search } from 'lucide-react';

const PrivateGuestManager = ({ eventId, token }) => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copiedToken, setCopiedToken] = useState(null);

  // Single Guest Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [group, setGroup] = useState('General');
  const [submitting, setSubmitting] = useState(false);

  // Bulk Add State
  const [bulkText, setBulkText] = useState('');
  const [showBulk, setShowBulk] = useState(false);

  // Search filter
  const [searchTerm, setSearchTerm] = useState('');

  // QR Scan Modal State
  const [scanToken, setScanToken] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [scanning, setScanning] = useState(false);

  const fetchGuests = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/private-events/${eventId}/guests`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        setGuests(data);
      } else {
        setError(data.message || 'Failed to load guest list');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId && token) {
      fetchGuests();
    }
  }, [eventId, token]);

  const handleAddGuest = async (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    try {
      setSubmitting(true);
      const res = await fetch(`/api/private-events/${eventId}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ guests: [{ name, phone, group }] })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setName('');
      setPhone('');
      fetchGuests();
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBulkAdd = async (e) => {
    e.preventDefault();
    if (!bulkText) return;

    const lines = bulkText.split('\n');
    const guestList = [];

    for (const line of lines) {
      const parts = line.split(',').map(p => p.trim());
      if (parts.length >= 2) {
        guestList.push({
          name: parts[0],
          phone: parts[1],
          group: parts[2] || 'General'
        });
      }
    }

    if (guestList.length === 0) {
      alert('Please use comma separated format: Name, Phone Number, Group');
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`/api/private-events/${eventId}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ guests: guestList })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setBulkText('');
      setShowBulk(false);
      fetchGuests();
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteGuest = async (guestId) => {
    if (!window.confirm('Are you sure you want to remove this guest from the invitation list?')) return;

    try {
      const res = await fetch(`/api/private-events/${eventId}/guests/${guestId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setGuests(guests.filter(g => g._id !== guestId));
      }
    } catch (err) {
      alert('Error removing guest');
    }
  };

  const copyInvitationLink = (guest) => {
    const inviteUrl = `${window.location.origin}/invitation/${guest.inviteToken}`;
    navigator.clipboard.writeText(inviteUrl);
    setCopiedToken(guest.inviteToken);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const handleQrCheckIn = async (e) => {
    e.preventDefault();
    if (!scanToken) return;

    try {
      setScanning(true);
      setScanResult(null);
      const res = await fetch('/api/private-events/check-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ token: scanToken })
      });
      const data = await res.json();
      setScanResult(data);
      fetchGuests();
    } catch (err) {
      setScanResult({ valid: false, message: 'Check-in request error' });
    } finally {
      setScanning(false);
    }
  };

  const filteredGuests = guests.filter(g => 
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    g.phone.includes(searchTerm) ||
    g.group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="guest-manager-container">
      {/* Top Header & Stats */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h4 style={{ margin: 0, fontWeight: 700, color: 'var(--text-main)' }}>Guest List & Invitation Links</h4>
          <span className="text-muted text-xs">Manage phone-verified invitations, RSVPs, and QR check-ins.</span>
        </div>
        <div className="d-flex gap-2">
          <button onClick={() => setShowBulk(!showBulk)} className="btn btn-secondary btn-sm">
            {showBulk ? 'Single Add' : 'Bulk Paste Import'}
          </button>
          <button 
            onClick={() => { setScanToken(''); setScanResult(null); }} 
            data-bs-toggle="modal"
            data-bs-target="#qrCheckInModal"
            className="btn btn-primary btn-sm d-flex align-items-center gap-1"
          >
            <QrCode size={16} /> Check-In QR Scanner
          </button>
        </div>
      </div>

      {/* Guest Add Forms */}
      {!showBulk ? (
        <form onSubmit={handleAddGuest} className="glass-panel p-3 mb-4 rounded-3 d-flex gap-2 flex-wrap align-items-end">
          <div className="flex-grow-1" style={{ minWidth: '160px' }}>
            <label className="form-label text-xs fw-semibold">Guest Name</label>
            <input 
              type="text" 
              className="form-control text-sm" 
              placeholder="e.g. Abebe Bikila"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex-grow-1" style={{ minWidth: '160px' }}>
            <label className="form-label text-xs fw-semibold">Guest Phone Number</label>
            <input 
              type="text" 
              className="form-control text-sm" 
              placeholder="e.g. 5713429228"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div style={{ width: '130px' }}>
            <label className="form-label text-xs fw-semibold">Group</label>
            <select className="form-select text-sm" value={group} onChange={(e) => setGroup(e.target.value)}>
              <option value="General">General</option>
              <option value="Family">Family</option>
              <option value="VIP">VIP</option>
              <option value="Friends">Friends</option>
              <option value="Colleagues">Colleagues</option>
            </select>
          </div>
          <button type="submit" disabled={submitting} className="btn btn-primary text-sm d-flex align-items-center gap-1">
            <UserPlus size={16} /> Add Guest
          </button>
        </form>
      ) : (
        <form onSubmit={handleBulkAdd} className="glass-panel p-3 mb-4 rounded-3">
          <label className="form-label text-xs fw-semibold">Bulk Paste (Comma Separated: Name, Phone, Group)</label>
          <textarea 
            className="form-control text-sm mb-2"
            rows={4}
            placeholder={`Abebe Bikila, 5713429228, Family\nTadesse Worku, 2025550199, VIP`}
            value={bulkText}
            onChange={(e) => setBulkText(e.target.value)}
          />
          <button type="submit" disabled={submitting} className="btn btn-primary btn-sm">
            Import Guest List
          </button>
        </form>
      )}

      {/* Search Input */}
      <div className="position-relative mb-3">
        <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: '#94a3b8' }} />
        <input 
          type="text"
          className="form-control text-sm"
          style={{ paddingLeft: '36px' }}
          placeholder="Filter guests by name, phone or group..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Guest Table */}
      {loading ? (
        <div className="text-center p-4">Loading guest list...</div>
      ) : filteredGuests.length === 0 ? (
        <div className="glass-panel p-4 text-center text-muted rounded-3">No guests added yet. Add guests above to generate invitations.</div>
      ) : (
        <div className="table-responsive glass-panel rounded-3">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.85rem' }}>
            <thead>
              <tr>
                <th>Guest Name</th>
                <th>Phone Number</th>
                <th>Group</th>
                <th>RSVP Status</th>
                <th>Check-In</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGuests.map(g => (
                <tr key={g._id}>
                  <td className="fw-semibold">{g.name}</td>
                  <td className="font-monospace text-muted">{g.phone}</td>
                  <td><span className="badge bg-secondary">{g.group}</span></td>
                  <td>
                    {g.status === 'attending' && <span className="badge bg-success">Attending</span>}
                    {g.status === 'maybe' && <span className="badge bg-warning text-dark">Maybe</span>}
                    {g.status === 'declined' && <span className="badge bg-danger">Declined</span>}
                    {g.status === 'invited' && <span className="badge bg-info text-dark">Invited</span>}
                  </td>
                  <td>
                    {g.isCheckedIn ? (
                      <span className="badge bg-success d-inline-flex align-items-center gap-1">
                        <CheckCircle size={12} /> Checked-In
                      </span>
                    ) : (
                      <span className="badge bg-light text-dark">Not Checked-In</span>
                    )}
                  </td>
                  <td className="text-end">
                    <button 
                      onClick={() => copyInvitationLink(g)}
                      className="btn btn-sm btn-outline-primary me-2"
                      title="Copy Personalized Invitation Link"
                    >
                      <Copy size={14} /> {copiedToken === g.inviteToken ? 'Copied!' : 'Copy Link'}
                    </button>
                    <button 
                      onClick={() => handleDeleteGuest(g._id)}
                      className="btn btn-sm btn-outline-danger"
                      title="Remove Guest"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Manual Check-In Test Form */}
      <div className="glass-panel p-3 mt-4 rounded-3">
        <h6 className="fw-bold mb-2">QR Code Gate Check-In Validator</h6>
        <form onSubmit={handleQrCheckIn} className="d-flex gap-2 max-w-md">
          <input 
            type="text"
            className="form-control form-control-sm font-monospace"
            placeholder="Scan or enter guest invitation token..."
            value={scanToken}
            onChange={(e) => setScanToken(e.target.value)}
          />
          <button type="submit" disabled={scanning} className="btn btn-primary btn-sm">Verify Ticket</button>
        </form>
        {scanResult && (
          <div className={`alert ${scanResult.valid ? 'alert-success' : 'alert-danger'} mt-3 mb-0 text-sm p-2`}>
            {scanResult.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivateGuestManager;

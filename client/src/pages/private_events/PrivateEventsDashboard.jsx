import React, { useState, useEffect } from 'react';
import { Plus, Calendar, MapPin, Users, Palette, Trash2, Edit, ExternalLink, ShieldCheck } from 'lucide-react';
import InvitationDesigner from './InvitationDesigner';
import PrivateGuestManager from './PrivateGuestManager';

const PrivateEventsDashboard = () => {
  const token = localStorage.getItem('token');
  let user = {};
  try {
    const rawUser = localStorage.getItem('user');
    if (rawUser && rawUser !== 'undefined' && rawUser !== 'null') {
      user = JSON.parse(rawUser);
    }
  } catch (e) {
    user = {};
  }

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeEvent, setActiveEvent] = useState(null);
  const [activeTab, setActiveTab] = useState('list'); // list, create, design, guests

  // Create Form State
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState('Wedding');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('17:00');
  const [venueName, setVenueName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/private-events', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        setEvents(data);
        if (data.length > 0 && !activeEvent) {
          setActiveEvent(data[0]);
        }
      }
    } catch (err) {
      console.error('Error loading private events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchEvents();
    }
  }, [token]);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch('/api/private-events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          eventTitle,
          eventType,
          eventDate,
          eventTime,
          venueName,
          address,
          description
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setEventTitle('');
      setVenueName('');
      setAddress('');
      setDescription('');
      setActiveEvent(data);
      setActiveTab('guests');
      fetchEvents();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveDesign = async () => {
    if (!activeEvent) return;
    try {
      setSaving(true);
      const res = await fetch(`/api/private-events/${activeEvent._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ design: activeEvent.design })
      });
      if (res.ok) {
        alert('Invitation design saved successfully!');
        fetchEvents();
      }
    } catch (err) {
      alert('Error saving design');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this private event? Guest lists will be deleted.')) return;
    try {
      const res = await fetch(`/api/private-events/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setEvents(events.filter(e => e._id !== id));
        if (activeEvent?._id === id) setActiveEvent(null);
      }
    } catch (err) {
      alert('Error deleting event');
    }
  };

  const eventCategories = [
    'Wedding', 'Birthday', 'Christening/Baptism', 'Graduation', 'Anniversary', 
    'Private Party', 'Family Gathering', 'Memorial/Funeral', 'Dinner Party', 
    'Baby Shower', 'Bridal Shower', 'Engagement Party', 'Holiday Celebration', 'Custom Private Event'
  ];

  return (
    <div className="container py-4">
      {/* Top Banner Header */}
      <div className="glass-panel p-4 mb-4 rounded-3 d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }} className="d-flex align-items-center gap-2">
            <ShieldCheck style={{ color: 'var(--accent-primary)' }} /> Private Events & Secure Invitation Portal
          </h2>
          <p className="text-secondary text-sm mb-0">Design custom invitations, manage phone-verified guest lists, and enforce access control.</p>
        </div>
        <button 
          onClick={() => setActiveTab('create')} 
          className="btn btn-primary d-flex align-items-center gap-2"
        >
          <Plus size={18} /> Create New Private Event
        </button>
      </div>

      {/* Tabs */}
      <div className="d-flex gap-2 mb-4 border-bottom pb-2">
        <button 
          className={`btn btn-sm ${activeTab === 'list' ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => setActiveTab('list')}
        >
          My Private Events ({events.length})
        </button>
        {activeEvent && (
          <>
            <button 
              className={`btn btn-sm ${activeTab === 'guests' ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => setActiveTab('guests')}
            >
              Guest List & RSVPs ({activeEvent.eventTitle})
            </button>
            <button 
              className={`btn btn-sm ${activeTab === 'design' ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => setActiveTab('design')}
            >
              Invitation Designer
            </button>
          </>
        )}
      </div>

      {/* 1. LIST VIEW */}
      {activeTab === 'list' && (
        loading ? (
          <div>Loading private events...</div>
        ) : events.length === 0 ? (
          <div className="glass-panel p-5 text-center rounded-3">
            <h5>No Private Events Created Yet</h5>
            <p className="text-muted text-sm">Create your first private event to design invitations and manage phone-verified RSVPs.</p>
            <button onClick={() => setActiveTab('create')} className="btn btn-primary btn-sm">Create Event Now</button>
          </div>
        ) : (
          <div className="row g-4">
            {events.map(ev => (
              <div key={ev._id} className="col-12 col-md-6 col-lg-4">
                <div className="glass-panel p-4 h-100 rounded-3 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className="badge bg-primary text-uppercase">{ev.eventType}</span>
                      <button onClick={() => handleDeleteEvent(ev._id)} className="btn btn-link text-danger p-0" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <h5 className="fw-bold mb-2">{ev.eventTitle}</h5>
                    <div className="text-muted text-xs mb-2 d-flex align-items-center gap-1">
                      <Calendar size={14} /> {new Date(ev.eventDate).toLocaleDateString()} at {ev.eventTime}
                    </div>
                    <div className="text-muted text-xs mb-3 d-flex align-items-center gap-1">
                      <MapPin size={14} /> {ev.venueName}, {ev.address}
                    </div>
                  </div>

                  <div className="d-flex gap-2 mt-3 pt-3 border-top">
                    <button 
                      onClick={() => { setActiveEvent(ev); setActiveTab('guests'); }} 
                      className="btn btn-sm btn-outline-primary flex-grow-1 d-flex align-items-center justify-content-center gap-1"
                    >
                      <Users size={14} /> Guests & Link
                    </button>
                    <button 
                      onClick={() => { setActiveEvent(ev); setActiveTab('design'); }} 
                      className="btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-center gap-1"
                    >
                      <Palette size={14} /> Design
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* 2. CREATE FORM */}
      {activeTab === 'create' && (
        <div className="glass-panel p-4 rounded-3 max-w-2xl mx-auto" style={{ maxWidth: '650px' }}>
          <h4 className="fw-bold mb-3">Create Private Event</h4>
          <form onSubmit={handleCreateEvent}>
            <div className="mb-3">
              <label className="form-label text-xs fw-semibold">Event Title</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. Samuel & Helen Wedding Celebration"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                required 
              />
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label text-xs fw-semibold">Event Type</label>
                <select className="form-select text-sm" value={eventType} onChange={(e) => setEventType(e.target.value)}>
                  {eventCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label text-xs fw-semibold">Date</label>
                <input 
                  type="date" 
                  className="form-control text-sm" 
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required 
                />
              </div>
              <div className="col-md-3">
                <label className="form-label text-xs fw-semibold">Time</label>
                <input 
                  type="time" 
                  className="form-control text-sm" 
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label text-xs fw-semibold">Venue Name</label>
                <input 
                  type="text" 
                  className="form-control text-sm" 
                  placeholder="e.g. Hilton Hotel Ballroom"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  required 
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-xs fw-semibold">Address / Location</label>
                <input 
                  type="text" 
                  className="form-control text-sm" 
                  placeholder="e.g. Menelik II Ave, Addis Ababa"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label text-xs fw-semibold">Event Notes / Description</label>
              <textarea 
                className="form-control text-sm" 
                rows={3}
                placeholder="Special dress code, Parking instructions, schedule details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="d-flex gap-2">
              <button type="submit" disabled={saving} className="btn btn-primary">Save & Continue to Guest List</button>
              <button type="button" onClick={() => setActiveTab('list')} className="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* 3. GUEST MANAGEMENT */}
      {activeTab === 'guests' && activeEvent && (
        <PrivateGuestManager eventId={activeEvent._id} token={token} />
      )}

      {/* 4. INVITATION DESIGNER */}
      {activeTab === 'design' && activeEvent && (
        <InvitationDesigner 
          design={activeEvent.design || {}} 
          onChange={(newDesign) => setActiveEvent({ ...activeEvent, design: newDesign })}
          onSave={handleSaveDesign}
          loading={saving}
        />
      )}
    </div>
  );
};

export default PrivateEventsDashboard;

import React, { useState } from 'react';
import { Palette, Type, Image, Shield, Check, RefreshCw } from 'lucide-react';

const InvitationDesigner = ({ design, onChange, onSave, loading }) => {
  const [activeTab, setActiveTab] = useState('template');

  const templates = [
    { id: 'classic_gold', name: 'Classic Gold', primary: '#c5a85a', secondary: '#0f172a', font: 'serif', bg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' },
    { id: 'elegant_dark', name: 'Midnight Elegance', primary: '#e2e8f0', secondary: '#020617', font: 'sans', bg: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)' },
    { id: 'floral_romance', name: 'Emerald Romance', primary: '#10b981', secondary: '#064e3b', font: 'serif', bg: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)' },
    { id: 'royal_purple', name: 'Royal Velvet', primary: '#a855f7', secondary: '#3b0764', font: 'serif', bg: 'linear-gradient(135deg, #3b0764 0%, #1e1b4b 100%)' },
    { id: 'modern_minimal', name: 'Warm Sunset', primary: '#f97316', secondary: '#431407', font: 'sans', bg: 'linear-gradient(135deg, #431407 0%, #292524 100%)' }
  ];

  const fonts = [
    { id: 'serif', name: 'Serif Elegant (Georgia)' },
    { id: 'sans', name: 'Modern Sans (Inter)' },
    { id: 'monospace', name: 'Monospace Tech' }
  ];

  const handleTemplateSelect = (t) => {
    onChange({
      ...design,
      template: t.id,
      primaryColor: t.primary,
      secondaryColor: t.secondary,
      fontFamily: t.font
    });
  };

  return (
    <div className="invitation-designer-grid" style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '24px' }}>
      {/* Left Control Panel */}
      <div className="glass-panel p-4 rounded-3">
        <h5 className="mb-3 d-flex align-items-center gap-2" style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)' }}>
          <Palette size={18} /> Invitation Designer
        </h5>

        <div className="btn-group w-100 mb-4" role="group">
          <button 
            type="button" 
            className={`btn btn-sm ${activeTab === 'template' ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => setActiveTab('template')}
          >
            Style
          </button>
          <button 
            type="button" 
            className={`btn btn-sm ${activeTab === 'text' ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => setActiveTab('text')}
          >
            Wording
          </button>
          <button 
            type="button" 
            className={`btn btn-sm ${activeTab === 'cover' ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => setActiveTab('cover')}
          >
            Cover Photo
          </button>
        </div>

        {activeTab === 'template' && (
          <div>
            <label className="form-label font-semibold text-xs text-uppercase mb-2">Preset Themes</label>
            <div className="d-flex flex-column gap-2 mb-4">
              {templates.map(t => (
                <div 
                  key={t.id}
                  onClick={() => handleTemplateSelect(t)}
                  style={{ 
                    background: t.bg, 
                    padding: '12px 16px', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    border: design.template === t.id ? `2px solid ${t.primary}` : '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: '#ffffff'
                  }}
                >
                  <span style={{ fontWeight: '600', fontSize: '0.85rem' }}>{t.name}</span>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: t.primary }}></div>
                </div>
              ))}
            </div>

            <div className="mb-3">
              <label className="form-label text-xs fw-semibold">Primary Accent Color</label>
              <input 
                type="color" 
                className="form-control form-control-color w-100"
                value={design.primaryColor || '#c5a85a'}
                onChange={(e) => onChange({ ...design, primaryColor: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-xs fw-semibold">Font Style</label>
              <select 
                className="form-select text-sm"
                value={design.fontFamily || 'serif'}
                onChange={(e) => onChange({ ...design, fontFamily: e.target.value })}
              >
                {fonts.map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {activeTab === 'text' && (
          <div>
            <div className="mb-3">
              <label className="form-label text-xs fw-semibold">Custom Welcome Header / Message</label>
              <textarea 
                className="form-control text-sm"
                rows={4}
                value={design.customMessage || ''}
                onChange={(e) => onChange({ ...design, customMessage: e.target.value })}
                placeholder="We request the honor of your presence..."
              />
            </div>
          </div>
        )}

        {activeTab === 'cover' && (
          <div>
            <div className="mb-3">
              <label className="form-label text-xs fw-semibold">Cover Photo / Banner Image URL</label>
              <input 
                type="url" 
                className="form-control text-sm"
                placeholder="https://example.com/banner.jpg"
                value={design.coverPhoto || ''}
                onChange={(e) => onChange({ ...design, coverPhoto: e.target.value })}
              />
              <small className="text-muted d-block mt-1">Direct link to hosted banner or photo.</small>
            </div>
          </div>
        )}

        <button 
          onClick={onSave}
          disabled={loading}
          className="btn btn-primary w-100 mt-3 d-flex align-items-center justify-content-center gap-2"
        >
          {loading ? <RefreshCw className="animate-spin" size={16} /> : <Check size={16} />} Save Invitation Design
        </button>
      </div>

      {/* Right Live Preview Box */}
      <div className="d-flex flex-column align-items-center justify-content-center p-4 rounded-3" style={{ background: 'var(--bg-app)', border: '1px dashed var(--border-glass)' }}>
        <span className="text-xs fw-bold text-uppercase text-muted mb-3">Live Guest Invitation Card Preview</span>
        
        <div 
          className="invitation-card-preview"
          style={{
            width: '100%',
            maxWidth: '440px',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            border: `2px solid ${design.primaryColor || '#c5a85a'}`,
            color: '#ffffff',
            textAlign: 'center',
            paddingBottom: '30px'
          }}
        >
          {design.coverPhoto ? (
            <img 
              src={design.coverPhoto} 
              alt="Cover" 
              style={{ width: '100%', height: '180px', objectFit: 'cover' }}
            />
          ) : (
            <div style={{ height: '80px', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '2rem' }}>✨ 💌 ✨</span>
            </div>
          )}

          <div className="p-4">
            <h2 style={{ fontFamily: design.fontFamily === 'serif' ? 'Georgia, serif' : 'Inter, sans-serif', color: design.primaryColor || '#c5a85a', fontSize: '1.6rem', fontWeight: '700', marginBottom: '8px' }}>
              Private Event Title
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', fontStyle: 'italic', marginBottom: '20px' }}>
              "{design.customMessage || 'We request the honor of your presence at our celebration.'}"
            </p>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px', margin: '0 10px 20px 10px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>Saturday, October 24, 2026</div>
              <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>05:00 PM | Grand Palace Hotel</div>
            </div>

            <div className="d-flex justify-content-center gap-2">
              <span className="badge bg-success">RSVP Attending</span>
              <span className="badge bg-secondary">QR Pass Code</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationDesigner;

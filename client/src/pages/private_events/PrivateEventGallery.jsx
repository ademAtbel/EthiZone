import React, { useState, useEffect } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

const PrivateEventGallery = ({ eventId, isHost }) => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploaderName, setUploaderName] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/private-events/${eventId}/gallery`);
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        setMedia(data);
      }
    } catch (err) {
      console.error('Error fetching gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchGallery();
    }
  }, [eventId]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploaderName || !mediaUrl) return;

    try {
      setUploading(true);
      const res = await fetch(`/api/private-events/${eventId}/gallery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uploaderName, mediaUrl, caption })
      });
      if (res.ok) {
        setMediaUrl('');
        setCaption('');
        fetchGallery();
      }
    } catch (err) {
      alert('Error uploading to gallery');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="private-gallery-container mt-4">
      <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
        <ImageIcon size={20} /> Private Event Photo Album
      </h5>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="glass-panel p-3 mb-4 rounded-3 d-flex gap-2 flex-wrap">
        <div style={{ flex: '1 1 180px' }}>
          <input 
            type="text" 
            className="form-control text-sm" 
            placeholder="Your Name (Guest / Host)"
            value={uploaderName}
            onChange={(e) => setUploaderName(e.target.value)}
            required
          />
        </div>
        <div style={{ flex: '2 1 240px' }}>
          <input 
            type="url" 
            className="form-control text-sm" 
            placeholder="Photo URL (e.g. https://example.com/photo.jpg)"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            required
          />
        </div>
        <div style={{ flex: '1 1 180px' }}>
          <input 
            type="text" 
            className="form-control text-sm" 
            placeholder="Caption (Optional)"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
        <button type="submit" disabled={uploading} className="btn btn-primary btn-sm d-flex align-items-center gap-1">
          <Upload size={16} /> Add Photo
        </button>
      </form>

      {/* Media Grid */}
      {loading ? (
        <div>Loading gallery...</div>
      ) : media.length === 0 ? (
        <div className="glass-panel p-4 text-center text-muted rounded-3">No photos uploaded to this private album yet. Be the first to share!</div>
      ) : (
        <div className="row g-3">
          {media.map(item => (
            <div key={item._id} className="col-6 col-md-4 col-lg-3">
              <div className="card h-100 overflow-hidden shadow-sm" style={{ background: 'var(--bg-app)', border: '1px solid var(--border-glass)' }}>
                <img src={item.mediaUrl} alt={item.caption || 'Event Memory'} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                <div className="p-2 text-xs">
                  <div className="fw-semibold text-truncate">{item.caption || 'Event Photo'}</div>
                  <div className="text-muted">By {item.uploaderName}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrivateEventGallery;

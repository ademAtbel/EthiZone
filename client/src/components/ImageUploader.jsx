import React, { useRef } from "react";
import { Upload, X } from "lucide-react";

export default function ImageUploader({ images = [], onChange, maxImages = 5 }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > maxImages) {
      alert(`You can only upload a maximum of ${maxImages} images.`);
      return;
    }

    files.forEach(file => {
      if (!file.type.startsWith('image/')) {
        alert('File must be an image.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        // If onChange is state setter directly or accepts updater function
        if (typeof onChange === 'function') {
          onChange(prev => {
            if (Array.isArray(prev)) {
              return [...prev, reader.result];
            }
            return [...images, reader.result];
          });
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const handleRemove = (idx) => {
    if (typeof onChange === 'function') {
      onChange(images.filter((_, i) => i !== idx));
    }
  };

  const triggerPicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4 w-full">
      {/* Upload Drag/Click Zone */}
      {images.length < maxImages && (
        <div 
          onClick={triggerPicker}
          className="border-2 border-dashed border-outline_variant hover:border-primary hover:bg-surface_container_low rounded-xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all text-center"
          style={{ borderColor: 'var(--border-glass)', borderRadius: '12px' }}
        >
          <div className="p-3 bg-primary_container text-on_primary_container rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
            <Upload size={24} className="text-primary" />
          </div>
          <div>
            <p className="text-label-lg font-label-lg text-on_surface font-semibold">Click to upload listing images</p>
            <p className="text-body-sm font-body-sm text-on_surface_variant" style={{ color: 'var(--text-secondary)' }}>Supported formats: PNG, JPG, WEBP (Max {maxImages} images)</p>
          </div>
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            accept="image/*"
            className="hidden"
          />
        </div>
      )}

      {/* Image Previews Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '16px' }}>
          {images.map((img, idx) => (
            <div key={idx} className="relative group aspect-square rounded-lg border border-outline_variant overflow-hidden bg-surface_container_high shadow-sm hover:shadow-md transition-all" style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '8px', border: '1px solid var(--border-glass)', overflow: 'hidden' }}>
              <img 
                src={img} 
                alt={`Upload ${idx + 1}`} 
                className="w-full h-full object-cover"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="absolute top-1 right-1 p-1 bg-black/65 hover:bg-red-600 text-white rounded-full transition-all shadow"
                style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', color: '#fff', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyCenter: 'center', cursor: 'pointer' }}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

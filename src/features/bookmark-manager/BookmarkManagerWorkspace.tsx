'use client';

import React, { useState } from 'react';
import { useBookmarkStore, Bookmark } from '@/stores/bookmarkStore';
import { isValidHttpUrl } from '@/lib/validation';
import { downloadFile } from '@/lib/download';

export const BookmarkManagerWorkspace: React.FC = () => {
  const { bookmarks, addBookmark, deleteBookmark, importBookmarks, exportBookmarks } = useBookmarkStore();
  const [title, setTitle] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [category, setCategory] = useState<string>('Components');
  const [notes, setNotes] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFeedback({ type: 'error', message: 'Title is required' });
      return;
    }
    if (!isValidHttpUrl(url.trim())) {
      setFeedback({ type: 'error', message: 'Invalid URL. Must begin with http:// or https://' });
      return;
    }

    const res = addBookmark({
      title: title.trim(),
      url: url.trim(),
      category,
      tags: [category.toLowerCase()],
      notes: notes.trim()
    });

    if (res.success) {
      setTitle('');
      setUrl('');
      setNotes('');
      setFeedback({ type: 'success', message: res.message });
    } else {
      setFeedback({ type: 'error', message: res.message });
    }
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleExport = () => {
    const json = exportBookmarks();
    downloadFile('mahi-ui-bookmarks.json', json, 'application/json');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importBookmarks(content);
      if (res.success) {
        setFeedback({ type: 'success', message: `Successfully imported ${res.count} bookmarks!` });
      } else {
        setFeedback({ type: 'error', message: `Import failed: ${res.error}` });
      }
      setTimeout(() => setFeedback(null), 3500);
    };
    reader.readAsText(file);
  };

  const filtered = bookmarks.filter((b) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      b.title.toLowerCase().includes(q) ||
      b.url.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      (b.notes && b.notes.toLowerCase().includes(q))
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {feedback && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
          <div className="toast" style={{ borderColor: feedback.type === 'error' ? 'var(--danger)' : 'var(--success)' }}>
            <span className="toast-icon">{feedback.type === 'error' ? '⚠️' : '✓'}</span>
            <span>{feedback.message}</span>
          </div>
        </div>
      )}

      {/* Add New Bookmark Form */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.3rem', fontWeight: 700 }}>Design Bookmark Manager</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Save, categorize, tag, and export your personal design system references</p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleExport}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent-primary)',
                color: '#fff',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              Export JSON Backup
            </button>

            <label
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255,255,255,0.08)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center'
              }}
            >
              Import Backup
              <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
            </label>
          </div>
        </div>

        <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Reference Title</label>
            <input
              type="text"
              placeholder="e.g. Cult UI Primitives"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Website URL</label>
            <input
              type="url"
              placeholder="https://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
            >
              <option value="Components">Components & Libraries</option>
              <option value="Design Systems">Design Systems</option>
              <option value="Animations">Animations & FX</option>
              <option value="Generators">CSS Generators</option>
              <option value="Inspiration">Visual Inspiration</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '9px 20px',
                borderRadius: '6px',
                background: 'var(--accent-primary)',
                color: '#fff',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              + Save Bookmark
            </button>
          </div>
        </form>
      </div>

      {/* Bookmarks List & Search */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>
            Saved Bookmarks ({filtered.length})
          </h4>

          <input
            type="text"
            placeholder="Search saved bookmarks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              minWidth: '220px'
            }}
          />
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No bookmarks matching your search query.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {filtered.map((b) => (
              <div
                key={b.id}
                style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '4px', color: 'var(--text-muted)' }}>
                    {b.category}
                  </span>
                  <button
                    onClick={() => deleteBookmark(b.id)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '0.85rem' }}
                  >
                    Delete ✕
                  </button>
                </div>

                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>{b.title}</h4>
                {b.notes && <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>{b.notes}</p>}

                <a
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginTop: 'auto',
                    paddingTop: '8px',
                    fontSize: '0.82rem',
                    color: 'var(--accent-primary)',
                    textDecoration: 'none',
                    fontWeight: 600
                  }}
                >
                  Open Link ↗
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

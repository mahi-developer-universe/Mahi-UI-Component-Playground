'use client';

import React from 'react';
import Link from 'next/link';
import { useBookmarkStore } from '@/stores/bookmarkStore';
import { useAppStore } from '@/stores/appStore';
import { CANONICAL_PROJECTS } from '@/data/projects/canonicalRegistry';

export default function FavoritesPage() {
  const { bookmarks, deleteBookmark } = useBookmarkStore();
  const { favorites, toggleFavorite } = useAppStore();

  const favoriteProjects = CANONICAL_PROJECTS.filter((p) => favorites.includes(p.id) || favorites.includes(p.slug));

  return (
    <div style={{ padding: '2.5rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
          Favorites & Bookmarks
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', margin: 0 }}>
          Your saved frontend tools, component libraries, and design bookmarks.
        </p>
      </div>

      {/* Bookmarked Projects Section */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>⭐ Saved Tools ({favoriteProjects.length})</span>
        </h2>

        {favoriteProjects.length === 0 ? (
          <div style={{ padding: '2.5rem', textAlign: 'center', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--border-color)', color: 'var(--text-muted)' }}>
            No saved tools yet. You can star any tool in the <Link href="/projects" style={{ color: 'var(--accent-primary)' }}>Projects Directory</Link>.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {favoriteProjects.map((p) => (
              <div key={p.id} style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 700 }}>#{p.num}</span>
                  <button onClick={() => toggleFavorite(p.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>⭐</button>
                </div>
                <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{p.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, flex: 1 }}>{p.description}</p>
                <Link href={p.route} style={{ marginTop: '0.5rem', color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem' }}>Open Tool →</Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Custom Web Bookmarks Section */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>
            Saved Web References ({bookmarks.length})
          </h2>
          <Link href="/projects/15-bookmark-manager" style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 600 }}>
            Manage in Bookmark Tool →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {bookmarks.map((bm) => (
            <div key={bm.id} style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{bm.category}</span>
                <button onClick={() => deleteBookmark(bm.id)} style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '0.8rem' }}>✕</button>
              </div>
              <h4 style={{ margin: 0, fontSize: '1rem' }}>{bm.title}</h4>
              {bm.notes && <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>{bm.notes}</p>}
              <a href={bm.url} target="_blank" rel="noopener noreferrer" style={{ marginTop: 'auto', fontSize: '0.82rem', color: 'var(--accent-primary)', textDecoration: 'none' }}>
                Visit Link ↗
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

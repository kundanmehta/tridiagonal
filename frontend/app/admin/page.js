'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { API_URL } from '@/lib/apiConfig';
import {
  FileText, Settings, Factory, BookOpen, Calendar,
  Briefcase, Users, Mail, ArrowUpRight, Home,
} from 'lucide-react';



const quickActions = [
  { label: 'Edit Home Page', href: '/admin/pages/home', icon: Home, color: '#00AEEF' },
  { label: 'Services', href: '/admin/services', icon: Settings, color: '#8b5cf6' },
  { label: 'Industries', href: '/admin/industries', icon: Factory, color: '#f59e0b' },
  { label: 'Resources', href: '/admin/resources', icon: BookOpen, color: '#10b981' },
  { label: 'Events', href: '/admin/events', icon: Calendar, color: '#ec4899' },
  { label: 'Careers', href: '/admin/careers', icon: Briefcase, color: '#6366f1' },
  { label: 'Team', href: '/admin/team', icon: Users, color: '#14b8a6' },
  { label: 'Contact Submissions', href: '/admin/contacts', icon: Mail, color: '#f97316' },
];

export default function AdminDashboardPage() {
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({ contacts: 0, services: 0, pages: 1, events: 0, resources: 0 });

  useEffect(() => {
    // Load user from localStorage
    try {
      const stored = localStorage.getItem('admin_user');
      if (stored) setUser(JSON.parse(stored));
    } catch { }

    // Fetch stats
    const token = localStorage.getItem('admin_token');
    if (token) {
      // Recent contacts
      fetch(`${API_URL}/api/contacts`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
        .then(res => res.ok ? res.json() : { data: [] })
        .then(data => {
          const list = data.data || [];
          setContacts(list.slice(0, 5));
          setStats(prev => ({ ...prev, contacts: list.length }));
        })
        .catch(() => { });

      // Total resources
      fetch(`${API_URL}/api/resources/all`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
        .then(res => res.ok ? res.json() : { data: [] })
        .then(data => {
          const list = data.data || [];
          setStats(prev => ({ ...prev, resources: list.length }));
        })
        .catch(() => { });
    }
  }, []);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
          {greeting()}, {user?.name || 'Admin'} 👋
        </h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '6px' }}>
          Welcome to the Tridiagonal CMS. Manage your website content from here.
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Total Pages', value: stats.pages, color: '#00AEEF', bg: '#f0f9ff' },
          { label: 'Total Resources', value: stats.resources, color: '#10b981', bg: '#f0fdf4' },
          { label: 'Contact Submissions', value: stats.contacts, color: '#f59e0b', bg: '#fffbeb' },
          { label: 'Events', value: stats.events, color: '#ec4899', bg: '#fdf2f8' },
        ].map((stat) => (
          <div key={stat.label} style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '20px 24px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <p style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>{stat.label}</p>
              <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a', margin: '4px 0 0' }}>{stat.value}</h3>
            </div>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={20} color={stat.color} />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a', marginBottom: '16px' }}>Quick Actions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 16px',
                borderRadius: '10px',
                background: '#fff',
                border: '1px solid #e2e8f0',
                textDecoration: 'none',
                transition: 'all 0.2s',
                color: '#334155',
                fontSize: '13px',
                fontWeight: '500',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = action.color;
                e.currentTarget.style.boxShadow = `0 4px 12px ${action.color}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <action.icon size={18} color={action.color} />
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Contacts */}
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid #f1f5f9',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#0f172a', margin: 0 }}>Recent Contact Submissions</h3>
          <Link href="/admin/contacts" style={{ fontSize: '12px', color: '#00AEEF', textDecoration: 'none', fontWeight: '500' }}>
            View All →
          </Link>
        </div>

        {contacts.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
            <Mail size={32} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
            <p style={{ margin: 0 }}>No contact submissions yet</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ padding: '10px 24px', fontSize: '11px', fontWeight: '600', color: '#94a3b8', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</th>
                <th style={{ padding: '10px 24px', fontSize: '11px', fontWeight: '600', color: '#94a3b8', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</th>
                <th style={{ padding: '10px 24px', fontSize: '11px', fontWeight: '600', color: '#94a3b8', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</th>
                <th style={{ padding: '10px 24px', fontSize: '11px', fontWeight: '600', color: '#94a3b8', textAlign: 'right', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c, i) => (
                <tr key={c._id || i} style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 24px', fontSize: '13px', fontWeight: '500', color: '#334155' }}>{c.firstName} {c.lastName}</td>
                  <td style={{ padding: '12px 24px', fontSize: '13px', color: '#64748b' }}>{c.email}</td>
                  <td style={{ padding: '12px 24px', fontSize: '13px', color: '#64748b' }}>{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '—'}</td>
                  <td style={{ padding: '12px 24px', textAlign: 'right' }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#00AEEF' }}>
                      <ArrowUpRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

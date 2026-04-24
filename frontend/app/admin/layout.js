'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
import { API_URL } from '@/lib/apiConfig';
  LayoutDashboard, FileText, Settings, Factory, BookOpen,
  Calendar, Briefcase, Users, Handshake, Image as ImageIcon,
  Mail, Globe, LogOut, ChevronDown, Home, ChevronRight,
  ClipboardList, Phone,
} from 'lucide-react';



const sidebarNav = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  {
    label: 'Pages',
    icon: FileText,
    children: [
      { label: 'Home Page', href: '/admin/pages/home', icon: Home },
      { label: 'About Us', href: '/admin/pages/about-us', icon: Users },
      { label: 'Careers', href: '/admin/pages/careers', icon: Briefcase },
      { label: 'Contact Us', href: '/admin/pages/contact-us', icon: Phone },
      { label: 'Privacy Policy', href: '/admin/pages/privacy-policy', icon: FileText },
    ],
  },
  { label: 'Form Builder', href: '/admin/forms', icon: ClipboardList },
  { label: 'Services', href: '/admin/services', icon: Settings },
  {
    label: 'Industries',
    icon: Factory,
    children: [
      { label: 'Oil & Gas', href: '/admin/industries/oil-gas', icon: Factory },
      { label: 'Pharma & Medical', href: '/admin/industries/pharma-medical', icon: Factory },
      { label: 'Metals & Mining', href: '/admin/industries/metals-mining', icon: Factory },
      { label: 'Food & CPG', href: '/admin/industries/food-cpg', icon: Factory },
      { label: 'Chemicals & Petro', href: '/admin/industries/chemicals-petrochemicals', icon: Factory },
      { label: 'Power & Renewables', href: '/admin/industries/power-renewables', icon: Factory },
      { label: 'Others', href: '/admin/industries/others', icon: Factory },
    ],
  },
  {
    label: 'Resources',
    icon: BookOpen,
    children: [
      { label: 'Blogs', href: '/admin/resources/blogs', icon: FileText },
      { label: 'Blog Categories', href: '/admin/resources/blogs/categories', icon: Settings },
      { label: 'Case Studies', href: '/admin/resources/case-studies', icon: ClipboardList },
      { label: 'Publications & Patents', href: '/admin/resources/publications', icon: BookOpen },
      { label: 'Brochures', href: '/admin/resources/brochures', icon: ImageIcon },
    ],
  },

  {
    label: 'Events',
    icon: Calendar,
    children: [
      { label: 'Upcoming Webinars', href: '/admin/events/upcoming', icon: Calendar },
      { label: 'On-Demand Webinars', href: '/admin/events/on-demand', icon: Calendar },
      { label: 'News & Press Release', href: '/admin/events/news', icon: FileText },
    ],
  },
  { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
  { label: 'Header & Footer', href: '/admin/header-footer', icon: Globe },
  { label: 'Contact Submissions', href: '/admin/contacts', icon: Mail },
];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.replace('/admin-login');
      return;
    }

    fetch(`${API_URL}/api/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => {
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        router.replace('/admin-login');
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.replace('/admin-login');
  };

  const toggleSection = (label) => {
    setExpandedSections(prev => ({ ...prev, [label]: !prev[label] }));
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#00AEEF', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: '#64748b', fontSize: '14px' }}>Verifying access...</p>
        </div>
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          .site-header, .cta-section, .site-footer, .footer-bottom { display: none !important; }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#f1f5f9' }}>
      {/* Hide public site chrome */}
      <style>{`
        .site-header, .cta-section, .site-footer, .footer-bottom { display: none !important; }
        body { padding-top: 0 !important; }
        main[style*="padding-top: var(--nav-height)"] { padding-top: 0 !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Sidebar */}
      <aside style={{
        width: '260px',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0a0f1c 0%, #111827 100%)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 50,
        overflowY: 'auto',
      }}>
        {/* Logo area */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/admin" style={{ textDecoration: 'none' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '0.08em', color: '#00AEEF', margin: 0 }}>TRIDIAGONAL</h2>
            <p style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Admin CMS Panel</p>
          </Link>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {sidebarNav.map((item) => {
            if (item.children) {
              const isExpanded = expandedSections[item.label];
              const isChildActive = item.children.some(c => pathname === c.href);
              return (
                <div key={item.label}>
                  <button
                    onClick={() => toggleSection(item.label)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: 'none',
                      background: isChildActive ? 'rgba(0,174,239,0.08)' : 'transparent',
                      color: isChildActive ? '#00AEEF' : '#94a3b8',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '500',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                    }}
                  >
                    <item.icon size={18} />
                    <span style={{ flex: 1 }}>{item.label}</span>
                    <ChevronDown size={14} style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                  </button>
                  {isExpanded && (
                    <div style={{ paddingLeft: '20px', marginTop: '2px' }}>
                      {item.children.map((child) => {
                        const isActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              padding: '8px 12px',
                              borderRadius: '6px',
                              textDecoration: 'none',
                              fontSize: '13px',
                              fontWeight: isActive ? '600' : '400',
                              color: isActive ? '#00AEEF' : '#64748b',
                              background: isActive ? 'rgba(0,174,239,0.1)' : 'transparent',
                              transition: 'all 0.2s',
                            }}
                          >
                            <child.icon size={15} />
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: isActive ? '600' : '500',
                  color: isActive ? '#fff' : '#94a3b8',
                  background: isActive ? 'rgba(0,174,239,0.15)' : 'transparent',
                  transition: 'all 0.2s',
                }}
              >
                <item.icon size={18} />
                {item.label}
                {isActive && <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />}
              </Link>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {user && (
            <div style={{ padding: '8px 12px', marginBottom: '8px' }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#e2e8f0', margin: 0 }}>{user.name}</p>
              <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0' }}>{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: '8px',
              border: 'none',
              background: 'rgba(239, 68, 68, 0.08)',
              color: '#f87171',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
              transition: 'all 0.2s',
            }}
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, marginLeft: '260px', padding: '32px 40px', minHeight: '100vh', color: '#1e293b' }}>
        {children}
      </main>
    </div>
  );
}

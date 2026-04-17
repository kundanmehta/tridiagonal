export const metadata = {
  title: 'Admin Login — Tridiagonal CMS',
  description: 'Login to the Tridiagonal Solutions admin panel',
};

export default function AdminLoginLayout({ children }) {
  return (
    <>
      {children}
      <style>{`
        /* Hide the public Navbar and Footer on admin-login page */
        .site-header, .cta-section, .site-footer, .footer-bottom { display: none !important; }
        /* Reset any padding from the public layout */
        body { padding-top: 0 !important; background: #0a0f1c !important; }
        main { padding-top: 0 !important; }
      `}</style>
    </>
  );
}

import Link from 'next/link';
import { LayoutDashboard, FileText, Briefcase, Settings, Users, LogOut } from 'lucide-react';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-corporate-blue text-white flex flex-col fixed h-full z-10 transition-transform">
        <div className="p-6 text-center border-b border-white/10">
           <h2 className="text-xl font-bold tracking-widest text-corporate-cyan">TRIDIAGONAL</h2>
           <p className="text-xs text-gray-400 mt-1 uppercase">Admin CMS Panel</p>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-2">
           <Link href="/admin" className="flex items-center px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <LayoutDashboard size={20} className="mr-3" /> Dashboard
           </Link>
           <Link href="/admin/pages" className="flex items-center px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-gray-300">
              <FileText size={20} className="mr-3" /> Pages (SEO)
           </Link>
           <Link href="/admin/services" className="flex items-center px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-gray-300">
              <Settings size={20} className="mr-3" /> Services
           </Link>
           <Link href="/admin/contacts" className="flex items-center px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-gray-300">
              <Users size={20} className="mr-3" /> Inquiries
           </Link>
           <Link href="/admin/careers" className="flex items-center px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-gray-300">
              <Briefcase size={20} className="mr-3" /> Careers
           </Link>
        </nav>
        <div className="p-6 border-t border-white/10 cursor-pointer hover:text-red-400 transition-colors flex items-center">
           <LogOut size={20} className="mr-3" /> Logout
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-10 bg-gray-50">
         {children}
      </main>
    </div>
  );
}

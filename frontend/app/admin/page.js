import { Users, Activity, Eye, ArrowUpRight } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <>
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-corporate-blue">CMS Dashboard</h1>
        <p className="text-gray-500 mt-2">Welcome back to the Tridiagonal Management Interface.</p>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
           <div>
             <p className="text-sm text-gray-500 font-semibold mb-1">Total Inquiries</p>
             <h3 className="text-3xl font-bold text-corporate-blue">142</h3>
           </div>
           <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
             <Users size={24} />
           </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
           <div>
             <p className="text-sm text-gray-500 font-semibold mb-1">Active Services</p>
             <h3 className="text-3xl font-bold text-corporate-blue">5</h3>
           </div>
           <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
             <Activity size={24} />
           </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
           <div>
             <p className="text-sm text-gray-500 font-semibold mb-1">Page Views (Est)</p>
             <h3 className="text-3xl font-bold text-corporate-blue">12.4k</h3>
           </div>
           <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
             <Eye size={24} />
           </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
           <h3 className="text-lg font-bold text-corporate-blue">Recent Contact Submissions</h3>
           <button className="text-corporate-lightBlue text-sm font-semibold hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b">
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-corporate-blue">John Doe</td>
                <td className="px-6 py-4 text-gray-500">john.doe@oilgas.inc</td>
                <td className="px-6 py-4"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">New</span></td>
                <td className="px-6 py-4 text-gray-500">Today, 10:42 AM</td>
                <td className="px-6 py-4 text-right"><button className="text-corporate-lightBlue hover:text-corporate-blue"><ArrowUpRight size={18}/></button></td>
              </tr>
              <tr className="border-b hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-corporate-blue">Sarah Williams</td>
                <td className="px-6 py-4 text-gray-500">sarah@chemcorp.com</td>
                <td className="px-6 py-4"><span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">Reviewed</span></td>
                <td className="px-6 py-4 text-gray-500">Yesterday</td>
                <td className="px-6 py-4 text-right"><button className="text-corporate-lightBlue hover:text-corporate-blue"><ArrowUpRight size={18}/></button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

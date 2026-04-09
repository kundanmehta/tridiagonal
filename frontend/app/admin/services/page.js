import { Settings, Plus, Edit2, Trash2 } from 'lucide-react';

async function getServices() {
  try {
    const res = await fetch('http://localhost:5000/api/services', { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data;
  } catch (err) {
    return [];
  }
}

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <>
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-corporate-blue flex items-center">
            <Settings className="mr-3 text-corporate-cyan" size={32} /> Services Management
          </h1>
          <p className="text-gray-500 mt-2">Create, edit, and organize the specialized services offered.</p>
        </div>
        <button className="bg-corporate-blue hover:bg-corporate-lightBlue text-white px-6 py-3 rounded-lg font-bold flex items-center transition-colors shadow-md hover:shadow-lg">
          <Plus size={20} className="mr-2" /> Add New Service
        </button>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Service Title</th>
                <th className="px-6 py-4 font-semibold">URL Slug</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {services.map((service, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-5 font-bold text-corporate-blue">{service.title}</td>
                  <td className="px-6 py-5 text-gray-500">/services/{service.slug}</td>
                  <td className="px-6 py-5"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Published</span></td>
                  <td className="px-6 py-5 text-right flex justify-end space-x-3">
                    <button className="text-blue-500 hover:text-blue-700 bg-blue-50 p-2 rounded-md"><Edit2 size={16}/></button>
                    <button className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-md"><Trash2 size={16}/></button>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                 <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-gray-500">No services found in database. Add one to get started!</td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

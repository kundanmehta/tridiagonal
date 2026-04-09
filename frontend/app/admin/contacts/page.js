import { Users, Mail } from 'lucide-react';

export default function AdminContactsPage() {
  return (
    <>
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-corporate-blue flex items-center">
          <Users className="mr-3 text-corporate-cyan" size={32} /> Client Inquiries
        </h1>
        <p className="text-gray-500 mt-2">Manage and respond to contact submissions from the main website.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-corporate-blue mb-4 flex justify-between">
              John Doe <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full h-6">New</span>
            </h3>
            <p className="flex items-center text-gray-500 text-sm mb-4"><Mail size={14} className="mr-2" /> john.doe@oilgas.inc</p>
            <p className="text-gray-700 text-sm italic border-l-2 border-corporate-cyan pl-3">
              "We need consultation on optimizing our upstream flow assurance processes. Please let me know your availability."
            </p>
            <button className="mt-6 w-full text-center text- corporate-lightBlue bg-blue-50 hover:bg-blue-100 py-2 rounded-lg text-sm font-bold transition-colors">
              Mark as Read
            </button>
         </div>

         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-corporate-blue mb-4 flex justify-between">
              Sarah Williams <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full h-6">Replied</span>
            </h3>
            <p className="flex items-center text-gray-500 text-sm mb-4"><Mail size={14} className="mr-2" /> sarah@chemcorp.com</p>
            <p className="text-gray-700 text-sm italic border-l-2 border-corporate-cyan pl-3">
              "Looking for bioreactor scale-up strategies for a new facility in Houston."
            </p>
            <button className="mt-6 w-full text-center text-gray-500 bg-gray-50 py-2 rounded-lg text-sm font-bold opacity-50 cursor-not-allowed">
              Archived
            </button>
         </div>
      </div>
    </>
  );
}

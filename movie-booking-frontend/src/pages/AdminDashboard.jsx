import { useState } from 'react';
import { Film, MapPin, Users, Plus, Edit, Trash2, X } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('movies');
  
  // State for CRUD operations
  const [movies, setMovies] = useState([
    { id: 1, title: "Interstellar", status: "Active", revenue: 45000 },
    { id: 2, title: "Dune: Part Two", status: "Active", revenue: 82500 },
    { id: 3, title: "Oppenheimer", status: "Inactive", revenue: 120000 },
  ]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [formData, setFormData] = useState({ title: '', status: 'Active', revenue: '' });

  // --- CRUD Handlers ---
  const handleOpenModal = (movie = null) => {
    if (movie) {
      setEditingMovie(movie);
      setFormData({ title: movie.title, status: movie.status, revenue: movie.revenue });
    } else {
      setEditingMovie(null);
      setFormData({ title: '', status: 'Active', revenue: '' });
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this record?")) {
      setMovies(movies.filter(m => m.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingMovie) {
      // Update existing
      setMovies(movies.map(m => m.id === editingMovie.id ? { ...m, ...formData } : m));
    } else {
      // Create new (Mock ID generation)
      const newId = movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1;
      setMovies([...movies, { id: newId, ...formData }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-24 px-6 pb-12 relative flex justify-center">
      
      {/* ================= CRUD MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/80 backdrop-blur-sm p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold mb-6">{editingMovie ? 'Edit Movie' : 'Add New Movie'}</h2>
            
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Movie Title</label>
                <input 
                  required type="text" 
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-4 focus:border-red-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Status</label>
                <select 
                  value={formData.status} 
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-4 focus:border-red-500 outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Revenue (₹)</label>
                <input 
                  required type="number" 
                  value={formData.revenue} 
                  onChange={(e) => setFormData({...formData, revenue: e.target.value})}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-4 focus:border-red-500 outline-none"
                />
              </div>
              <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold mt-4">
                {editingMovie ? 'Update Record' : 'Save Record'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= MAIN LAYOUT ================= */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0 space-y-2">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-4">Admin Controls</h2>
          <button onClick={() => setActiveTab('movies')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'movies' ? 'bg-red-600/10 text-red-500 font-bold' : 'text-gray-400 hover:bg-gray-900 hover:text-white'}`}>
            <Film size={18} /> Manage Movies
          </button>
          <button onClick={() => setActiveTab('cinemas')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'cinemas' ? 'bg-red-600/10 text-red-500 font-bold' : 'text-gray-400 hover:bg-gray-900 hover:text-white'}`}>
            <MapPin size={18} /> Manage Cinemas
          </button>
          <button onClick={() => setActiveTab('users')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'users' ? 'bg-red-600/10 text-red-500 font-bold' : 'text-gray-400 hover:bg-gray-900 hover:text-white'}`}>
            <Users size={18} /> User Bookings
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-grow bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold capitalize">{activeTab} Database</h1>
            {activeTab === 'movies' && (
              <button onClick={() => handleOpenModal()} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold transition-colors text-sm">
                <Plus size={16} /> Add New
              </button>
            )}
          </div>

          {activeTab === 'movies' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400 text-sm">
                    <th className="pb-4 font-medium pl-4">ID</th>
                    <th className="pb-4 font-medium">Title</th>
                    <th className="pb-4 font-medium">Status</th>
                    <th className="pb-4 font-medium">Revenue generated</th>
                    <th className="pb-4 font-medium text-right pr-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map((movie) => (
                    <tr key={movie.id} className="border-b border-gray-800/50 hover:bg-gray-800/40 transition-colors">
                      <td className="py-4 text-gray-400 pl-4">#{movie.id}</td>
                      <td className="py-4 font-bold">{movie.title}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${movie.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/20 text-gray-400'}`}>
                          {movie.status}
                        </span>
                      </td>
                      <td className="py-4 text-gray-300">₹{Number(movie.revenue).toLocaleString('en-IN')}</td>
                      <td className="py-4 flex justify-end gap-4 pr-4">
                        <button onClick={() => handleOpenModal(movie)} className="text-gray-400 hover:text-white transition-colors"><Edit size={16} /></button>
                        <button onClick={() => handleDelete(movie.id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                  {movies.length === 0 && (
                    <tr><td colSpan="5" className="text-center py-8 text-gray-500">No records found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
             <div className="text-center py-20 text-gray-500">
               <p>The {activeTab} table will be connected to the SQL backend soon.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
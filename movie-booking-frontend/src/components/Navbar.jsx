import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Ticket, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth(); // Using real state now!

  const isHome = location.pathname === '/';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isHome ? 'bg-gradient-to-b from-gray-950/90 to-transparent py-6' : 'bg-gray-950 border-b border-gray-800 py-4'}`}>
      <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white hover:text-red-500 transition-colors">
          <Ticket className="text-red-600" />
          <span>Cine<span className="text-red-600">Sync</span></span>
        </Link>

        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium hover:text-red-500 transition-colors">Dashboard</Link>
              <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Sign In</Link>
              <Link to="/signup" className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl text-sm font-bold transition-colors">
                <User size={16} /> Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
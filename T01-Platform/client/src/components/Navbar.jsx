import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export const Logo = ({ size = 'text-3xl' }) => (
  <span className={`${size} font-extrabold text-cream-soft`}>storiisto<span className="text-amber">.</span></span>
);

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const link = ({ isActive }) => `text-sm ${isActive ? 'text-amber' : 'text-cream-soft hover:text-amber'} transition`;
  const close = () => setOpen(false);
  const dash = user?.role === 'admin' ? ['/admin', 'Admin'] : ['/dashboard', 'My Solutions'];

  const doLogout = async () => { await logout(); navigate('/'); };

  // Logged-out visitors still see "options": clicking it sends them to Login, then straight back to options.
  const links = (
    <>
      <NavLink to="/" end className={link}>Home</NavLink>
      <NavLink to="/options" className={link}>Right Solutions</NavLink>
      <NavLink to="/about" className={link}>Our Story</NavLink>
      {user && <NavLink to={dash[0]} className={link}>{dash[1]}</NavLink>}
    </>
  );

  return (
    <header className="bg-navy-900 sticky top-0 z-40">
      <div className="container-storiisto flex items-center justify-between min-h-[72px]">
        <Link to="/" onClick={close}><Logo /></Link>

        <nav className="hidden md:flex items-center gap-9">{links}</nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? <button className="btn-primary" onClick={doLogout}>Logout</button> : <Link to="/register" className="btn-primary">Register / Login for Free</Link>}
        </div>

        <button className="md:hidden text-cream-soft" aria-label="Menu" onClick={() => setOpen(!open)}>
          {open ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-navy-900 border-t border-navy-700 px-5 pb-5 flex flex-col gap-4 pt-4" onClick={close}>
          {links}
          {user ? <button className="btn-primary" onClick={doLogout}>Logout</button> : <Link to="/register" className="btn-primary">Register / Login for Free</Link>}
        </div>
      )}
    </header>
  );
}

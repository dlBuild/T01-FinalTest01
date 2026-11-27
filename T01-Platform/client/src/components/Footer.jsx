
import { Link } from 'react-router-dom';
import { Logo } from './Navbar';

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-cream-soft/70">
      <div className="container-storiisto py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-10-6">

        {/* Brand Section */}
        <div>
          <Logo size="text-4xl" />
          <p className="text-lg mt-6 max-w-sm">
            Starting small. Building meaningful solutions for students and young people in India.
          </p>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
          <Link to="https://www.youtube.com/@storiisto" className="hover:text-amber">YouTube</Link>
          <Link to="https://www.instagram.com/storiisto_" className="hover:text-amber">Instagram</Link>

          <Link to="/register" className="hover:text-amber">Register / Login</Link> 
          <Link to="/options" className="hover:text-amber">Explore Solutions</Link>
          <Link to="/about" className="hover:text-amber">Our Story</Link>
          <Link to="/faq" className="hover:text-amber">FAQ</Link>
       

          <Link to="/contact" className="hover:text-amber">Contact</Link>
          <Link to="/feedback" className="hover:text-amber">Feedback</Link>
          <Link to="/terms" className="hover:text-amber">Terms</Link>
          <Link to="/refund-policy" className="hover:text-amber">Refunds</Link>
          <Link to="/privacy" className="hover:text-amber">Privacy</Link>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-navy-700 py-5 text-center text-xs">
        © {new Date().getFullYear()} storiisto. All rights reserved.
      </div>
    </footer>
  );
}




// import { Link } from 'react-router-dom';
// import { Logo } from './Navbar';

// export default function Footer() {
//   return (
//     <footer className="bg-navy-900 text-cream-soft/70">
//       <div className="container-storiisto py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
//         <div>
//           <Logo size="text-2xl" />
//           <p className="text-sm mt-2 max-w-sm">Starting small. Building meaningful solutions for students and young people in India.</p>
//         </div>
//         <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
//           <Link to="https://en.wikipedia.org/wiki/Pollution" className="hover:text-amber"> Add Yt Link Here-Wiki Polution</Link>
          
//           <Link to="/options" className="hover:text-amber">options</Link>
//           <Link to="/about" className="hover:text-amber">About</Link>
//           <Link to="/register" className="hover:text-amber">Register / Login</Link>
//           <Link to="/contact" className="hover:text-amber">Contact</Link>
//           <Link to="/terms" className="hover:text-amber">Terms</Link>
//           <Link to="/refund-policy" className="hover:text-amber">Refunds</Link>
//           <Link to="/privacy" className="hover:text-amber">Privacy</Link>
//         </div>
//       </div>
//       <div className="border-t border-navy-700 py-4 text-center text-xs">© {new Date().getFullYear()} storiisto. All rights reserved.</div>
//     </footer>
//   );
// }

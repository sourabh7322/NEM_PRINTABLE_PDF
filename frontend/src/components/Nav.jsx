import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };
  useEffect(() => {
    if(localStorage.getItem('token')){
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <header className="p-3 text-bg-dark"style={{width:"100vw","display":"flex" ,"justifyContent":"center","alignItems":"center"}}>
      <div className="container">
        <div className="">
          <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlinkHref="#bootstrap"></use></svg>
          </Link>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><Link to="/" className="nav-link px-2 text-secondary">Home</Link></li>
            <li><Link to="/PdfMaker" className="nav-link px-2 text-white">Pdf</Link></li>
            
            <li><Link to="/pricing" className="nav-link px-2 text-white">Pricing</Link></li>
            <li><Link to="/faqs" className="nav-link px-2 text-white">FAQs</Link></li>
            <li><Link to="/about" className="nav-link px-2 text-white">About</Link></li>
          </ul>

          <div className="text-end">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="btn btn-outline-light me-2" style={{}}>Logout</button>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
                <Link to="/signup" className="btn btn-warning">Sign-up</Link>
                
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
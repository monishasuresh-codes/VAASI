import { Link } from "react-router-dom";
import './Navbar.css'
import logo from '../assets/logo.png'
import search from '../assets/search.png'
import wishlist from '../assets/wishlist.png'
import cart from '../assets/cart.png'
import profile from '../assets/profile.png'
import { useEffect, useState } from "react";


function Navbar(){
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth > 768) {
            setMenuOpen(false);
        }
    };

    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
    };
}, []);
    
    return(
        <div>
        <nav className="navbar">
              <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}> ☰ </button>
                            {/* Mobile menu */}
                {menuOpen && (
                    <div className="mobile-menu">

                        <Link
                            to="/"
                            onClick={() => setMenuOpen(false)}
                        >
                            Home
                        </Link>

                        <Link
                            to="/Read"
                            onClick={() => setMenuOpen(false)}
                        >
                            Read Books
                        </Link>


                        <Link
                            to="/Categories"
                            onClick={() => setMenuOpen(false)}
                        >
                            Categories
                        </Link>

                        <Link
                            to="/Library"
                            onClick={() => setMenuOpen(false)}
                        >
                            My Library
                        </Link>

                        

                    </div>
                )}
            <img className="nav-logo" src={logo} alt="hero-banner"></img>
            <div className="nav-links">
            <Link to={'/'}>Home</Link>
            <Link to={'/Read'}>Read Books</Link>
            <Link to={'/categories'}>Categories</Link>
            <Link to={'/library'}>My Library</Link>
            </div>
            <div className="nav-actions">
            <Link to={'/explore'}><img className="icon" src={search} alt="search"></img></Link>
            <Link to={'/wishlist'}><img className="icon"  src={wishlist} alt="wishlist"></img></Link>
            <Link to={'/cart'}><img className="icon" src={cart} alt="cart"></img></Link>
            <Link to={'/profile'}><img className="icon"  src={profile} alt="profile"></img></Link>
            <div className="nav-auth-links"><Link to="/login" className="nav-login">Login</Link></div>
            </div>
          

        </nav>
        </div>
    )
}
export default Navbar;
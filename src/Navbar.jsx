
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span></span>
        SmartSoil
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <a href="/dashboard">Dashboard</a>
        <Link to="/history">History</Link>
        <Link to="/about">About</Link>
      </div>

      <Link to="/dashboard" className="nav-button">
        Get Started
      </Link>
    </nav>
  );
}

export default NavBar;

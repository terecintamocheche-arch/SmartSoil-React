
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();

  function goToSection(section) {
    if (location.pathname !== "/") {
      window.location.href = `/#${section}`;
    } else {
      document.getElementById(section)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span></span>SmartSoil
      </Link>

      <div className="nav-links">
        <button onClick={() => goToSection("home")}>Home</button>
        <button onClick={() => goToSection("dashboard")}>Dashboard</button>
        <button onClick={() => goToSection("history")}>History</button>
        <Link to="/about">About</Link>
      </div>

      <button
        className="nav-button"
        onClick={() => goToSection("configuration")}
      >
        Get Started
      </button>
    </nav>
  );
}

export default NavBar;


import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="hero-tag">SMART AGRICULTURE</p>

        <h1>
          IRRIGATE BETTERRRR
        </h1>

        <p className="hero-description">
          Make informed irrigation decisions with soil moisture data
          and crop-specific recommendations.
        </p>

        <Link to="/dashboard" className="hero-button">
          Explore Dashboard
        </Link>
      </div>
    </section>
  );
}

export default Hero;

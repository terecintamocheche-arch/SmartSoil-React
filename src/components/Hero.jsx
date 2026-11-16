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

        <a href="#configuration" className="hero-button">
          Explore Dashboard
        </a>
      </div>

      <div className="hero-image">
        <img src="/src/assets/hero.png" alt="Agricultural field" />
      </div>
    </section>
  );
}

export default Hero;
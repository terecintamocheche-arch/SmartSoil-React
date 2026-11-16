function NavBar() {
    return(
        <nav className="navbar">
            <a href="#home" className="logo">
                <span></span>SmartSoil
            </a>

            <div className="nav-links">
                <a href="#home">Home</a>
                <a href="#dashboard">Dashboard</a>
                <a href="#history">History</a>
                <a href="#about">About</a>
            </div>

            <a href="#configuration" className="nav-button">
                Get Started
            </a>
            </nav>
    );

}

export default NavBar;


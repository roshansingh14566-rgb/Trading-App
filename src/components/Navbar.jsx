
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <NavLink className="logo" to="/" onClick={closeMenu}>
        ZERODHA
      </NavLink>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <div className={`nav-links ${menuOpen ? "menu-open" : ""}`}>
        <NavLink to="/orders" onClick={closeMenu}>Orders</NavLink>
        <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
        <NavLink to="/products" onClick={closeMenu}>Products</NavLink>
        <NavLink to="/pricing" onClick={closeMenu}>Pricing</NavLink>
        <NavLink to="/about" onClick={closeMenu}>About</NavLink>
      </div>
    </nav>
  );
}


import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <Link className="logo" to="/">ZERODHA</Link>
      <p>Independent student frontend project.</p>
      <p>Not an official Zerodha website. No real trading available.</p>
      <Link to="/products">Explore Products</Link>
    </footer>
  );
}


import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TradingProvider } from "./context/TradingContext";

import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home1.jsx";
import Products from "./pages/Products";
import Pricing from "./pages/Pricing";
import About from "./pages/About";

import "./App.css";

function App() {
  return (
    <TradingProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />

          <Route
            path="*"
            element={
              <main className="page-section">
                <h1>404 - Page not found</h1>
                <a className="primary-button" href="/">
                  Back to Home
                </a>
              </main>
            }
          />
        </Routes>

        <Footer />
      </BrowserRouter>
    </TradingProvider>
  );
}

export default App;

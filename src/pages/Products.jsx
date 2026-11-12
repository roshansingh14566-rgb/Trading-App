
const products = [
  {
    number: "01",
    name: "Kite",
    category: "TRADING PLATFORM",
    description: "Explore an intuitive trading interface concept with market watchlists and portfolio insights.",
    features: ["Market watchlist", "Portfolio overview", "Order interface"],
    icon: "↗"
  },
  {
    number: "02",
    name: "Console",
    category: "ANALYTICS PLATFORM",
    description: "Understand your investments through a clean portfolio analytics and reporting experience.",
    features: ["Investment reports", "Performance insights", "Holdings overview"],
    icon: "▥"
  },
  {
    number: "03",
    name: "Coin",
    category: "MUTUAL FUNDS",
    description: "Discover a simple mutual fund interface concept with investment information and tracking.",
    features: ["Fund discovery", "Investment tracking", "Portfolio insights"],
    icon: "◈"
  }
];

export default function Products() {
  return (
    <main className="products-page">
      <section className="products-heading">
        <p className="eyebrow">OUR PLATFORM</p>
        <h1>Tools for smarter investing.</h1>
        <p>
          Explore our collection of investing and analytics
          interface concepts.
        </p>
      </section>

      <section className="products-grid">
        {products.map((product) => (
          <article className="product-card" key={product.number}>
            <div className="product-top">
              <span className="product-icon">{product.icon}</span>
              <span className="product-number">{product.number}</span>
            </div>

            <p className="product-category">{product.category}</p>
            <h2>{product.name}</h2>
            <p className="product-description">
              {product.description}
            </p>

            <ul>
              {product.features.map((feature) => (
                <li key={feature}>✓ {feature}</li>
              ))}
            </ul>

            <span className="product-link">
              Explore concept <span>→</span>
            </span>
          </article>
        ))}
      </section>

      <p className="products-note">
        Independent student frontend project. These are illustrative
        interface concepts, not live trading services.
      </p>
    </main>
  );
}


const pricingOptions = [
  {
    name: "Account Opening",
    price: "Explore",
    description: "Understand the account setup process.",
    features: [
      "Account setup information",
      "Simple onboarding concept",
      "Transparent information"
    ]
  },
  {
    name: "Equity & Intraday",
    price: "View charges",
    description: "Explore the pricing structure for trading.",
    features: [
      "Equity delivery information",
      "Intraday trading information",
      "Applicable charges overview"
    ],
    featured: true
  },
  {
    name: "Mutual Funds",
    price: "Explore",
    description: "Understand mutual fund investment costs.",
    features: [
      "Fund investment information",
      "Portfolio tracking concept",
      "Cost transparency"
    ]
  }
];

export default function Pricing() {
  return (
    <main className="pricing-page">
      <section className="pricing-heading">
        <p className="eyebrow">SIMPLE & TRANSPARENT</p>
        <h1>Pricing that stays clear.</h1>
        <p>
          Explore the different cost categories in this
          investing platform concept.
        </p>
      </section>

      <section className="pricing-grid">
        {pricingOptions.map((option) => (
          <article
            className={`pricing-card ${option.featured ? "featured" : ""}`}
            key={option.name}
          >
            {option.featured && (
              <span className="popular-label">FEATURED</span>
            )}

            <h2>{option.name}</h2>
            <p className="pricing-description">
              {option.description}
            </p>

            <div className="pricing-amount">
              {option.price}
            </div>

            <div className="pricing-divider"></div>

            <ul>
              {option.features.map((feature) => (
                <li key={feature}>✓ {feature}</li>
              ))}
            </ul>

            <a href="/products" className="pricing-button">
              Explore products →
            </a>
          </article>
        ))}
      </section>

      <section className="pricing-disclaimer">
        <h2>Know what you're paying for.</h2>
        <p>
          This is an independent frontend project. The pricing
          cards are design examples, not official or current
          Zerodha brokerage charges. Check the official charges
          schedule before making investment decisions.
        </p>
      </section>
    </main>
  );
}

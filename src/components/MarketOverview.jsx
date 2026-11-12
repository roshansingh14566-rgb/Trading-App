
const indiaStocks = [
  { name: "Reliance Industries", symbol: "RELIANCE" },
  { name: "Tata Consultancy Services", symbol: "TCS" },
  { name: "Infosys Limited", symbol: "INFY" },
  { name: "HDFC Bank", symbol: "HDFCBANK" }
];

const usStocks = [
  { name: "Apple Inc.", symbol: "AAPL" },
  { name: "Microsoft", symbol: "MSFT" },
  { name: "NVIDIA", symbol: "NVDA" },
  { name: "Amazon", symbol: "AMZN" }
];

function MarketCard({ title, exchange, stocks, currency }) {
  return (
    <section className="professional-market-card">
      <div className="professional-market-header">
        <div>
          <h2>{title}</h2>
          <p>{exchange}</p>
        </div>
        <span className="feed-badge">Demo feed</span>
      </div>

      <div className="professional-stock-list">
        {stocks.map((stock) => (
          <div className="professional-stock-row" key={stock.symbol}>
            <div className="professional-stock-avatar">
              {stock.symbol.charAt(0)}
            </div>

            <div className="professional-stock-info">
              <h3>{stock.name}</h3>
              <span>{stock.symbol}</span>
            </div>

            <div className="professional-stock-price">
              <strong>—</strong>
              <span>{currency} · No live feed</span>
            </div>
          </div>
        ))}
      </div>

      <div className="market-card-footer">
        Market data connection pending
      </div>
    </section>
  );
}

function MarketOverview() {
  return (
    <section className="professional-market-section">
      <div className="professional-market-title">
        <div>
          <h2>Market Overview</h2>
          <p>Explore stocks across global markets</p>
        </div>
        <span className="market-demo-label">
          Practice Mode
        </span>
      </div>

      <div className="professional-market-grid">
        <MarketCard
          title="Indian Market"
          exchange="NSE · India"
          stocks={indiaStocks}
          currency="INR"
        />

        <MarketCard
          title="US Market"
          exchange="NASDAQ · USA"
          stocks={usStocks}
          currency="USD"
        />
      </div>
    </section>
  );
}

export default MarketOverview;

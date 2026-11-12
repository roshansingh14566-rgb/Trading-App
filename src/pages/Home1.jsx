
import { useMemo, useState } from "react";
import { useTrading } from "../context/TradingContext";
import TradingViewChart from "../components/TradingViewChart";

const stocks = [
  { name: "Reliance Industries", symbol: "RELIANCE", price: "1,452.50", change: "+1.45%" },
  { name: "Tata Consultancy Services", symbol: "TCS", price: "3,210.80", change: "+0.82%" },
  { name: "Infosys Limited", symbol: "INFY", price: "1,520.25", change: "-0.35%" },
  { name: "HDFC Bank", symbol: "HDFCBANK", price: "1,680.40", change: "+1.12%" }
];

const usStocks = [
  { name: "Apple Inc.", symbol: "AAPL", price: "269.00", change: "+1.20%" },
  { name: "Microsoft", symbol: "MSFT", price: "510.00", change: "+0.85%" },
  { name: "NVIDIA", symbol: "NVDA", price: "195.00", change: "+2.10%" },
  { name: "Amazon", symbol: "AMZN", price: "245.00", change: "-0.45%" }
];

const USD_TO_INR = 85;

const formatINR = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;

const formatUSD = (value) =>
  `$${Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;

function Home() {
  const [market, setMarket] = useState("INDIA");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStock, setSelectedStock] = useState(null);
  const [quantity, setQuantity] = useState("1");
  const [tradeMessage, setTradeMessage] = useState(null);

  const {
    balance,
    holdings,
    transactions,
    buyStock,
    sellStock
  } = useTrading();

  const marketStocks = market === "INDIA" ? stocks : usStocks;

  const filteredStocks = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return marketStocks.filter(
      (stock) =>
        stock.name.toLowerCase().includes(term) ||
        stock.symbol.toLowerCase().includes(term)
    );
  }, [marketStocks, searchTerm]);

  const getINRPrice = (stock, marketType) => {
    const price = Number(stock.price.replace(/,/g, ""));
    return marketType === "US" ? price * USD_TO_INR : price;
  };

  const getCurrentPrice = (symbol, marketType = "INDIA") => {
    const list = marketType === "US" ? usStocks : stocks;
    const stock = list.find((item) => item.symbol === symbol);
    return stock ? getINRPrice(stock, marketType) : 0;
  };

  const totalInvested = holdings.reduce(
    (sum, item) => sum + item.quantity * item.averagePrice,
    0
  );

  const portfolioValue = holdings.reduce(
    (sum, item) =>
      sum +
      getCurrentPrice(item.symbol, item.market || "INDIA") *
        item.quantity,
    0
  );

  const profitLoss = portfolioValue - totalInvested;
  const profitLossPercent =
    totalInvested > 0 ? (profitLoss / totalInvested) * 100 : 0;

  const tradePrice = selectedStock
    ? getINRPrice(selectedStock, market)
    : 0;

  const estimatedTotal = tradePrice * Number(quantity || 0);

  const handleTrade = (type) => {
    if (!selectedStock) return;

    const qty = Number(quantity);

    if (!Number.isInteger(qty) || qty <= 0) {
      setTradeMessage({
        type: "error",
        text: "Enter a valid whole-number quantity."
      });
      return;
    }

    const result =
      type === "BUY"
        ? buyStock(
            {
              ...selectedStock,
              market,
              price: tradePrice
            },
            qty
          )
        : sellStock(
            selectedStock.symbol,
            qty,
            tradePrice,
            market
          );

    setTradeMessage({
      type: result.success ? "success" : "error",
      text: result.message
    });

    if (result.success) {
      setQuantity("1");
    }
  };

  const selectMarket = (nextMarket) => {
    setMarket(nextMarket);
    setSelectedStock(null);
    setSearchTerm("");
    setTradeMessage(null);
  };

  return (
    <main className="dashboard pro-dashboard">
      <section className="dashboard-topbar">
        <div>
          <p className="eyebrow">PAPER TRADING WORKSPACE</p>
          <h1>Portfolio dashboard</h1>
          <p className="dashboard-subtitle">
            Monitor your virtual investments and practice trading.
          </p>
        </div>
        <span className="demo-label">SIMULATED DATA</span>
      </section>

      <section className="portfolio-grid">
        <article className="portfolio-card">
          <p>Available funds</p>
          <h2>{formatINR(balance)}</h2>
          <span>Virtual cash balance</span>
        </article>

        <article className="portfolio-card">
          <p>Portfolio value</p>
          <h2>{formatINR(portfolioValue)}</h2>
          <span>{holdings.length} stock positions</span>
        </article>

        <article className="portfolio-card">
          <p>Total P&amp;L</p>
          <h2 className={profitLoss >= 0 ? "positive" : "negative"}>
            {profitLoss >= 0 ? "+" : "-"}
            {formatINR(Math.abs(profitLoss))}
          </h2>
          <span className={profitLoss >= 0 ? "positive" : "negative"}>
            {profitLossPercent.toFixed(2)}% overall return
          </span>
        </article>
      </section>


      <section className="trading-workspace terminal-layout">

        {/* LEFT: MARKET WATCH */}
        <aside className="analytics-card watchlist-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">MARKETS</p>
              <h2>Market Watch</h2>
            </div>
            <span className="demo-label">DEMO</span>
          </div>

          <div className="market-selector">
            <button
              className={market === "INDIA" ? "active-market" : ""}
              onClick={() => selectMarket("INDIA")}
            >
              India
            </button>

            <button
              className={market === "US" ? "active-market" : ""}
              onClick={() => selectMarket("US")}
            >
              United States
            </button>
          </div>

          <input
            className="stock-search"
            type="search"
            placeholder="Search company or symbol"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <div className="watchlist-table">
            <div className="watchlist-header">
              <span>Instrument</span>
              <span>Price</span>
              <span>Change</span>
            </div>

            {filteredStocks.map((stock) => (
              <div
                className={`watchlist-row ${
                  selectedStock?.symbol === stock.symbol ? "selected-stock" : ""
                }`}
                key={stock.symbol}
              >
                <div>
                  <strong>{stock.symbol}</strong>
                  <small>{stock.name}</small>
                </div>

                <strong>
                  {market === "US"
                    ? formatUSD(Number(stock.price.replace(/,/g, "")))
                    : formatINR(Number(stock.price.replace(/,/g, "")))}
                </strong>

                <span className={stock.change.startsWith("+") ? "positive" : "negative"}>
                  {stock.change}
                </span>

                <button
                  className="trade-button"
                  onClick={() => {
                    setSelectedStock(stock);
                    setQuantity("1");
                    setTradeMessage(null);
                  }}
                >
                  Trade
                </button>
              </div>
            ))}

            {filteredStocks.length === 0 && (
              <p className="empty-holdings">No matching stocks found.</p>
            )}
          </div>
        </aside>

        {/* CENTER: CHART */}
        <section className="analytics-card chart-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">PRICE ANALYSIS</p>
              <h2>{selectedStock?.symbol || (market === "US" ? "AAPL" : "RELIANCE")}</h2>
            </div>
            <span className="demo-label">CHART</span>
          </div>

          <TradingViewChart
            key={`${market}-${selectedStock?.symbol || "DEFAULT"}`}
            symbol={selectedStock?.symbol || (market === "US" ? "AAPL" : "RELIANCE")}
            market={market}
          />
        </section>

        {/* RIGHT: ORDER ENTRY */}
        <aside className="analytics-card order-entry-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">TRADING</p>
              <h2>Order Entry</h2>
            </div>
          </div>

          {selectedStock ? (
            <>
              <div className="selected-instrument">
                <h3>{selectedStock.symbol}</h3>
                <p>{selectedStock.name}</p>
                <strong>
                  {market === "US"
                    ? formatUSD(Number(selectedStock.price.replace(/,/g, "")))
                    : formatINR(Number(selectedStock.price.replace(/,/g, "")))}
                </strong>
              </div>

              <label htmlFor="trade-quantity">Quantity</label>
              <input
                id="trade-quantity"
                className="stock-search"
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
              />

              <div className="trade-total">
                <span>Estimated order value</span>
                <strong>{formatINR(estimatedTotal)}</strong>
              </div>

              <div className="trade-actions">
                <button onClick={() => handleTrade("BUY")}>Buy</button>
                <button onClick={() => handleTrade("SELL")}>Sell</button>
              </div>

              {tradeMessage && (
                <p className={`trade-message ${tradeMessage.type}`}>
                  {tradeMessage.text}
                </p>
              )}

              <button
                className="close-trade"
                onClick={() => setSelectedStock(null)}
              >
                Clear selection
              </button>
            </>
          ) : (
            <div className="empty-order">
              <p>Select a stock from Market Watch to place an order.</p>
            </div>
          )}

          <div className="order-summary">
            <p>Available funds</p>
            <strong>{formatINR(balance)}</strong>

            <p>Portfolio value</p>
            <strong>{formatINR(portfolioValue)}</strong>

            <p>Total P&amp;L</p>
            <strong className={profitLoss >= 0 ? "positive" : "negative"}>
              {profitLoss >= 0 ? "+" : "-"}{formatINR(Math.abs(profitLoss))}
            </strong>
          </div>

          <p className="trade-note">
            Practice account. Stock prices are sample values, not live exchange quotes.
          </p>
        </aside>

      </section>


      <section className="holdings-section">
        <div className="holdings-heading">
          <div>
            <p className="eyebrow">YOUR INVESTMENTS</p>
            <h2>Holdings</h2>
          </div>
          <span>{holdings.length} positions</span>
        </div>

        {holdings.length === 0 ? (
          <p className="empty-holdings">
            No holdings yet. Select a stock from Market Watch to place a
            practice order.
          </p>
        ) : (
          <div className="table-scroll">
            <div className="holdings-table">
              <div className="holding-row holding-header">
                <span>Instrument</span>
                <span>Market</span>
                <span>Qty</span>
                <span>Avg. price</span>
                <span>Current value</span>
                <span>P&L</span>
              </div>

              {holdings.map((item) => {
                const currentPrice = getCurrentPrice(
                  item.symbol,
                  item.market || "INDIA"
                );

                const invested = item.quantity * item.averagePrice;
                const currentValue = item.quantity * currentPrice;
                const holdingPnL = currentValue - invested;

                return (
                  <div
                    className="holding-row"
                    key={`${item.market || "INDIA"}-${item.symbol}`}
                  >
                    <div>
                      <strong>{item.symbol}</strong>
                      <small>{item.name}</small>
                    </div>

                    <span>{item.market || "INDIA"}</span>
                    <span>{item.quantity}</span>
                    <span>{formatINR(item.averagePrice)}</span>
                    <strong>{formatINR(currentValue)}</strong>

                    <strong className={holdingPnL >= 0 ? "positive" : "negative"}>
                      {holdingPnL >= 0 ? "+" : "-"}
                      {formatINR(Math.abs(holdingPnL))}
                    </strong>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      <section className="history-section">
        <div className="holdings-heading">
          <div>
            <p className="eyebrow">ACCOUNT ACTIVITY</p>
            <h2>Recent transactions</h2>
          </div>
          <span>{transactions.length} trades</span>
        </div>

        {transactions.length === 0 ? (
          <p className="empty-holdings">Your executed trades will appear here.</p>
        ) : (
          <div className="table-scroll">
            <div className="history-table">
              <div className="history-row history-header">
                <span>Instrument</span>
                <span>Side</span>
                <span>Market</span>
                <span>Quantity</span>
                <span>Price</span>
                <span>Total</span>
                <span>Date</span>
              </div>

              {transactions.slice(0, 10).map((trade) => (
                <div className="history-row" key={trade.id}>
                  <strong>{trade.symbol}</strong>
                  <strong className={trade.type === "BUY" ? "positive" : "negative"}>
                    {trade.type}
                  </strong>
                  <span>{trade.market || "INDIA"}</span>
                  <span>{trade.quantity}</span>
                  <span>{formatINR(trade.price)}</span>
                  <span>{formatINR(trade.total)}</span>
                  <small>
                    {new Date(trade.date || trade.id).toLocaleDateString("en-IN")}
                  </small>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;

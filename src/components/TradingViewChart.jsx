
import { useEffect, useRef } from "react";

function TradingViewChart({ symbol, market }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !symbol) return;

    container.innerHTML = "";

    const symbolMap = {
      RELIANCE: "NSE:RELIANCE",
      TCS: "NSE:TCS",
      INFY: "NSE:INFY",
      HDFCBANK: "NSE:HDFCBANK",
      AAPL: "NASDAQ:AAPL",
      MSFT: "NASDAQ:MSFT",
      NVDA: "NASDAQ:NVDA",
      AMZN: "NASDAQ:AMZN"
    };

    const tradingViewSymbol =
      symbolMap[symbol] ||
      (market === "US" ? `NASDAQ:${symbol}` : `NSE:${symbol}`);

    const widgetContainer = document.createElement("div");
    widgetContainer.className = "tradingview-widget-container__widget";
    widgetContainer.style.width = "100%";
    widgetContainer.style.height = "650px";

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;

    const config = {
      autosize: true,
      symbol: tradingViewSymbol,
      interval: "D",
      timezone: "Asia/Kolkata",
      theme: "dark",
      style: "1",
      locale: "en",
      allow_symbol_change: true,
      calendar: false,
      support_host: "https://www.tradingview.com"
    };

    script.textContent = JSON.stringify(config);

    container.appendChild(widgetContainer);
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [symbol, market]);

  return (
    <div
      ref={containerRef}
      className="tradingview-widget-container tradingview-chart-wrapper"
      style={{
        width: "100%",
        height: "650px",
        position: "relative"
      }}
    />
  );
}

export default TradingViewChart;


import { createContext, useContext, useEffect, useState } from "react";

const TradingContext = createContext(null);
const STARTING_BALANCE = 1000000;

export function TradingProvider({ children }) {
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem("virtualBalance");
    return saved !== null ? Number(saved) : STARTING_BALANCE;
  });

  const [holdings, setHoldings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("virtualHoldings")) || [];
    } catch {
      return [];
    }
  });

  const [transactions, setTransactions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("virtualTransactions")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("virtualBalance", String(balance));
  }, [balance]);

  useEffect(() => {
    localStorage.setItem("virtualHoldings", JSON.stringify(holdings));
  }, [holdings]);

  useEffect(() => {
    localStorage.setItem("virtualTransactions", JSON.stringify(transactions));
  }, [transactions]);

  const buyStock = (stock, quantity) => {
    const qty = Number(quantity);
    const price = Number(stock.price);
    const market = stock.market || "INDIA";
    const total = price * qty;

    if (!Number.isInteger(qty) || qty <= 0 || !Number.isFinite(price) || price <= 0) {
      return { success: false, message: "Invalid quantity or price." };
    }

    if (total > balance) {
      return { success: false, message: "Insufficient virtual balance." };
    }

    const existing = holdings.find(
      (item) => item.symbol === stock.symbol &&
        (item.market || "INDIA") === market
    );

    if (existing) {
      setHoldings((previous) =>
        previous.map((item) =>
          item.symbol === stock.symbol &&
          (item.market || "INDIA") === market
            ? {
                ...item,
                quantity: item.quantity + qty,
                averagePrice:
                  (item.quantity * item.averagePrice + total) /
                  (item.quantity + qty),
              }
            : item
        )
      );
    } else {
      setHoldings((previous) => [
        ...previous,
        {
          symbol: stock.symbol,
          name: stock.name,
          market,
          quantity: qty,
          averagePrice: price,
        },
      ]);
    }

    setBalance((previous) => previous - total);

    setTransactions((previous) => [
      {
        id: Date.now(),
        symbol: stock.symbol,
        name: stock.name,
        market,
        type: "BUY",
        quantity: qty,
        price,
        total,
        date: new Date().toISOString(),
      },
      ...previous,
    ]);

    return {
      success: true,
      message: `Bought ${qty} shares of ${stock.symbol}.`,
    };
  };

  const sellStock = (symbol, quantity, currentPrice, market = "INDIA") => {
    const qty = Number(quantity);
    const price = Number(currentPrice);

    const holding = holdings.find(
      (item) => item.symbol === symbol &&
        (item.market || "INDIA") === market
    );

    if (!Number.isInteger(qty) || qty <= 0 || !Number.isFinite(price) || price <= 0) {
      return { success: false, message: "Invalid quantity or price." };
    }

    if (!holding || qty > holding.quantity) {
      return { success: false, message: "You don't own enough shares." };
    }

    const total = price * qty;

    setHoldings((previous) =>
      previous
        .map((item) =>
          item.symbol === symbol &&
          (item.market || "INDIA") === market
            ? { ...item, quantity: item.quantity - qty }
            : item
        )
        .filter((item) => item.quantity > 0)
    );

    setBalance((previous) => previous + total);

    setTransactions((previous) => [
      {
        id: Date.now(),
        symbol,
        name: holding.name,
        market,
        type: "SELL",
        quantity: qty,
        price,
        total,
        date: new Date().toISOString(),
      },
      ...previous,
    ]);

    return {
      success: true,
      message: `Sold ${qty} shares of ${symbol}.`,
    };
  };

  return (
    <TradingContext.Provider
      value={{ balance, holdings, transactions, buyStock, sellStock }}
    >
      {children}
    </TradingContext.Provider>
  );
}

export function useTrading() {
  const context = useContext(TradingContext);

  if (!context) {
    throw new Error("useTrading must be used inside TradingProvider");
  }

  return context;
}

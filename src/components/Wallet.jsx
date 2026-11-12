
import { useTrading } from "../context/TradingContext";

export default function Wallet() {
  const { balance } = useTrading();

  const formatINR = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);

  return (
    <section className="wallet-card">
      <div>
        <p className="wallet-label">AVAILABLE VIRTUAL BALANCE</p>

        <h2>{formatINR(balance)}</h2>

        <p className="wallet-note">
          Paper trading account · Virtual money only
        </p>
      </div>

      <div className="wallet-icon">₹</div>
    </section>
  );
}

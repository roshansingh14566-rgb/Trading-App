
import { useTrading } from "../context/TradingContext";

export default function Orders() {
  const { transactions } = useTrading();

  return (
    <main className="orders-page">
      <div className="orders-heading">
        <p className="eyebrow">TRADING ACTIVITY</p>
        <h1>Order Book</h1>
        <p>Track your paper trading activity.</p>
      </div>

      <div className="orders-card">
        <div className="orders-card-header">
          <h2>Order History</h2>
          <span>{transactions.length} orders</span>
        </div>

        {transactions.length === 0 ? (
          <div className="orders-empty">
            <h3>No orders yet</h3>
            <p>Your executed trades will appear here.</p>
          </div>
        ) : (
          <div className="orders-table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Stock</th>
                  <th>Type</th>
                  <th>Market</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <strong>{order.symbol}</strong>
                      <small>{order.name}</small>
                    </td>
                    <td>
                      <span className={order.type === "BUY" ? "order-buy" : "order-sell"}>
                        {order.type}
                      </span>
                    </td>
                    <td>{order.market || "INDIA"}</td>
                    <td>{order.quantity}</td>
                    <td>{order.price.toLocaleString("en-IN")}</td>
                    <td>{order.total.toLocaleString("en-IN")}</td>
                    <td>{new Date(order.date).toLocaleString()}</td>
                    <td><span className="order-executed">Executed</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

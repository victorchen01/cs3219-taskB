const StockD = ({stock}) => {
    return (
      <div className="stock-details">
        <h1>Ticker: {stock.ticker}</h1>
        <p>Entry price: ${stock.entry}</p>
        <p># of shares: {stock.quantity}</p>
      </div>
    )
}

export default StockD
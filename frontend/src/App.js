import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { useEffect, useState } from 'react'
import StockD from './StockDetails';
import StockF from './StockForm';

function App() {

  const [stock, setStock] = useState(null)

  useEffect(() => {
    const fetchStock = async () => {
      const response = await fetch('/api/stocks/1') 
      const json = await response.json()

      if(response.ok){
        setStock(json)
      }
    }

    fetchStock()

  }, [])

  return (
    <div className="App">
      <div className="Stocks">
        {stock && stock.map((s) => (
          <StockD key={s._id} stock={s}/>
        ))}
      </div>
      <div className="Create">
        <StockF />
      </div>
    </div>
  );
}

export default App;

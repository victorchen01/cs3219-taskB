import { useState } from 'react'
import Form from 'react-bootstrap/Form';

const StockF = () => {

    const [ticker, setTicker] = useState('')
    const [entry, setEntry] = useState('')
    const [quantity, setQuantity] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const stock = {ticker, entry, quantity}

        const response = await fetch('/api/stocks', {
            method: 'POST',
            body: JSON.stringify(stock),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){SpeechSynthesisErrorEvent(json.error)}
        if(response.ok){
            setTicker('')
            setEntry('')
            setQuantity('')
            setError(null)
            console.log('new stock added')
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h4>Add new Stock</h4>
            <label>Ticker:</label>
            <input
                type="text"
                onChange={(e) => setTicker(e.target.value)}
                value={ticker}
            />

            <label>Entry:</label>
            <input
                type="number"
                onChange={(e) => setEntry(e.target.value)}
                value={entry}
            />

            <label>Quantity:</label>
            <input
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
            />

            <button>Add stock</button>
        </form>
    )
}

export default StockF
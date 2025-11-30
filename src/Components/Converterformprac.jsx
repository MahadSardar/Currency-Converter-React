import React, { useEffect,useState } from 'react'
import CurrencySelect from './CurrencySelect.jsx'

const Converterformprac = () => {

    const [fromcurrency,setFromcurrency] = useState("USD");
    const [tocurrency,setTocurrency] = useState("PKR");
    const [amount,setAmount] = useState(100);
    const [result,setResult] = useState();

    const handleswapcurrency =()=>{
        setFromcurrency(tocurrency);
        setTocurrency(fromcurrency)
    }
    const getexchangerate = async()=>{
        const API_KEY = import.meta.env.VITE_API_KEY;
        const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromcurrency}/${tocurrency}`

        try {
            const response = await fetch(API_URL);
            if(!response.ok) throw Error("Somthing went wrong while fetching the data");

            const data = await response.json();
            const rate = (data.conversion_rate * amount).toFixed(2);
            
            setResult(`${amount} ${fromcurrency} = ${rate} ${tocurrency}`)
        } catch (error) {
            console.log(error)
        }
    }
    const handleformsubmit = (e)=>{
        e.preventDefault();
        getexchangerate();
    }
    
    useEffect(()=>getexchangerate,[]);


  return (
    <form className='converter-form' onSubmit={handleformsubmit}>

        <div className="form-group" >
            <label htmlFor="" className='form-label'>Enter Amount</label>
            <input type="number" className='form-input' required value={amount} onChange={e=>setAmount(e.target.value)} />
        </div>

        <div className='form-group form-currency-group'>

            <div className="form-section">
                <label htmlFor="" className='form-label'>From</label>
                <CurrencySelect selectedcurrency={fromcurrency} handlecurrency={e=>setFromcurrency(e.target.value)}/>
            </div>
        

        <div className="swap-icon" onClick={handleswapcurrency}>
            <svg
              width="16"
              viewBox="0 0 20 19"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
                fill="#fff"
              />
            </svg>
        </div>

        <div className="form-section">
            <label htmlFor="" className='form-label'>To</label>
            <CurrencySelect selectedcurrency={tocurrency} handlecurrency={e => setFromcurrency(e.target.value)}/>
        </div>

        </div>
        <button type='submit' className='submit-button'>Get Exchange Rate</button>
        <p className='exchange-rate'>{result}</p>
    </form>
  )
}

export default Converterformprac

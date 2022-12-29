import { useState, useEffect } from "react";
import CurrencyInput from "../currencyInput/currencyInput";
import api from '../../api'
import './toolbar.scss'

const ToolBar = (props) => {

  const [amount1, setAmount1] = useState();
  const [amount2, setAmount2] = useState();
  const [currency1, setCurrency1] = useState('EUR');
  const [currency2, setCurrency2] = useState('USD');
  const [rates, setRates] = useState([]);

  useEffect(() => {
    api.getRatesUsd()
      .then(response => {
        setRates(response.data.rates);
      })
  }, []);

  useEffect(() => {
    if (!!rates) {
      function init() {
        handleAmount1Change(1);
      }
      init();
    }
  }, [rates]);


  const handleSaveSuccessfully = (response) => {
    props.handleSave(response);
  }
  function format(number) {
    return number.toFixed(4);
  }

  function handleAmount1Change(amount1) {
    if (amount1) {
      setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
      setAmount1(amount1);
    }
  }

  function handleCurrency1Change(currency1) {
    if (currency1) {
      setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
      setCurrency1(currency1);
    }
  }

  function handleAmount2Change(amount2) {
    if (amount2) {
      setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
      setAmount2(amount2);
    }
  }

  function handleCurrency2Change(currency2) {
    if (currency2) {
      setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
      setCurrency2(currency2);
    }
  }

  const saveRate = () => {
    const currConversion = {};
    currConversion.base = currency2;
    currConversion.updated = Math.floor((new Date()).getTime() / 1000);
    currConversion.baseAmount = amount2;
    currConversion.rates = {};
    currConversion.rates[currency1] = amount1;
    api.insertRate(currConversion).then(response => handleSaveSuccessfully(response.data));
  }


  return (
    <div className="toolbar-class">
      <h1>Exchange</h1>
      <div className="currency-exchange-form">
        <CurrencyInput
          label={"Currency from"}
          onAmountChange={handleAmount1Change}
          onCurrencyChange={handleCurrency1Change}
          currencies={Object.keys(rates)}
          amount={amount1}
          currency={currency1} />
        <div style={{"alignSelf":"center"}}>
          <label style={{"fontSize":"20px"}}>
            {"="}
          </label>
        </div>
        <CurrencyInput
          label={"Currency to"}
          onAmountChange={handleAmount2Change}
          onCurrencyChange={handleCurrency2Change}
          currencies={Object.keys(rates)}
          amount={amount2}
          currency={currency2} />
        <button id="saveButton" onClick={() => { saveRate() }}>Save</button>
      </div>
    </div>
  );
}

export default ToolBar;

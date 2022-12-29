import './currencyInput.scss';

function CurrencyInput(props) {
  return (
    <div className="group">
      <div className="form-input-group">
        <div className="input-label">
          <label>
            {props.label}
          </label>
        </div>
        <div className="select-input">
          <select className='no-scroll' value={props.currency} onChange={ev => props.onCurrencyChange(ev.target.value)}>
            {props.currencies.map((currency => (
              <option value={currency}>{currency}</option>
            )))}
          </select>
        </div>

      </div>

      <div className="form-input-group">
        <div className="input-label">
          <label>
            {"Amount:"}
          </label>
        </div>
        <input type="text" value={props.amount} onChange={ev => props.onAmountChange(ev.target.value)} />

      </div>
    </div>
  );
}

export default CurrencyInput;
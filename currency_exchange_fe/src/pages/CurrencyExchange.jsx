import { useState, useRef } from "react";
import '../style/currencyExchange.scss'
import ToolBar from "../components/ToolBar/ToolBar";
import HistoricData from "../components/historyData/HistoricData";

const CurrencyExchange = () => {
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const historyDataRef = useRef();
    const handleSave = (rate) => {
        historyDataRef.current.updateRates(rate);
        setSnackBarOpen(true);
        setTimeout(function() {setSnackBarOpen(false)}, 5000);
    }
    return (
        <div className="currency-exchange-app">
            <div className="tool-bar">
                <ToolBar handleSave={(rate) => handleSave(rate)} />
            </div>
            <div>
                <HistoricData ref={historyDataRef} />
            </div>
            {snackBarOpen &&<div className="status-bar">
                    {"Exchange submitted."}
            </div>}
        </div>
    )
}

export default CurrencyExchange;
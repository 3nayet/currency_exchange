import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import api from '../../api'
import io from 'socket.io-client';
import dateFormat from "dateformat";
import DatePicker from "react-datepicker";
import DataTable from 'react-data-table-component';
import './historyData.scss'
import 'react-datepicker/dist/react-datepicker.css';

const HistoricData = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        updateRates(rate) {
            setRates([...rates, getRatesRecordsFromObj(rate)].flatMap(v => v));
        }
    }));

    const [rates, setRates] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [showTable, setShowTable] = useState(true);
    const [socket, setSocket] = useState(null);

    const [filterStartDate, setFilterStartDate] = useState();
    const [filterEndDate, setFilterEndDate] = useState();

    useEffect(() => {
        const newSocket = io(`http://localhost:3001`);
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);


    useEffect(() => {
        const socketMessageListener = (rate) => {
            console.log('message received from server');
            console.log(rate);
            setRates([...rates, getRatesRecordsFromObj(rate)].flatMap(v => v))
        };
        socket?.on('rateMessage', socketMessageListener);
        return () => {
            socket?.off('rateMessage', socketMessageListener);
        };
    }, [socket]);

    useEffect(() => {
        if (!rates.length) {
            setShowTable(false);
        } else {
            setShowTable(true);
        }
    }, [rates]);

    useEffect(() => {
        setLoading(true);
        api.getRates().then(rates => {
            setRates(rates.data.flatMap(currRate => getRatesRecordsFromObj(currRate)));
            setLoading(false);
        })
    }, []);


    const handleFilterRequest = ()=>{
        setLoading(true);
        api.getDateFiltered(filterStartDate? Math.floor(filterStartDate.getTime() / 1000): null, filterEndDate?
        Math.floor(filterEndDate.getTime() / 1000):null).then(rates => {
            setRates(rates.data.flatMap(currRate => getRatesRecordsFromObj(currRate)));
            setLoading(false);
        });
    }

    const getRatesRecordsFromObj = currRate => Object.entries(currRate.rates).map(([k, v], index) => {
        let rate = {};
        var d = new Date(0);
        d.setUTCSeconds(+currRate.updated);
        rate.rateDate = dateFormat(d, "dd/mm/yyyy, HH:MM");
        rate.amountTo = currRate.baseAmount ? currRate.baseAmount.toString() : "1";
        rate.currencyTo = currRate.base ? currRate.base.toString() : "";
        rate.amountFrom = v ? v.toString() : "";
        rate.currencyFrom = k ? k.toString() : "";
        rate.type = currRate.liveRate ? "Live Price" : "Exchanged";
        rate.index = index;
        return rate;
    });
    const columns = [
        {
            name: 'Date & Time',
            selector: (row) => row.rateDate,
            sortable: true,
        },
        {
            name: 'Currency From',
            selector: (row) => row.currencyFrom,
            sortable: true,
        },
        {
            name: 'Amount1',
            selector: (row) => row.amountFrom,
            sortable: true,
        },
        {
            name: 'Currency To',
            selector: (row) => row.currencyTo,
            sortable: true,
        },
        {
            name: 'Amount2',
            selector: (row) => row.amountTo,
            sortable: true,
        },
        {
            name: 'Type',
            selector: (row) => row.type,
            sortable: true,
            cell: row => <div className={`${row.type === "Exchanged" ? "Price-exchange" : "price-live"}`}>{row.type}</div>
        }
    ];
    
    return (
        <div id='history-data-component'>
            <h1>History</h1>
            <div className='history-filters-form'>
                <div className="date-picker-input">
                    <div className="input-label">
                        <label>
                            {"From date"}
                        </label>
                    </div>
                    <DatePicker selected={filterStartDate} onChange={(date) => setFilterStartDate(date)} />
                </div>
                <div className="date-picker-input">
                    <div className="input-label">
                        <label>
                            {"To date"}
                        </label>
                    </div>
                    <DatePicker selected={filterEndDate} onChange={(date) => setFilterEndDate(date)} />
                </div>
                <button id="filterButton" onClick={() => handleFilterRequest()}>Filter</button>
            </div>
            {showTable && (<DataTable
                columns={columns}
                data={rates}
                striped={true}
                progressPending={isLoading}
                pagination
            />)}
        </div>
    )
});

export default HistoricData;
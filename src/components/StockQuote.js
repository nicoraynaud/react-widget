import React, {useState, useEffect} from 'react';
import moment from 'moment';
import axiosInstance from './../index';

const MARKET_STACK_QUOTE_URL = `${process.env.REACT_APP_MARKETSTACK_BASE_URL}/intraday`;
const MARKET_STACK_TICKER_URL = `${process.env.REACT_APP_MARKETSTACK_BASE_URL}/tickers`;

function StockQuote(props) {
    const [quote, setQuote] = useState({
        price: '--',
        var: '--',
        time: '--'
    });
    const [stock, setStock] = useState({
        stockExchange: 'N/A',
        name: 'N/A',
    });

    useEffect(() => {
        axiosInstance.get(MARKET_STACK_QUOTE_URL, {
            params: {
                access_key: process.env.REACT_APP_MARKETSTACK_ACCESS_KEY,
                symbols: props.symbol,
                interval: '15min',
                date_from: moment().subtract(1, 'day').format('YYYY-MM-DD'),
                date_to: moment().format('YYYY-MM-DD'),
                limit: '1',
            }
        }).then((result) => {
            if (!result.data.data || result.data.data.length <= 0) {
                return;
            }
            const lastQuote = result.data.data[0];
            setQuote({
                price: lastQuote.last,
                var: Math.trunc(-(1 - (lastQuote.last/lastQuote.open)) * 10000) / 100,
                time: moment(lastQuote.date).format('YYYY-MM-DD HH:mm'),
            })
        });
    });

    useEffect(() => {
        axiosInstance.get(`${MARKET_STACK_TICKER_URL}/${props.symbol}`, {
            params: {
                access_key: process.env.REACT_APP_MARKETSTACK_ACCESS_KEY,
            }
        }).then((result) => {
            if (!result.data) {
                return;
            }
            setStock({
                stockExchange: result.data.stock_exchange.acronym,
                name: result.data.name,
            })
        });
    });

    const varColor = quote.var < 0 ? 'text-red-500' : 'text-green-500';

    return (
        <div className={'quote rounded-lg shadow-md p-4 bg-gray-800'}>
            <span className={'quoteSymbol text-sm text-white font-bold'}>{props.symbol}</span>
            <span className={'quoteSymbol text-2xs text-gray-400 ml-1'}>{stock.name}</span>
            <span className={'quoteSymbol text-2xs text-gray-400 ml-1'}>({stock.stockExchange})</span>
            <div className={'quote flex flex-row justify-between mt-1'}>
                <div className={'quotePrice self-center text-2xl font-bold items-center text-white'}>${quote.price}</div>
                <div className={'flex flex-col text-right'}>
                    <div className={'quoteVar ' + varColor}>{quote.var}%</div>
                    <div className={'quoteTime text-right text-2xs text-gray-400'}>{quote.time}</div>
                </div>
            </div>
        </div>
    );
}

export default StockQuote;

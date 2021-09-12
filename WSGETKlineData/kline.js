const log = console.log;
const api = require('binance');
const express = require('express');
const app = express();
const server = app.listen('4000',() => log(`Kline Data Server started on port 4000`));
const socket = require('socket.io');
const io = socket(server);

const bRest = new api.BinanceRest({
        key: "", // Get this from your account on binance.com
        secret: "", // Same for this
        timeout: 15000, // Optional, defaults to 15000, is the request time out in milliseconds
        recvWindow: 20000, // Optional, defaults to 5000, increase if you're getting timestamp errors
        disableBeautification: false,
        handleDrift: true
});
const binanceWS = new api.BinanceWS(true);
// const bws = binanceWS.onKline('BTCUSDT', '1m', (data) => {
//     io.sockets.emit('KLINE',{time:Math.round(data.kline.startTime/1000),open:parseFloat(data.kline.open),high:parseFloat(data.kline.high),low:parseFloat(data.kline.low),close:parseFloat(data.kline.close)});
// });

// Docs: https://binance-docs.github.io/apidocs/spot/en/#kline-candlestick-data
  // Sampele binance kline
  /* {
  "e": "kline",     // Event type
  "E": 123456789,   // Event time
  "s": "BNBBTC",    // Symbol
  "k": {
    "t": 123400000, // Kline start time
    "T": 123460000, // Kline close time
    "s": "BNBBTC",  // Symbol
    "i": "1m",      // Interval
    "f": 100,       // First trade ID
    "L": 200,       // Last trade ID
    "o": "0.0010",  // Open price
    "c": "0.0020",  // Close price
    "h": "0.0025",  // High price
    "l": "0.0015",  // Low price
    "v": "1000",    // Base asset volume
    "n": 100,       // Number of trades
    "x": false,     // Is this kline closed?
    "q": "1.0000",  // Quote asset volume
    "V": "500",     // Taker buy base asset volume
    "Q": "0.500",   // Taker buy quote asset volume
    "B": "123456"   // Ignore
  }
}*/
const bws = binanceWS.onKline('BTCUSDT', '1d', (data) => {
    io.sockets.emit('KLINE',data);
    // io.sockets.emit('KLINE',
    // {time:Math.round(data.kline.startTime/1000),open:parseFloat(data.kline.open),high:parseFloat(data.kline.high),low:parseFloat(data.kline.low),close:parseFloat(data.kline.close)}
    // );
});

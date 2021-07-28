const fs = require('fs');
const rawdata = fs.readFileSync('hypoport.json');
const stockdata = JSON.parse(rawdata);

// saves results in file
let date1 = new Date(lowestValue() * 1000);
let date2 = new Date(highestValue() * 1000);
let date3 = new Date(highestDifference() * 1000);
let avPrice = findAverage();

writeToFile(date1,date2,date3,avPrice);


// --- Functions ---

function lowestValue(){

    let sortedStockData = stockdata.prices.sort(mycomparator);

    function mycomparator(a,b) {
        return a.low - b.low;
    }

    let i = 0;
    while (sortedStockData[i].low == null) {
        i++;
    }
    return sortedStockData[i].date;

}

function highestValue(){

    let sortedStockData = stockdata.prices.sort(mycomparator);

    function mycomparator(a,b) {
        return b.high - a.high;
    }

    let i = 0;
    while (sortedStockData[i].high == null) {
        i++;
    }
    return sortedStockData[i].date;

}

function highestDifference(){

    let sortedStockData = stockdata.prices.sort(mycomparator);

    function mycomparator(a,b) {
        return (b.open - b.close) - (a.open - a.close);
    }

    let i = 0;
    while (sortedStockData[i].open == null || sortedStockData[i].close == null) {
        i++;
    }
    return sortedStockData[i].date;

}

function findAverage(){
    let average = 0;
    let count = 0;
    for (let i = 0; i < stockdata.prices.length; i++) {
        if(stockdata.prices[i].close != null){
            average += stockdata.prices[i].adjclose;
            // here you could also use the 'close'! wasn't 100% sure which one was meant
            count++;
        }
    }
    return parseFloat(average / count).toFixed(8);
}

function writeToFile(date1, date2, date3, avPrice) {

    // Data which will be written
    let dataArray = ['date with the lowest rate: ' + Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }).format(date1),
    '\ndate with the highest rate: ' + Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }).format(date2),
    '\ndate with the highest difference: ' + Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }).format(date3),
    '\naverage closing price of the share: ' + avPrice];
    
    // Write data in 'outcome.txt'
    fs.writeFile('outcome.txt', dataArray, (err) => {
        if (err) throw err;
    })

}

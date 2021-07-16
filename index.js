readFile();

// saves results in file
let date1 = new Date(2010, 7, 5);
let date2 = new Date(2020, 8, 5);
let date3 = new Date(2030, 9, 5);
let avPrice = 111.08;

writeToFile(date1,date2,date3,avPrice);


// --- Functions ---

function readFile(){

    const fs = require('fs');

    let rawdata = fs.readFileSync('hypoport.json');
    let stockdata = JSON.parse(rawdata);

    let sortedStockData = stockdata.prices.sort(mycomparator);

    function mycomparator(a,b) {
        return b.low - a.low;
    }

    console.log(sortedStockData[0].date);

}

function writeToFile(date1, date2, date3, avPrice) {

    const fs = require('fs')

    // Data which will be written
    let dataArray = ['day with the lowest rate: (23 Mar 2020) ' + Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }).format(date1),
    '\nday with the highest rate: (05 Oct 2020) ' + Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }).format(date2),
    '\nday with the highest difference: (03 Nov 2020) ' + Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }).format(date3),
    '\naverage closing price of the share: (382.08) ' + avPrice];
    
    // Write data in 'outcome.txt'
    fs.writeFile('outcome.txt', dataArray, (err) => {
        if (err) throw err;
    })

}
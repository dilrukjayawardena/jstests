var groupBy = function(array, k) {
    return array.reduce(function(acc, cur) {
        (acc[cur[k]] = acc[cur[k]] || []).push(cur);
        return acc;
    }, {});
};

var dayTrade =
    `[
  {"user": "Rob", "company": "Google", "countOfStocks": 5},
  {"user": "Bill", "company": "Goldman", "countOfStocks": 18},
  {"user": "Rob", "company": "JPMorgan", "countOfStocks": 10},
  {"user": "Dave", "company": "Boeing", "countOfStocks": 10}
]`;

function getTrades(dayTrade, chunkSize, page) {
    const dayTradeObj = JSON.parse(dayTrade);
    const objsGroups = groupBy(dayTradeObj, "user")
    var summedObj = []
    Object.keys(objsGroups).forEach(key => {
        total = objsGroups[key].reduce((total, gp) => total + gp.countOfStocks, 0);
        console.log(total)
        let jObj = { "user": key, "totalStocks": total }
        summedObj.push(jObj)
    })
    sorted = summedObj.sort((a, b) => (a.totalStocks < b.totalStocks) ? 1 : -1)
    data = [...Array(Math.ceil(sorted.length / chunkSize))].map(_ => sorted.splice(0, chunkSize))
    return data[page - 1]
}

console.log(getTrades(dayTrade, 2, 2))
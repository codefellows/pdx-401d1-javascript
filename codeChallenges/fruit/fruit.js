var fruit = [
  ['apple',       59], ['banana',      32], ['coconut',   155],
  ['grapefruit', 128], ['jackfruit', 1100], ['kiwi',       41],
  ['lemon',       70], ['mango',       97], ['orange',     73],
  ['papaya',     254], ['pear',        37], ['pineapple', 399],
  ['watermelon', 500] ];

const name = 0, cost = 1; // "enums" for fruit's 2nd dimension
var len = fruit.length; // Cache

function printSoln(indexSet) {
  var outStr = '';
  var hist = new Array(len).fill(0);// pick could use hist, but would waste RAM
  indexSet.forEach( ele => { hist[ele]++; } ); // Populate histogram
  hist.forEach( (ele, idx) => {
    if (ele > 0) {
      var pluralStr = (ele > 1) ? 's' : ''; // Handle plurals
      outStr += ele+' '+fruit[idx][name]+pluralStr+', ';
    }
  });
  outStr = outStr.slice(0, outStr.length-2); // Cut trailing comma and space
  console.log('Soln. #' + solutionCount++ + ': ' + outStr);
}

function pick(idx, left, buyList) { // curr. idx, remaining funds, array idx list
  var c = fruit[idx][cost];
  if (c > left) return; // Not enough money left

  left -= c; // 'Buy' the current fruit
  buyList.push(idx);
  if (0 == left)  printSoln(buyList); // Found a solution

  if (left >  0) // Keep searching (recursive)
    for (var jj=idx; jj < len; jj++) { pick(jj, left, buyList.slice()); }
}

var solutionCount = 1;
// Loop thru all possible "first fruit to put in the basket"
for (var ii=0; ii<len; ii++)  pick(ii, 500, []); // "500" = 500 pennies

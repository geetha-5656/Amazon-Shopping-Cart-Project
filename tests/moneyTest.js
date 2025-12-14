import {formatCurrency} from '../scripts/utils/money.js';

// grouping related tests together
console.log('test suite: formatCurrency'); 

// automated tests for formatCurrency function

console.log('converts cents to dollars correctly');
if (formatCurrency(2095) === '20.95'){
    console.log('passed ')
}
else{
  console.log('failed');
}
//  the cents part is rounded correctly
console.log("rounds cents correctly");
if(formatCurrency(0)=== '0.00'){
  console.log('passed');
}
else{
  console.log('failed');
}

//Situation = test case
//1.basic Test Case = it tests if the code is working for normal inputs.
//2.edge test case = it tests if the code is working for extreme means like very high values or zero values.and negative values.
console.log('handles rounding correctly');
if(formatCurrency(2000.5)=== '20.01'){
  console.log('passed');
}
else{
  console.log('failed');
}
import {formatCurrency} from '../scripts/utils/money.js';

// to create testing suite for formatCurrency function

describe('test suite:formatCurrency',() =>{
  // 'it' is the another function that provided by jasmine to create individual test cases.

  it('consverts cents to dollars correctly',()=>{
    // expect() lets us compare value to another value.
     expect(formatCurrency(2095)).toEqual('20.95');
  });

// 2nd.
  it ('works with 0',()=>{
    expect (formatCurrency(0)).toEqual('0.00');
  });

  //3rd.

  it('handles rounding correctly',()=>{
    expect(formatCurrency(2000.5)).toEqual('20.01');
  })
});
export function formatCurrency(priceCents){
  return `${(Math.round(priceCents)/100).toFixed(2)}`;
}
// export the function as default export7
export default formatCurrency;

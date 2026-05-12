export function formatMoney(value) {
  return `${Number(value).toLocaleString('en-US').replace(/,/g, ' ')} so'm`;
}

export function formatPricePerSquareMeter(value) {
  return `${formatMoney(value)}/m2`;
}

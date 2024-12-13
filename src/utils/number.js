export function formatNumberWithSeparator(number, separator = '.') {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
}

export default {
  formatNumberWithSeparator
}
export function hasISOStringFormat(arg: any): arg is string {
  if (typeof arg !== 'string') {
    return false;
  }

  // Regular expression to match ISO string format
  const isoStringRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;
  return isoStringRegex.test(arg);
}

// Example usage
const isoString = "2024-04-18T12:00:00Z";
console.log(hasISOStringFormat(isoString)); // Output: true

const notISOString = "2024-04-18 12:00:00";
console.log(hasISOStringFormat(notISOString)); // Output: false
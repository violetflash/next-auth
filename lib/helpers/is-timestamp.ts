function isTimestamp(value: any): value is number {
  return typeof value === 'number' && !isNaN(value) && value > 0;
}

export function hasTimestampFormat(arg: any): arg is number {
  if (!isTimestamp(arg)) {
    return false;
  }

  // Check if the number is within a reasonable range for a timestamp
  const minTimestamp = 0; // Adjust according to your needs
  const maxTimestamp = new Date('2100-01-01').getTime(); // Adjust according to your needs
  return arg >= minTimestamp && arg <= maxTimestamp;
}

// Example usage
const timestamp = new Date().getTime();
console.log(hasTimestampFormat(timestamp)); // Output: true

const notTimestamp = "2024-04-18T12:00:00";
console.log(hasTimestampFormat(notTimestamp)); // Output: false
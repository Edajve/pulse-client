export const  formatCountryName = (input)  => {
    // Replace underscores with spaces, convert to lowercase, and capitalize the first letter of each word
  return input
  .replace(/_/g, ' ')
  .toLowerCase()
  .split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');
  }
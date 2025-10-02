/**
 * Formats a date string into a localized, long-form date string (e.g., "1 January 2023")
 * using the 'en-GB' locale.
 *
 * @param dateString The date string to format (e.g., '2023-01-01').
 * @returns The formatted date string.
 */
export function formatDate(dateString: string): string {
  // Define the Date object options for formatting
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  // Create a Date object from the input string
  const date: Date = new Date(dateString);

  // Use toLocaleDateString with 'en-GB' locale and the defined options
  // The 'en-GB' locale results in a format like 'day month year' (e.g., '1 January 2023')
  return date.toLocaleDateString('en-GB', options);
}

// Example of how to use it (optional, for context)
// const formattedDate = formatDate('2023-10-27T10:00:00Z');
// console.log(formattedDate); // Output: "27 October 2023"
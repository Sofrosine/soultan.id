/**
 * Format a date as ISO string (YYYY-MM-DD)
 * @param date - Date string in any format or Date object
 * @returns ISO formatted date string
 */
export function formatDateForSitemap(date: string | Date): string {
    let dateObj: Date;

    if (typeof date === 'string') {
        // Parse the date string (assuming format like "June 1, 2025")
        dateObj = new Date(date);

        // Check if the date is valid
        if (isNaN(dateObj.getTime())) {
            console.warn(`Invalid date format: ${date}, using current date instead`);
            dateObj = new Date();
        }
    } else {
        dateObj = date;
    }

    return dateObj.toISOString();
}

/**
 * Get the current date as ISO string
 * @returns Current date in ISO format
 */
export function getCurrentDate(): string {
    return new Date().toISOString();
}
// scripts/update-sitemap-dates.js
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

// Path to your data file
const dataFilePath = path.join(__dirname, '../src/lib/data.ts');

// Read the data file
fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading data file:', err);
        process.exit(1);
    }

    // Get current date in ISO format
    const today = new Date().toISOString().split('T')[0];

    // Update lastModified dates - this is a simple example
    // In a real-world scenario, you might want to be more selective
    // about which items to update
    const updatedData = data.replace(
        /lastModified: ['"][\d-]+['"]/g,
        `lastModified: '${today}'`
    );

    // Write the updated data back to the file
    fs.writeFile(dataFilePath, updatedData, 'utf8', (err) => {
        if (err) {
            console.error('Error writing data file:', err);
            process.exit(1);
        }
        console.log('Updated lastModified dates in data file');
    });
});
import csv from 'csv-parser';
import { Readable } from 'stream';

/**
 * @param {string} text
 * @param {string} Header
 * @returns {object}
 */
export default async (text, headers) => {
    headers = headers.split(',');

    const stream = Readable.from(text);
    const response = await new Promise((resolve, reject) => {
        const results = [];
        stream.pipe(csv({ headers }))
            .on('data', (data) => results.push(data))
            .on('end', () => {
                resolve(results);
            });
    });
    
    const header = Object.keys(response.shift());
    const records = response;
    const parser = {
        csv: { header, records },
        to_json: () => JSON.stringify({ header, records }),
    }

    return parser;
}

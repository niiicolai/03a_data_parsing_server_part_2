
/**
 * @param {string} text
 * @returns {string}
 */
export default (text) => {
    return {
        json: JSON.stringify(JSON.parse(text)),
    }
}

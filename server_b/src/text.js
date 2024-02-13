
/**
 * @param {string} text
 * @returns {string}
 */
export default (text) => {
    return {
        text,
        to_json: () => JSON.stringify({ text }),
    }
}

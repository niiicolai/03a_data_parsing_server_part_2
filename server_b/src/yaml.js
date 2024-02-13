import { stringify, parse } from 'yaml'

export default (text) => {
    return {
        yaml: stringify(text),
        to_json: () => JSON.stringify(parse(text)),
    }
}

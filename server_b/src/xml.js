import { XMLParser, XMLBuilder } from 'fast-xml-parser';

export default (text) => {
    const parser = new XMLParser();
    let jObj = parser.parse(text);
    const builder = new XMLBuilder();
    const xmlContent = builder.build(jObj);
    
    return {
        xml: xmlContent,
        to_json: () => JSON.stringify(jObj),
    };
}

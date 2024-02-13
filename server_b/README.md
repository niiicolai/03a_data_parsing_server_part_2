# Data Parsing Server B
Fetches data from a URL and return the data as JSON.

# Usage
```
$ npm start
```

# Endpoints
```
GET /csv.json?url={url}&header={header1,header2}
GET /json.json?url={url}
GET /xml.json?url={url}
GET /yaml.json?url={url}
GET /text.json?url={url}
```

# Use Server A as parser
```
GET /csv.json?url={url}&server=A
GET /json.json?url={url}&server=A
GET /xml.json?url={url}&server=A
GET /yaml.json?url={url}&server=A
GET /text.json?url={url}&server=A
```

# Examples
1. Start the development server
2. Test a URL below
    * http://localhost:3000/csv.json?url=http://localhost:3000/data.csv&header=Name,Age
    * http://localhost:3000/json.json?url=http://localhost:3000/data.json
    * http://localhost:3000/xml.json?url=http://localhost:3000/data.xml
    * http://localhost:3000/yaml.json?url=http://localhost:3000/data.yml
    * http://localhost:3000/text.json?url=http://localhost:3000/data.txt

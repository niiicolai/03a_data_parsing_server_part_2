# Data Parsing Server A
Fetches data from a URL and return the data as JSON.

# Usage
```
$ flask --app main run
```

# Endpoints
```
GET /csv.json?url={url}
GET /json.json?url={url}
GET /xml.json?url={url}
GET /yaml.json?url={url}
GET /text.json?url={url}
```

# Use Server B as parser
```
GET /csv.json?url={url}&server=B&header={header1,header2}
GET /json.json?url={url}&server=B
GET /xml.json?url={url}&server=B
GET /yaml.json?url={url}&server=B
GET /text.json?url={url}&server=B
```

# Server A Examples
1. Start the development server
2. Test a URL below
    * http://127.0.0.1:5000/csv.json?url=http://127.0.0.1:5000/static/data.csv
    * http://127.0.0.1:5000/json.json?url=http://127.0.0.1:5000/static/data.json
    * http://127.0.0.1:5000/xml.json?url=http://127.0.0.1:5000/static/data.xml
    * http://127.0.0.1:5000/yaml.json?url=http://127.0.0.1:5000/static/data.yml
    * http://127.0.0.1:5000/text.json?url=http://127.0.0.1:5000/static/data.txt

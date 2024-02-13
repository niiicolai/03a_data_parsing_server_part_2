# Data Parsing Server A & B
Fetches data from a URL and return the data as JSON.

# Start Server A
```
$ cd server_a
$ flask --app main run
```

# Start Server B
```
$ cd server_b
$ npm start
```

# Use Server A directly
1. Start the development server A
2. Test one of the URLs below requesting server A to use server B as parser
    * http://127.0.0.1:5000/csv.json?url=http://127.0.0.1:5000/static/data.csv
    * http://127.0.0.1:5000/json.json?url=http://127.0.0.1:5000/static/data.json
    * http://127.0.0.1:5000/xml.json?url=http://127.0.0.1:5000/static/data.xml
    * http://127.0.0.1:5000/yaml.json?url=http://127.0.0.1:5000/static/data.yml
    * http://127.0.0.1:5000/text.json?url=http://127.0.0.1:5000/static/data.txt

# Use Server B as parser for Server A
1. Start the development servers (A & B)
2. Test one of the URLs below requesting server A to use server B as parser
    * http://127.0.0.1:5000/csv.json?url=http://127.0.0.1:5000/static/data.csv&server=B&header=Name,Age
    * http://127.0.0.1:5000/json.json?url=http://127.0.0.1:5000/static/data.json&server=B
    * http://127.0.0.1:5000/xml.json?url=http://127.0.0.1:5000/static/data.xml&server=B
    * http://127.0.0.1:5000/yaml.json?url=http://127.0.0.1:5000/static/data.yml&server=B
    * http://127.0.0.1:5000/text.json?url=http://127.0.0.1:5000/static/data.txt&server=B

# Use Server B directly
1. Start the development server B
2. Test one of the URLs below requesting server A to use server B as parser
    * http://localhost:3000/csv.json?url=http://localhost:3000/data.csv&header=Name,Age
    * http://localhost:3000/json.json?url=http://localhost:3000/data.json
    * http://localhost:3000/xml.json?url=http://localhost:3000/data.xml
    * http://localhost:3000/yaml.json?url=http://localhost:3000/data.yml
    * http://localhost:3000/text.json?url=http://localhost:3000/data.txt

# Use Server A as parser for Server B
1. Start the development servers (A & B)
2. Test one of the URLs below requesting server A to use server B as parser
    * http://localhost:3000/csv.json?url=http://localhost:3000/data.csv&header=Name,Age&server=A
    * http://localhost:3000/json.json?url=http://localhost:3000/data.json&server=A
    * http://localhost:3000/xml.json?url=http://localhost:3000/data.xml&server=A
    * http://localhost:3000/yaml.json?url=http://localhost:3000/data.yml&server=A
    * http://localhost:3000/text.json?url=http://localhost:3000/data.txt&server=A

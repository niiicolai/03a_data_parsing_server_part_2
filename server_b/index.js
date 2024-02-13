import express from "express";
import parseCSV from "./src/csv.js";
import parseJSON from "./src/json.js";
import parseXML from "./src/xml.js";
import parseYAML from "./src/yaml.js";
import parseText from "./src/text.js";

const app = express();

app.use(express.static("public"));

const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        return { error: `HTTP error! status: ${response.status}` };
    }

    return { text: await response.text() };
};

const fetchServerA = async (url, endpoint) => {
    const serverAURL = `http://127.0.0.1:5000/${endpoint}?url=${url}`;
    const response = await fetch(serverAURL);
    if (!response.ok) {
        return { error: `HTTP error! status: ${response.status}` };
    }

    return { json: await response.json() };
};

const useServerA = (req) => {
    return req.query.server === "A";
}

const handleResponseServerA = async (req, res, endpoint) => {
    console.log("Using server A for endpoint", endpoint);

    const url = req.query.url;
    if (!url) res.send({ error: "URL is required" });

    const response = await fetchServerA(url, endpoint);
    if (response.error)
        res.send({ error: response.error });

    res.send(response.json);
};

const handleResponse = async (req, res, callback) => {
    console.log("Handling response");

    const url = req.query.url;
    if (!url) res.send({ error: "URL is required" });

    const response = await fetchData(url);
    if (response.error)
        res.send({ error: response.error });
    else if (response.text === "")
        res.send({ error: "Empty response from the server at the given URL" });

    const content = await callback(response.text);
    res.send(content);
}

app.get("/csv.json", async (req, res) => {
    const header = req.query.header;
    if (!header) {
        res.send({ error: "Header is required" });
        return;
    }
    
    if (useServerA(req)) {
        await handleResponseServerA(req, res, "csv.json");
        return;
    }

    await handleResponse(req, res, async (text) => {
        const parser = await parseCSV(text, header);
        return parser.to_json();
    });
});

app.get("/json.json", async (req, res) => {
    if (useServerA(req)) {
        await handleResponseServerA(req, res, "json.json");
        return;
    }

    await handleResponse(req, res, async (text) => {
        const parser = await parseJSON(text);
        return parser.json;
    });
});

app.get("/xml.json", async (req, res) => {
    if (useServerA(req)) {
        await handleResponseServerA(req, res, "xml.json");
        return;
    }

    handleResponse(req, res, async (text) => {
        const parser = await parseXML(text);
        return parser.to_json();
    });
});

app.get("/yaml.json", async (req, res) => {
    if (useServerA(req)) {
        await handleResponseServerA(req, res, "yaml.json");
        return;
    }

    handleResponse(req, res, async (text) => {
        const parser = await parseYAML(text);
        return parser.to_json();
    });
});

app.get("/text.json", async (req, res) => {
    if (useServerA(req)) {
        await handleResponseServerA(req, res, "text.json");
        return;
    }

    handleResponse(req, res, async (text) => {
        const parser = await parseText(text);
        return parser.to_json();
    });
});

app.listen(3000, () => {
    console.log("Listen on the port 3000...");
});

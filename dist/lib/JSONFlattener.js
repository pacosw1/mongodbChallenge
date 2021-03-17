"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const fs = require("fs");
//takes care of parsing flattening and generating output json.
class JSONFlattener {
    constructor(json, outputPath, inputFileName) {
        this.error = undefined;
        this.output = {};
        this.parseJSON(json);
        this.outputPath = outputPath;
        this.inputFileName = inputFileName;
    }
    //attemp to parse json
    parseJSON(json) {
        try {
            this.jsonObject = JSON.parse(json);
        }
        catch (err) {
            this.error = {
                message: "JSON parsing failed, please check your file and try again"
            };
        }
    }
    //flattenJSON json object
    flattenJSON() {
        if (this.error)
            return;
        const rootKeys = Object.keys(this.jsonObject);
        //go through each root key like a n-tree depth first
        rootKeys.forEach(rootKey => {
            this.flattenKeyField(this.jsonObject, rootKey, rootKey);
        });
    }
    //recursive function to traverse nested keys
    flattenKeyField(obj, key, path) {
        if (!utils_1.hasChildren(obj, key))
            return this.output[path] = obj[key];
        const children = utils_1.getChildren(obj, key);
        if (children.length === 0)
            return this.output[path] = obj[key];
        children.forEach(childKey => {
            this.flattenKeyField(obj[key], childKey, `${path}.${childKey}`);
        });
    }
    printOutput() {
        if (this.error)
            return console.log(this.error.message + '\n');
        console.log(this.output);
    }
    //attempt to generate json file in selected directory
    generateJSONFile() {
        try {
            fs.writeFileSync(`${this.outputPath}/flattened_${this.inputFileName}_${+new Date()}.json`, JSON.stringify(this.output));
        }
        catch (err) {
            console.log("Failed to save json file" + err);
        }
    }
}
exports.JSONFlattener = JSONFlattener;

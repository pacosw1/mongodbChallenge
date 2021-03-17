"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const JSONFlattener_1 = require("./JSONFlattener");
const process_1 = require("process");
const utils_1 = require("./utils");
const args = process.argv;
//input file validation
if (args.length < 3) {
    console.log("specify an input file");
    process_1.exit(0);
}
//attempt to read input file
let json;
const inputPath = args[2];
try {
    json = fs.readFileSync(inputPath, 'utf-8');
}
catch (err) {
    console.log("Invalid or non existing input file \n");
    process_1.exit(0);
}
//flattener class reads json and flattens it.
const flattener = new JSONFlattener_1.JSONFlattener(json, "./output", "");
//perform flattening
flattener.flattenJSON();
flattener.printOutput();
//generates file to output directory
flattener.generateJSONFile();
//run test to verify originial and flattened json is equivalent
const correct = utils_1.AssertEqual(flattener.jsonObject, flattener.output);
console.log(correct ? "test passed" : "test failed");

import * as fs from 'fs'
import { JSONFlattener } from "./JSONFlattener"
import { exit } from "process"
import { AssertEqual } from "./utils"

const args: string[] = process.argv
//input file validation
if (args.length < 3) {
    console.log("specify an input file")
    exit(0)
}

//attempt to read input file
let json: string
const inputPath: string = args[2]
try {
    json = fs.readFileSync(inputPath, 'utf-8')
} catch (err) {
    console.log("Invalid or non existing input file \n")
    exit(0)
}

//flattener class reads json and flattens it.
const flattener = new JSONFlattener(json, "./output", "")

//perform flattening
flattener.flattenJSON()
flattener.printOutput()
//generates file to output directory
flattener.generateJSONFile()

//run test to verify originial and flattened json is equivalent
const correct: boolean = AssertEqual(flattener.jsonObject, flattener.output)
console.log(correct ? "test passed" : "test failed")
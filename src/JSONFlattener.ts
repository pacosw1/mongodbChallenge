import { getChildren, hasChildren } from "./utils"
import * as fs from 'fs'

//takes care of parsing flattening and generating output json.
export class JSONFlattener {
    private outputPath: string
    public jsonObject: {}
    private error?: Error = undefined
    public output: {} = {}
    private inputFileName: string
    constructor(json: string, outputPath: string, inputFileName: string) {
        this.parseJSON(json)
        this.outputPath = outputPath
        this.inputFileName = inputFileName
    }
    //attemp to parse json
    private parseJSON(json: string) {
        try {
            this.jsonObject = JSON.parse(json)
        } catch (err) {
            this.error = {
                message: "JSON parsing failed, please check your file and try again"
            }
        }
    }
    //flattenJSON json object
    public flattenJSON() {
        if (this.error)
            return

        const rootKeys = Object.keys(this.jsonObject)
        //go through each root key like a n-tree depth first
        rootKeys.forEach(rootKey => {
            this.flattenKeyField(this.jsonObject, rootKey, rootKey)
        })
    }
    //recursive function to traverse nested keys
    private flattenKeyField(obj, key, path) {
        if (!hasChildren(obj, key))
            return this.output[path] = obj[key]

        const children = getChildren(obj, key)
        if (children.length === 0) return this.output[path] = obj[key]

        children.forEach(childKey => {
            this.flattenKeyField(obj[key], childKey, `${path}.${childKey}`)
        })
    }

    public printOutput() {
        if (this.error)
            return console.log(this.error.message + '\n')
        console.log(this.output)
    }
    //attempt to generate json file in selected directory
    public generateJSONFile() {
        try {
            fs.writeFileSync(`${this.outputPath}/flattened_${this.inputFileName}_${+new Date()}.json`, JSON.stringify(this.output))
        }
        catch (err) {
            console.log("Failed to save json file" + err)
        }
    }
}

interface Error {
    message: string
}
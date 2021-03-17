export declare class JSONFlattener {
    private outputPath;
    jsonObject: {};
    private error?;
    output: {};
    private inputFileName;
    constructor(json: string, outputPath: string, inputFileName: string);
    private parseJSON;
    flattenJSON(): void;
    private flattenKeyField;
    printOutput(): void;
    generateJSONFile(): void;
}

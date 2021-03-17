"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//checks if value in object is also an object
exports.hasChildren = (node, val) => {
    return typeof node[val] === 'object' && node[val] !== null && node[val] !== {};
};
//retrieves keys for given object 
exports.getChildren = (node, val) => {
    return Object.keys(node[val]);
};
//this test goes through generated keys using original json and verifies that they are equal
exports.AssertEqual = (original, created) => {
    const createdKeys = Object.keys(created);
    let nestedKeys, object = original, key;
    //loop through root keys
    for (key of createdKeys) {
        nestedKeys = key.split("."); //split nested keys in flattened json
        //if no nested objs check that it is equal
        if (nestedKeys.length === 1) {
            if (original[key] !== created[key])
                return false;
            console.log(`original[${key}] == created[${key}] == ${original[key]}`);
            continue;
        }
        //if get final value and compare them if it exists, else fail
        object = original;
        for (let nestedKey of nestedKeys) {
            if (!(nestedKey in object))
                return false;
            object = object[nestedKey];
        }
        if (object !== created[key])
            return false;
        console.log(`original[${key}] === flattened[${key}] === ${object}`);
    } //if not errors, it is correct
    return true;
};

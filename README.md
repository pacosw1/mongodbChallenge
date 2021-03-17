# mongodbChallenge

This project took about two hours to completed

#Time

* Identifying solution / type of problem - 10 minutes
* Getting a working solution             - 30 minutes
* Refactoring code, testing              - 50 minutes
* Adding command line arg                - 10 minutes
* Error handling and testing              - 20 minutes

Total                                   - 2 hours

Approach:

I really like enjoy graph and tree problems, so I was quick to identify that this problem could be solved recursively by modeling fields as graphs, or n-ary trees.

It was a little confusing handling the items as I was not used to using key value objects as "nodes" in a tree.

The solution basically consists of taking a json object, and going depth first through each of the root kets in the object. Each key is modeled as a tree with children.

Additionally it was required to keep track of the path that each "tree takes" in order to keep the flattened keys when the max depth of the field has been reached.

To test the solution, I created a function that will take the original json and the flattened version. By using the flattened keys "a.b.c" and iterating them on the original json, we can check if the flattening worked, and if the values are equal for the same fields.

How To Use

This project was made in typescript so it requires npm & node or yarn to run

It should be pretty straight forward to use by following these steps.

1. Clone the github repo to your local machine
2. run npm i or yarn to install the required dependencies
3. run npm run build to complile the typescript code
4. run npm run exec "filepath" to flatten the json in the specified file, it will be saved in the output folder.

QFormat
=======

A code formatter. Preserves existing formatting that does not conflict with reformatter.

## HTML

The html page can reformat code through a simple interface (copy and paste code).

## Code Structure

# Usage
formatter.js contains a simple wrapper to the underlying functionality, so that will likely be the only file you will need to 'require'. In html of course the scripts will all need to be included, and even in node.js it probably won't work right away...

# AST.js
Contains basic functions for any AST tree with source information. Wraps the given AST node, instead of integrating with it.

# ASTToText.js
Extends the AST tree to allow you to get recreate the source code. Does it in a recursive pattern though, accepting additional information such as changing indentation (which may not work) and overriding source information.

The text is generated recursively and each node is responsible for the characters between its start and end. This means that if say the root is from 0 to 100, it will first get the text from its children (lets say they occupy 10 to 20, and 20 to 30), then combine the text (so in this case it would output characters 0 to 10 from the source, plus both of its children plus characters 30 to 100).

Overriding source information is done by added the forceText="text here" to leaf nodes (MUST BE LEAF NODES, as in having no sub nodes). This means that instead of making the node output its information as the source code between its start and end, it will output that text.

By overriding source information you can have nodes which take up space (their start and end are not the same) but really return no text, so they 'delete' text. You can also have nodes which have no or little space but return a lot of rext, so they 'insert' text.

# ASTReformat.js
**This is what actually decided how to reformat the code.**

Extends the AST tree to allow you to call coalesceCode, which adds information and changes the parseTree to make it conform to certain styles.


# common.js, type.js, server.js, fail.js, etc
These are just helper functions, they can mostly be ignored and many are not used yet.
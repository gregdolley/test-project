let parser;
let nodeDocument = null; // only used if this index.js file is run straight from the command line via: node index.js (instead of being run in a browser)

if (isNodejs()) {
    const mockHTML = '<html><body><div data-exclude="0">My stuff</div></body></html>'; // only used if this index.js file is run straight from the command line via: node index.js (instead of being run in a browser)
    const { DOMParser } = require("@xmldom/xmldom"); // a node npm module for parsing HTML docs and manipulating the DOM
    parser = new DOMParser();
    nodeDocument = parser.parseFromString(mockHTML, "text/html");
} else {
    parser = new DOMParser(); // if we got here, we're running in a browser and can use its built-in DOMParser object
}

function isNodejs() {
    return typeof process !== "undefined" && process && process.versions && process.versions.node;
}

// This function taken from OP's question at:
// https://stackoverflow.com/questions/74805484/issue-with-recursive-function-converting-dom-element-to-json/
const htmlToJSON = (node) => {
    const exclude = node.attributes?.getNamedItem("data-exclude");
    if (!exclude) {
        let obj = {
            nodeType: node.nodeType,
        };
        if (node.tagName) {
            obj.tagName = node.tagName.toLowerCase();
        } else if (node.nodeName) {
            obj.nodeName = node.nodeName;
        }
        if (node.nodeValue) {
            obj.nodeValue = node.nodeValue;
        }
        let attrs = node.attributes;
        if (attrs) {
            length = attrs.length;
            const arr = (obj.attributes = new Array(length));
            for (let i = 0; i < length; i++) {
                const attr = attrs[i];
                arr[i] = [attr.nodeName, attr.nodeValue];
            }
        }

        let childNodes = node.childNodes;
        if (childNodes && childNodes.length) {
            let arr = (obj.childNodes = []);
            for (let i = 0; i < childNodes.length; i++) {
                // OP's original line of code:
                // arr[i] = htmlToJSON(childNodes[i]); <--- won't work because htmlToJSON() can return undefined in the original code (any arr element that is undefined will show as empty by console.log)
                let json = htmlToJSON(childNodes[i]); // I added this line (and the next) so I can check the return value of htmlToJSON() before potentially modifying the "arr" array
                json && arr.push(json); // the "json &&" start of this sequence will prevent arr.push(json) from executing if json is null or undefined
            }
        }
        return obj;
    }
    return null; // this return statement isn't actually needed, but I'd rather return null explicitly than return undefined implicitly.
};

// Not my function either, but I lost the page that I found it on, so I can't give credit to the original author.
function syntaxHighlight(json) {
    json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = "number";
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = "key";
            } else {
                cls = "string";
            }
        } else if (/true|false/.test(match)) {
            cls = "boolean";
        } else if (/null/.test(match)) {
            cls = "null";
        }

        return '<span class="' + cls + '">' + match + "</span>";
    });
}

function output(html) {
    let documentObj = isNodejs() ? nodeDocument : window.document;
    let newDiv = documentObj.createElement("div");
    let newElement = documentObj.createElement("pre");

    newElement.setAttribute("class", "code");
    newDiv.appendChild(newElement);
    newElement.innerHTML = html;

    documentObj.getElementsByTagName("body")[0].appendChild(newDiv);
    isNodejs() && console.log(html);

    return documentObj;
}

const showNonSyntaxHLVersion = false; // set this to true if you want to see the original non-colored code on top of the syntax highlighted code
const json = isNodejs() ? htmlToJSON(nodeDocument) : htmlToJSON(parser.parseFromString(document.body.innerHTML, "text/html").body);
const jsonString = JSON.stringify(json, null, 4); // "pretty print" the JSON string with a tab stop of 4 spaces

showNonSyntaxHLVersion && output(jsonString);
output(syntaxHighlight(jsonString));

const process = require('process');

function main() {
    console.log("Platform = ", process.platform);

    console.log("if(\"\") returns:", "" ? true : false);
    console.log("Double NOT (!!) on blank string returns:", !!"");
    console.log("Double NOT (!!) on empty object returns:", !!{});
    console.log("Double NOT (!!) on null returns:", !!null);
    console.log("Double NOT (!!) on undefined returns:", !!undefined);
}

main();
# What Is This?

This is some test code I wrote in order to verify an answer I posted on stack overflow. The OP's problem/question can be found [here](https://stackoverflow.com/questions/74805484/issue-with-recursive-function-converting-dom-element-to-json/).

## To Run In A Web Browser

To see the output of this code, just start a new CodePen or JSFiddle, and copy the HTML, CSS, and Javascript text from index.html, index.css, and index.js respectively (in same folder as this README.md), and paste them into the HTML, CSS, and Javascript input boxes on the CodePen or JSFiddle project editor page.

## To Run From The Command-Line Via Node

You will need Node v14.0.0 or greater to run from the command line. Earlier versions will give you syntax errors.

First install this project's dependencies via Yarn. From the root folder of this project, run the command:

```bash
    yarn install
```

Now go back into this README's directory and run Node on the index.js file:

```bash
    cd ./SO_answer_1_example_code/
    node index.js
```

The output will look something like this:

```bash
    {
    <span class="key">"nodeType":</span> <span class="number">9</span>,
    <span class="key">"nodeName":</span> <span class="string">"#document"</span>,
    <span class="key">"childNodes":</span> [
        {
            <span class="key">"nodeType":</span> <span class="number">1</span>,
            <span class="key">"tagName":</span> <span class="string">"html"</span>,
            <span class="key">"attributes":</span> [],
            <span class="key">"childNodes":</span> [
                {
                    <span class="key">"nodeType":</span> <span class="number">1</span>,
                    <span class="key">"tagName":</span> <span class="string">"body"</span>,
                    <span class="key">"attributes":</span> [],
                    <span class="key">"childNodes":</span> []
                }
            ]
        }
    ]
}
```

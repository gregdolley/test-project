class Node {
  constructor(data) {
    this.data = data;
    this.depth = this.height = 0;
    this.parent = null;
  }

  each(callback, that) {
    let index = -1;

    for (const node of this) {
      callback.call(that, node, ++index, this);
    }

    return this;
  }

  eachBefore(callback, that) {
    let node = this;
    let nodes = [node];
    let children;
    let index = -1;

    while ((node = nodes.pop())) {
      callback.call(that, node, ++index, this);

      if ((children = node.children)) {
        for (let i = children.length - 1; i >= 0; --i) {
          nodes.push(children[i]);
        }
      }
    }

    return this;
  }

  descendants() {
    return Array.from(this);
  }
}

function* iterator() {
  let node = this;
  let current;
  let next = [node];
  let children;

  do {
    (current = next), (next = []);
    while ((node = current.pop())) {
      yield node;
      if ((children = node.children)) {
        for (let i = 0; i < children.length; ++i) {
          next.unshift(children[i]);
        }
      }
    }
  } while (next.length);
}

function hierarchy(data, children) {
  if (children === undefined) {
    children = objectChildren;
  }

  let root = new Node(data);
  let node;
  let nodes = [root];
  let child;
  let childs;
  let n;

  while ((node = nodes.pop())) {
    if (
      (childs = children(node.data)) &&
      (n = (childs = Array.from(childs)).length)
    ) {
      node.children = childs;
      for (let i = n - 1; i >= 0; --i) {
        nodes.push((child = childs[i] = new Node(childs[i])));
        child.parent = node;
        child.depth = node.depth + 1;
      }
    }
  }

  return root.eachBefore(computeHeight);
}

function objectChildren(d) {
  return d.children;
}

function computeHeight(node) {
  let height = 0;
  do node.height = height;
  while ((node = node.parent) && node.height < ++height);
}

// hierarchy.prototype = {
//   constructor: Node.constructor,
//   [Symbol.iterator]: iterator,
// }

Node.prototype = hierarchy.prototype ={
  [Symbol.iterator]: iterator,
};

function main() {
  let data = {
    name: "root",
    children: [
      { name: "A", children: [{ name: "C" }, { name: "D" }, { name: "E" }] },
      { name: "B", children: [{ name: "F" }, { name: "G" }, { name: "H" }] },
      { name: "I", children: [{ name: "J" }, { name: "K" }, { name: "L" }] }
    ],
  };
  let root = hierarchy(data);

  let desc = root.descendants();
  console.log("desc =", desc);
  
  root
    .descendants()
    .forEach((node, i) =>
      console.log(`Node.name = ${node.data.name}, Node iterator index = ${i}`)
    );
}

main();

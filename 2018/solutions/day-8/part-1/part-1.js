const shortId = require('shortid');

class Node {
  constructor(header, metadata = [], children = [], id = null, parent = null) {
    if (header) {
      this.id = id || shortId.generate();
      this.header = header;
      this.metadata = metadata;
      this.children = children;
      this.numberOfChildren = header[0];
      this.numberOfMetadata = header[1];
      this.parent = parent;
    }
  }
}

// TODO: recurse through license stringa and pull out headers; use header to recursively
//        find children and meta data; build tree of nodes and children; reduce tree to
//        summed metadata of all tree members

function solvePuzzle(data) {
  const headerLength = 2;

  let license = data[0].replace(/\s/gm, '');

  const sumMetaData = () => {
    Array.from(nodes).reduce((totalMetaData, node) => {
      return totalMetaData + node.metadata.reduce((thisNodesMetaData, meta) => thisNodesMetaData + meta, 0);
    }, 0);
  };

  let currentNode;

  const generateTree = (licenseData, nodes) => {
    const header = licenseData.substr(0, headerLength).split('');

    licenseData = licenseData.substr(headerLength);

    const numberOfChildren = parseInt(header[0], 10);
    const metadataLength = parseInt(header[1], 10);

    let node;

    if (!currentNode) {
      node = new Node([ numberOfChildren, metadataLength ]);
    } else {
      node = new Node([ numberOfChildren, metadataLength ], [], [], null, currentNode.id);
    }

    console.log(node);

    currentNode = node;
    nodes[node.id] = node;

    if (children === 0 && metadataLength > 0) {
      const metadata = licenseData.substr(0, metadataLength).split('');

      licenseData = licenseData.substr(metadataLength);

      currentNode.metadata = metadata.map(data => parseInt(data, 10));

      currentNode.children.push(node);
    }

    return nodes;
  }

  return generateTree(license, {});
}

module.exports = solvePuzzle;

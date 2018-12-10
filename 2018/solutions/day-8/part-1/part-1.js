const shortId = require('shortid');

class Node {
  constructor(header, metadata = [], children = [], id = null, parent = null) {
    if (header) {
      this.id = id || shortId.generate();
      this.header = header;
      this.metadata = metadata;
      this.children = children;
      this.parent = parent;
    }
  }
}

// TODO: recurse through license stringa and pull out headers; use header to recursively
//        find children and meta data; build tree of nodes and children; reduce tree to
//        summed metadata of all tree members

function solvePuzzle(data) {
  const headerLength = 2;

  let license = data[0].split(' ');

  const sumMetadata = (tree) => {
    const rootMetadataValue = tree.metadata.reduce((rootMetadata, datum) => rootMetadata + datum, 0);

    const childrenMetadataValue = tree.children.reduce((childMetadata, datum) => childMetadata + sumMetadata(datum), 0);

    const totalMetadataValue = rootMetadataValue + childrenMetadataValue;

    return totalMetadataValue;
  };

  const generateTree = (licenseData, parent) => {
    const header = [];

    let metadata = [];
    let children = [];
    let id = shortId.generate();

    let node;

    for (let headerIndex = 0; headerIndex < headerLength; headerIndex++) {
      header.push(parseInt(licenseData.shift(), 10));
    }

    const [ numberOfChildren, metadataLength ] = header;

    // has children, recurse!
    if (numberOfChildren > 0) {
      for(let childIndex = 0; childIndex < numberOfChildren; childIndex++) {
        const child = generateTree(licenseData, id);

        children.push(child);
      }
    }

    if (metadataLength > 0) {
      for (let metadataIndex = 0; metadataIndex < metadataLength; metadataIndex++) {
        metadata.push(parseInt(licenseData.shift(), 10));
      }
    }

    return new Node(header, metadata, children, id, parent);
  }

  const tree = generateTree(license);

  return sumMetadata(tree);
}

module.exports = solvePuzzle;

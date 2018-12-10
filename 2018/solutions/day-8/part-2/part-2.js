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

function solvePuzzle(data) {
  const headerLength = 2;

  let license = data[0].split(' ');

  const sumMetadata = (tree, exists = false) => {
    let metadataTotal = 0;

    if (tree.metadata) {
      metadataTotal = tree.metadata.reduce((childMetadata, datum) => {
        if (tree.children.length) {
          const child = tree.children[datum - 1];

          if (child) {
            childMetadata = childMetadata + sumMetadata(child, true)
          }
        } else {
          if (exists) {
            childMetadata = tree.metadata.reduce((thisMetadataTotal, datum) => thisMetadataTotal + datum, 0);
          }
        }

        return childMetadata;
      }, 0);
    }

    return metadataTotal;
  };

  const generateTree = (licenseData, parent) => {
    const header = [];

    let metadata = [];
    let children = [];
    let id = shortId.generate();

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

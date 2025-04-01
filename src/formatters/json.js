const json = (diff) => {
  const formatNode = (node) => {
    switch (node.type) {
      case 'nested':
        return node.children.reduce((acc, child) => ({
          ...acc,
          [child.key]: formatNode(child)
        }), {});
      case 'changed':
        return {
          type: 'updated',
          oldValue: node.oldValue,
          newValue: node.newValue
        };
      case 'added':
      case 'removed':
        return {
          type: node.type,
          value: node.value
        };
      case 'unchanged':
        return node.value;
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  };

  const result = diff.reduce((acc, node) => ({
    ...acc,
    [node.key]: formatNode(node)
  }), {});

  return JSON.stringify(result, null, 2);
};

export default json;
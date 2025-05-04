const plain = (diff, path = '') => {
  const formatValue = (value) => {
    if (value === null) return 'null';
    if (typeof value === 'object') return '[complex value]';
    return typeof value === 'string' ? `'${value}'` : String(value);
  };

  const lines = diff
    .map((item) => {
      const { key, type } = item;
      const property = path ? `${path}.${key}` : key;

      switch (type) {
        case 'added':
          return `Property '${property}' was added with value: ${formatValue(item.value)}`;
        case 'removed':
          return `Property '${property}' was removed`;
        case 'changed':
          return `Property '${property}' was updated. From ${formatValue(item.oldValue)} to ${formatValue(item.newValue)}`;
        case 'nested':
          return plain(item.children, property);
        case 'unchanged':
          return null;
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    })
    .filter(Boolean);

  return lines.join('\n');
};

export default plain;

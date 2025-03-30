const buildDiff = (data1, data2) => {
  const keys = new Set([...Object.keys(data1), ...Object.keys(data2)]);
  const sortedKeys = Array.from(keys).sort();

  return sortedKeys.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (!Object.hasOwn(data2, key)) {
      return { key, type: 'removed', value: data1[key] };
    }

    const value1 = data1[key];
    const value2 = data2[key];

    if (typeof value1 === 'object' && typeof value2 === 'object' && value1 !== null && value2 !== null) {
      return {
        key,
        type: 'nested',
        children: buildDiff(value1, value2),
      };
    }

    if (value1 !== value2) {
      return {
        key,
        type: 'changed',
        oldValue: value1,
        newValue: value2,
      };
    }

    return { key, type: 'unchanged', value: value1 };
  });
};

export default buildDiff;
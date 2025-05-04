const stylish = (diff) => {
  const formatValue = (value, depth) => {
    if (typeof value !== 'object' || value === null) {
      return value === undefined ? '' : String(value)
    }

    const indent = ' '.repeat(4 * depth)
    const bracketIndent = ' '.repeat(4 * (depth - 1))
    const entries = Object.entries(value)
    const formatted = entries.map(
      ([k, v]) => `${indent}${k}: ${formatValue(v, depth + 1)}`,
    )

    return ['{', ...formatted, `${bracketIndent}}`].join('\n')
  }

  const iter = (node, depth = 1) => {
    const indent = ' '.repeat(4 * depth - 2)
    const bracketIndent = ' '.repeat(4 * (depth - 1))

    const lines = node.map((item) => {
      const { key, type } = item

      switch (type) {
        case 'added':
          return `${indent}+ ${key}: ${formatValue(item.value, depth + 1)}`
        case 'removed':
          return `${indent}- ${key}: ${formatValue(item.value, depth + 1)}`
        case 'unchanged':
          return `${indent}  ${key}: ${formatValue(item.value, depth + 1)}`
        case 'changed': {
          const oldVal = `${indent}- ${key}: ${formatValue(item.oldValue, depth + 1)}`
          const newVal = `${indent}+ ${key}: ${formatValue(item.newValue, depth + 1)}`
          return `${oldVal}\n${newVal}`
        }
        case 'nested':
          return `${indent}  ${key}: ${iter(item.children, depth + 1)}`
        default:
          throw new Error(`Unknown type: ${type}`)
      }
    })

    return ['{', ...lines, `${bracketIndent}}`].join('\n')
  }

  return iter(diff)
}

export default stylish

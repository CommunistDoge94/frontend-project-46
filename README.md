### Hexlet tests and linter status:
# 📂 gendiff

[![Actions Status](https://github.com/CommunistDoge94/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/CommunistDoge94/frontend-project-46/actions)

[![CI](https://github.com/CommunistDoge94/frontend-project-46/actions/workflows/ci.yml/badge.svg)](https://github.com/CommunistDoge94/frontend-project-46/actions/workflows/ci.yml)

---

**gendiff** - утилита для сравнения двух конфигурационных файлов (JSON,YAML) с поддержкой вложенности.

---

## Установка

```bash
git clone https://github.com/CommunistDoge94/frontend-project-46
cd gendiff
npm ci
```

---

## Минимальные рекомендуемые системные требования

- npm - 11.2.0 
- node - 23.5.0

---

## Пользование

```bash
gendiff *путь 1-го файла* *путь 2-го файла*
```
Утилита поддерживает вывод в следующих форматах, которые выбираются флагом **--format**:

- stylish (по умолчанию)

```bash
gendiff file1.json file2.json

# Пример вывода

{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow:
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}
```
- json

```bash
gendiff file1.json file2.json --format json

# Пример вывода

{
  "common": {
    "follow": {
      "type": "added",
      "value": false
    },
    "setting1": "Value 1",
    "setting2": {
      "type": "removed",
      "value": 200
    },
    "setting3": {
      "type": "updated",
      "oldValue": true,
      "newValue": null
    },
    "setting4": {
      "type": "added",
      "value": "blah blah"
    },
    "setting5": {
      "type": "added",
      "value": {
        "key5": "value5"
      }
    },
    "setting6": {
      "doge": {
        "wow": {
          "type": "updated",
          "oldValue": "",
          "newValue": "so much"
        }
      },
      "key": "value",
      "ops": {
        "type": "added",
        "value": "vops"
      }
    }
  },
  "group1": {
    "baz": {
      "type": "updated",
      "oldValue": "bas",
      "newValue": "bars"
    },
    "foo": "bar",
    "nest": {
      "type": "updated",
      "oldValue": {
        "key": "value"
      },
      "newValue": "str"
    }
  },
  "group2": {
    "type": "removed",
    "value": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  },
  "group3": {
    "type": "added",
    "value": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    }
  }
}
```

- plain

```bash
gendiff file1.json file2.json --format plain

# Пример вывода

Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```

[![asciicast](https://asciinema.org/a/PqckfWqDaJNSgftbWTQM8Bj9z.svg)](https://asciinema.org/a/PqckfWqDaJNSgftbWTQM8Bj9z)
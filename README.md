# list-imports-exports

[![npm version](https://badge.fury.io/js/list-imports-exports.svg)](https://badge.fury.io/js/list-imports-exports)

Just lists some simple stats about es6 module imports and
exports. Powered by babylon and babel-traverse.

Also specifically lists "passthroughs", such as `export a from './a'`.


## Usage example

```
> require('list-imports-exports').parse('export a from "./a";');
{
  imports: ['./a'],
  exports: ['a'],
  passthroughs: [['a', './a']]
}
```

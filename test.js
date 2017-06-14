const parse = require('./').parse;

console.log(
  parse(
    'import "babel-polyfill";' +
    'import a from "./a";' +
    'const c = 1; export default c; export {c};' +
    'export b from "./b";'
  )
);

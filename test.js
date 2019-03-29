const { parse } = require("./");
const { deepEqual } = require("assert");

deepEqual(
  parse(
    'import "babel-polyfill";' +
      'import a from "./a";' +
      'const c = 1; export default c; export {c};' +
      'export b from "./b";' +
      'export e from "./e";' +
      'export {f} from "./e";' +
      'export i, {g, h} from "./e";'
  ),
  {
    imports: ["babel-polyfill", "./a", "./b", "./e", "./e", "./e"],
    exports: ["default", "c", "b", "e", "f", "i", "g", "h"],
    passthroughs: [
      ["b", "./b", "default"],
      ["e", "./e", "default"],
      ["f", "./e", "f"],
      ["i", "./e", "default"],
      ["g", "./e", "g"],
      ["h", "./e", "h"]
    ]
  }
);

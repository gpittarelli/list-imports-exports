const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const t = require('babel-types');

function parse(code) {
  // accept either pre-parsed ast or string of code
  if (typeof code === 'string') {
    code = babylon.parse(code, {
      sourceType: 'module',
      plugins: [
        'exportExtensions'
      ]
    });
  }

  var output = {
    imports: [],
    exports: [],
    passthroughs: []
  };

  traverse(code, {
    enter: function(path) {
      var node = path.node;

      if (path.isExportNamedDeclaration()) {
        if (node.source) {
          var from = node.source.value;
          output.imports.push(from);

          node.specifiers.forEach(function (spec) {
            var orig = spec.local ? spec.local.name : 'default',
              exp = spec.exported.name;
            output.exports.push(exp);
            output.passthroughs.push([exp, from, orig]);
          });
        } else {
          output.exports = output.exports.concat(
            node.specifiers.map(function (spec) {
              return spec.exported.name;
            })
          );
        }
      } else if (path.isImportDeclaration()) {
        var from = node.source.value;
        output.imports.push(from);
      } else if (path.isExportDefaultDeclaration()) {
        output.exports.push('default');
      }
    }
  });

  return output;
}

module.exports = {
  parse: parse
};


var parser = require('./tmp/unedtfy.js');

module.exports = {
  parse: function(string, options) {
    result = parser.parse(string);
    return result;
  }
};

const Parser = require('../../lib/parser')

describe('Parser', function() {
  describe('parse', function() {
    it('returns the correct AST', function() {
      const parser = new Parser('2 + (2 - 2) + 2')
      const ast = parser.parse()
      expect(ast).to.exist;
    });
  });
});
const Lexer = require('../../lib/lexer');

describe('Lexer', function() {
  describe('lex', function() {
    it('returns the correct tokens', function() {
      const tokens = new Lexer('2 +2').lex()
      expect(tokens[0].type).to.equal('digit')
      expect(tokens[0].value).to.equal('2')
      expect(tokens[1].type).to.equal('ws')
      expect(tokens[2].type).to.equal('add')
      expect(tokens[3].type).to.equal('digit')
      expect(tokens[4].type).to.equal('eos')
    })

    it('supports parens', function() {
      const tokens = new Lexer('(2+2)').lex();

      ['pstart', 'digit', 'add', 'digit','pend', 'eos'].forEach(
        (v, k) => expect(tokens[k].type).to.equal(v)
      )
    })
  });
});
'use strict';
const Lexer = require('./lexer')

class Parser {
  constructor(input) {
    this.lexer = new Lexer(input)
  }

  parse() {
    let tok
    while ((tok = this.lexer.next()).type !== 'eos') {
      switch (tok.type) {
      // Whitespace is not relevant.
      case 'ws': break
      case 'digit':

      }
    }
  }
}

module.exports = Parser
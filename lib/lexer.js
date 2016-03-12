'use strict';

const EMPTY = '';

class Lexer {
  constructor(input) {
    this.source = input
    this.pos = 0
  }

  digit() {
    return this.scan(/^([0-9.]+)/, 'digit');
  }

  operatorAdd() {
    return this.scan(/^(\+)/, 'add')
  }

  operatorSubtract() {
    return this.scan(/^(\-)/, 'sub')
  }

  parenStart() {
    return this.scan(/^(\()/, 'pstart')
  }

  parenEnd() {
    return this.scan(/^(\))/, 'pend')
  }

  whitespace() {
    return this.scan(/^(\s)/, 'ws');
  }

  eos() {
    return this.source === EMPTY ? this.tok('eos') : undefined;
  }

  scan(regexp, type) {
    const matches = regexp.exec(this.source)
    if (matches) {
      const tok = this.tok(type, matches[1])
      this.consume(matches[0].length)
      return tok
    }
  }

  tok(type, value) {
    return {
      type,
      value,
      pos: this.pos
    }
  }

  next() {
    return this.whitespace()
      || this.digit()
      || this.operatorAdd()
      || this.operatorSubtract()
      || this.parenStart()
      || this.parenEnd()
      || this.eos()
      || this.fail()
  }

  fail() {
    const found = /(.*?)\s/.exec(this.source)[1];
    throw new Error(`Unexpected input at position ${this.pos}: "${found}"`)
  }

  consume(n) {
    this.source = this.source.substr(n)
    this.pos += n;
  }

  lex() {
    let next;
    const tokens = []
    while ((next = this.next()).type !== 'eos') {
      tokens.push(next)
    }

    // Add the last eos token that broke the loop above.
    tokens.push(next);

    return tokens
  }
}

module.exports = Lexer;
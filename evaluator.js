'use strict';

const Lexer = require('./lexer')

function number(value) {
  const num = Number(value)
  if (Number.isNaN(num)) {
    throw new Error(`Apparently, "${value}" is not a number.. I dunno mang..`)
  }

  return num
}

class Evaluator {
  constructor(input) {
    this.lexer = new Lexer(input)
    this.value = undefined
  }

  evaluate() {
    let token, digitValue
    while ((token = this.lexer.next()).type !== 'eos') {
      switch (token.type) {
      case 'ws': break
      case 'digit':
        if (this.value === undefined) {
          this.value = number(token.value)
        } else {
          throw new Error('Digit was unexpected.')
        }

        break
      case 'add':
        token = this.expect('digit');
        digitValue = number(token.value)
        this.value += digitValue
        break
      case 'sub':
        token = this.expect('digit');
        digitValue = number(token.value)
        this.value -= digitValue
        break
      case 'eos': break
      default:
        throw new Error(`Unknown token type ${token.type}`)
      }
    }

    return this.value
  }

  expect() {
    const validTokenTypes = Array.from(arguments);
    let next
    while ((next = this.lexer.next()).type === 'ws') {
    }

    if (validTokenTypes.indexOf(next.type) === -1) {
      throw new Error(`Expected "${validTokenTypes}", but got "${next.type}"`)
    }

    return next
  }
}

module.exports = Evaluator;
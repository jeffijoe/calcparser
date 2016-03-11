'use strict';
const calculate = require('./calculate');
const Lexer = require('./lexer');

const input = process.argv.slice(2).join(' ');

console.log('Tokens')
console.log(new Lexer(input).lex())

console.log(calculate(input))
'use strict';

const Evaluator = require('./evaluator')

module.exports = function calculate(input) {
  return new Evaluator(input).evaluate()
}
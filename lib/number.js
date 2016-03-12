module.exports = function number(value) {
  const num = Number(value)
  if (Number.isNaN(num)) {
    throw new Error(`Apparently, "${value}" is not a number.. I dunno mang..`)
  }

  return num
}
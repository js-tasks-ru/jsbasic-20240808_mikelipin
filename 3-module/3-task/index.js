function camelize(str) {
  return str
    .split('-')
    .map((word, index) => index ? word.charAt(0).toUpperCase() + word.slice(1) : word)
    .join('');
}

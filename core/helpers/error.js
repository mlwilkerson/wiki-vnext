module.exports = (err, name, code) => {
  if (name) {
    err.name = name
  }
  if (code) {
    err.code = code
  }
  return err
}

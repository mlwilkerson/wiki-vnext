const _ = require('lodash')
const getFieldNames = require('graphql-list-fields')

module.exports = {
  parseFields (info, flags = [], exclude = ['__typename']) {
    const cols = _.difference(getFieldNames(info), exclude)
    return {
      fields: flags.length > 0 ? _.difference(cols, flags) : cols,
      flags: flags.reduce((accumulator, currentValue) => {
        accumulator[currentValue] = cols.includes(currentValue)
        return accumulator
      }, {})
    }
  },
  generateSuccess (msg) {
    return {
      succeeded: true,
      errorCode: 0,
      slug: 'ok',
      message: _.defaultTo(msg, 'Operation succeeded.')
    }
  },
  generateError (err, complete = true) {
    const error = {
      succeeded: false,
      slug: err.name,
      message: err.message || 'An unexpected error occured.'
    }
    return (complete) ? { status: error } : error
  }
}

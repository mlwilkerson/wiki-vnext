
module.exports = {
  plugins: [
    ['@babel/plugin-proposal-optional-chaining', { loose: true }],
    ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: true }],
    ['babel-plugin-graphql-tag', { strip: false }]
  ],
  presets: [
    '@quasar/babel-preset-app'
  ]
}

const ruleForStyle = {
  test: /\.scss$/,
  use: [{
    loader: 'style-loader'
  }, {
    loader: 'css-loader'
  }, {
    loader: 'sass-loader'
  }]
}

const ruleForImages = {
  test: /\.(png|jpg)$/,
  use: [{
    loader: 'file-loader'
  }]
}

const rulesForJavascript = {
  test: /\.m?js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        [
          '@babel/preset-react',
          {
            runtime: 'automatic' // clasic
          }
        ],
        '@babel/preset-env'
      ],
      plugins: ['@babel/plugin-transform-runtime']
    }
  }
}

const rules = [rulesForJavascript, ruleForStyle, ruleForImages]

module.exports = {
  module: { rules }
}

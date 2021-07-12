module.exports = {
    rules: [
        // {
        //     test: /\.css/i,
        //     use: ['style-loader', 'css-loader']
        // },
        // CSS, PostCSS, and Sass
        {
          test: /\.(scss|css)$/,
          use: ['style-loader', {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            }, 'postcss-loader'],
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.(csv|tsv)$/i,
            use: ['csv-loader'],
        },
        {
            test: /\.xml$/i,
            use: ['xml-loader'],
        },
        {
            test: /\.(ts|tsx)$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              }
            }
        }
    ]
}
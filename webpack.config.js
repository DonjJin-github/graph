const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build")
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "build")
    },
    port: 9000
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.json$/,
        type: "javascript/auto",
        loader: "file-loader",
        options: {
          name: "model/[name].[ext]"
        },
        include: [
          path.resolve(__dirname, "./model")
        ]
      },
      {
        test: /\.ico$/,
        type: "asset/resource", // 수정된 부분
        generator: {
          filename: "[name][ext]"
        }
      }
      
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new CleanWebpackPlugin()
  ]
};

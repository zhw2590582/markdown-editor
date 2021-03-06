const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const autoprefixer = require("autoprefixer");
const pkg = require("./package.json");
const isProd = process.env.NODE_ENV === "production";

const webpackConfig = {
  mode: isProd ? "production" : "development",
  entry: "./src/index.js",
  optimization: {
    splitChunks: {
      chunks: "all",
      name: "vendor"
    }
  },
  output: {
    path: __dirname + "/",
    filename: "static/js/[name]-[hash].js",
    publicPath: isProd ? `https://cdn.zhw-island.com/${pkg.name}/` : '/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["env"],
        }
      }
    }, {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader, {
          loader: "css-loader",
          options: {
            minimize: true
          }
        },
        {
          loader: "postcss-loader",
          options: {
            autoprefixer: {
              browsers: ["last 2 versions"]
            },
            plugins: () => [autoprefixer]
          }
        }
      ]
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: "file-loader",
        options: {
          name: isProd ? "static/img/[name]-[hash].[ext]" : "static/img/[name].[ext]"
        }
      }]
    }, ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProd ? "static/css/[name]-[hash].css" : "static/css/[name].css"
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html"
    })
  ]
}

if (isProd) {
  webpackConfig.plugins.push(
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      }
    }),
    new OptimizeCssAssetsPlugin({
      // 
    }),
    new FileManagerPlugin({
      onStart: {
        delete: ["./static", "./index.html"]
      }
    })
  );
}

module.exports = webpackConfig;

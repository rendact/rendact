var path = require("path"),
  paths = require("./paths"),
  fs = require("fs"),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  webpack = require("webpack");

let themePublicPath = "https://shopkeeper-lionel-47443.netlify.com";

let config = {
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "react"
    },
    "react-router": {
      commonjs: "react-router",
      commonjs2: "react-router",
      amd: "react-router",
      root: "react-router"
    },
    "font-awesome": {
      commonjs: "font-awesome",
      commonjs2: "font-awesome",
      amd: "react-router"
    }
  },
  resolve: {
    modules: ["node_modules", paths.appNodeModules, paths.appSrc],
    alias: {
      "react-router": "react-router-dom",
      images: paths.appSrc + "/images"
    }
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("style.css")
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["react-app"]
        }
      },

      {
        test: /\.(svg|png|jpeg|gif|jpg)/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]"
        }
      },
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders: 1
              }
            }
          ]
        })
      },
      {
        test: /\.(eot|ttf|woff2?)(\?.*$|$)/,

        loader: "file-loader",
        options: {
          name: "[name].[ext]"
        }
      }
    ],
    loaders: []
  }
};

var entries = src => {
  let dirs = fs
    .readdirSync(src)
    .map(name => path.join(src, name))
    .filter(path => fs.lstatSync(path).isDirectory());

  return dirs.map(dir => {
    let splittedDir = dir.split("/");
    let name = splittedDir[splittedDir.length - 1];

    return Object.assign({}, config, {
      name: name,
      entry: path.resolve(__dirname, path.join(dir, "index.js")),
      output: {
        path: path.join(__dirname, "build", name),
        filename: name + ".js",
        publicPath: publicPath + "/" + name + "/",
        libraryTarget: "umd",
        library: name
      }
    });
  });
};

module.exports = { config: config, themePublicPath: themePublicPath };
// module.exports = entries("themes");

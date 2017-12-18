"use strict";

process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

// ensure environment variables are read.
require("../config/env");

const path = require("path"),
  webpack = require("webpack"),
  config = require("../config/webpack.config.themeBuild"),
  paths = require("../config/paths"),
  colors = require("colors/safe"),
  prompt = require("prompt");

prompt.message = colors.red("Build");
prompt.delimiter = colors.green("::");
prompt.start();

prompt.get(
  {
    properties: {
      entry: {
        name: "entry",
        description: colors.red("Enter entry point"),
        required: true,
        before: function(value) {
          return value.replace(/['" ]/, "");
        }
      },

      name: {
        name: "name",
        description: colors.red("Enter theme name"),
        required: true
      }
    }
  },
  (err, result) => {
    const themeBuildFolder = paths.themeBuildFolder;
    const themePublicPath = config.themePublicPath;
    const newConfig = Object.assign({}, config.config, {
      name: result.name,
      entry: result.entry.replace(/['" ]/, ""),
      output: {
        path: themeBuildFolder + "/" + result.name,
        filename: result.name + ".js",
        publicPath: themePublicPath + "/" + result.name + "/",
        libraryTarget: "umd",
        library: result.name
      }
    });

    webpack(newConfig, (err, stats) => {
      if (err) return console.log(err);
      var jsonStats = stats.toJson();
      if (jsonStats.errors.length > 0) return console.log(jsonStats.errors);
      if (jsonStats.warnings.length > 0) console.log(jsonStats.warnings);
      console.log("building success");
    });
  }
);

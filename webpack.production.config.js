const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const fs = require("fs");
const directoryPath = path.resolve("public");
const handleDir = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        reject("Unable to scan directory: " + err);
      }
      resolve(files);
    });
  });
};
module.exports = async (env, agrv) => {
  const isAnalyze = env && env.analyze;
  const dirs = await handleDir();
  const copyPluginPatterns = dirs
    .filter((dir) => dir !== "index.html")
    .map((dir) => {
      return {
        from: dir,
        to: "",
        context: path.resolve("public"),
      };
    });
  const basePlugins = [
    new Dotenv({
      path: "./.env.production",
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new CopyPlugin({
      patterns: copyPluginPatterns,
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:6].css",
    }),
    new webpack.ProgressPlugin(),
  ];
  let prodPlugins = [
    ...basePlugins,
    new CleanWebpackPlugin(),
    new CompressionPlugin({
      test: /\.(css|js|html|svg)$/,
    }),
  ];
  if (isAnalyze) {
    prodPlugins = [...prodPlugins, new BundleAnalyzerPlugin()];
  }
  return {
    entry: "./src/index.tsx",
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          use: ["ts-loader", "eslint-loader"],
          exclude: /node_modules/,
        },
        {
          test: /\.(s[ac]ss|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: { sourceMap: false },
            },
            {
              loader: "sass-loader",
              options: { sourceMap: false },
            },
          ],
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "static/fonts/[name].[ext]",
              },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "static/media/[name].[contenthash:6].[ext]",
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
      alias: {
        "@": path.resolve("src"),
        "@@": path.resolve(),
      },
    },
    output: {
      path: path.resolve("build"),
      publicPath: "/",
      filename: "static/js/main.[contenthash:6].js",
      environment: {
        arrowFunction: false,
        bigIntLiteral: false,
        const: false,
        destructuring: false,
        dynamicImport: false,
        forOf: false,
        module: false,
      },
    },
    devtool: false,
    devServer: {
      port: 8001,
      hot: "only",
      historyApiFallback: true,
      open: false,
    },
    plugins: prodPlugins,
    performance: {
      maxEntrypointSize: 800000, //  Khi có 1 file build vượt quá giới hạn này (tính bằng byte) thì sẽ bị warning trên terminal.
    },
  };
};

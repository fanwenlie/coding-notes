const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const merge = require("webpack-merge");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const baseConfig = require("./webpack.base.config");

// wepback merge 并不只是简单的合并，比如module中的rules是个数组，数组中的每一项也会合并，而一般的合并会替换掉，像Object.assign
module.exports = merge(baseConfig, {
	mode: "production",
	output: {
		path: path.resolve(__dirname, "../dist"),
		// 设置splitChunks之后，需要把bundle改成[name]
		filename: path.join('static', 'js/[name].[chunkhash].js'),
		// 决定非入口 chunk 的名称
		chunkFilename: path.join('static', 'js/[name].[chunkhash].js'),
		publicPath: "static"
	},
	devtool: "source-map",
	optimization: {
		// 默认提供了压缩代码功能，当然也可以使用第三方插件来压缩代码.
		// 空数组则不压缩代码
		// minimizer: [],
		minimizer: [
			new UglifyJsPlugin({
				// 使用 uglifyjs-webpack-plugin 时，你必须提供 sourceMap：true 选项来启用 source map 支持。
				sourceMap: true,
				parallel: true
			}),
			new OptimizeCSSAssetsPlugin()
		],
		// 提取webpack require模块化代码，也就是经常看见的manifest.js
		runtimeChunk: {
			name: "manifest"
		},
		splitChunks: {
			chunks: "all", // all|async|initial,  将node_modules中使用的内容都提取出来
			minSize: 30000, // 提取代码最小尺寸为30kb，小于30kb则不提取, 其实并不合理
			minChunks: 1,
			maxAsyncRequests: 5, // 拆分异步bundle最多5个
			maxInitialRequests: 3, // 分割输出文件最多为 3 个
			name: true,
			automaticNameDelimiter: "~",
			cacheGroups: {
				commons: {
					name: "common",
					chunks: "all",
					minChunks: 2,
					minSize: 0, // 只要超出 0 字节就生成一个新包
					priority: 1
				},
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: 2, // 缓存组优先级, 防止和自定义的公共代码提取时被覆盖，不进行打包
					name: "vendor",
					chunks: "all" // 意味着不管是初始chunk，还是async chunk，都能共享vendor
				}
			}
		}
	},
	module: {
		rules: [
			{
        test: /\.css$/,
        exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// you can specify a publicPath here
							// by default it use publicPath in webpackOptions.output
							// publicPath: '../'
						}
					},
					{
						loader: "css-loader",
						options: {
							// sourceMap: true
						}
					}
				]
			}
		]
	},
	plugins: [
		// 每个chunk头部添加说明
		new webpack.BannerPlugin("hey, fwl"),
		// 生成html，并注入js
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html",
			minify: {
				// 删除注释
				removeComments: true,
				// 去除空格
				collapseWhitespace: true,
				// 去除属性引号
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
			//根据依赖引入chunk
      chunksSortMode: 'dependency'
		}),
		// 抽离插入到head style中的样式，打包到一个css文件中
		new MiniCssExtractPlugin({
			filename: path.join('static', "css/[name].[chunkhash].css"),
			chunkFilename: path.join('static', "css/[name].[chunkhash].css")
		}),
		// 因为webpack默认模块名是数字，可以通过该插件来固定模块名
		new webpack.HashedModuleIdsPlugin()
	]
});

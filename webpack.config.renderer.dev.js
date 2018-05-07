"use strict";

import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import baseConfig from './webpack.config.base';


const port = 3000;
const publicPath = `http://localhost:${port}/dist/renderer/`;

export default merge(baseConfig, {

	target: 'electron-renderer',

	mode: 'development',

	// see https://webpack.js.org/configuration/devtool/#devtool
	devtool: 'cheap-source-map',

	entry: [
		`webpack-dev-server/client?http://localhost:${port}/`,
		// 'webpack/hot/only-dev-server', // TODO: enable?
		path.resolve(__dirname, 'app/renderer/index'),
	],

	output: {
		publicPath,
	},

	devServer: {
		port,
		hot: true,
		inline: false,
		historyApiFallback: false,
		contentBase: path.join(__dirname, 'dist'),
		publicPath,
	},

	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader'
				]
			},
		],
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
		}),
		new VueLoaderPlugin(),
	],

	optimization: {
		noEmitOnErrors: true, // webpack.NoEmitOnErrorsPlugin()
	},

});

"use strict";

import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import baseConfig from './webpack.config.base';


export default merge(baseConfig, {

	target: 'electron-renderer',

	mode: 'production',

	// see https://webpack.js.org/configuration/devtool/#devtool
	devtool: 'cheap-source-map',

	entry: [
		path.resolve(__dirname, 'app/renderer/index'),
	],

	output: {
		filename: 'index.[hash].js',
		publicPath: '',
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
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'html-loader!./app/renderer/template.html',
			chunks: ['main'],
		}),
	],

});

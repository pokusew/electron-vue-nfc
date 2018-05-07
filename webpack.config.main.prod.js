"use strict";

import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './webpack.config.base';


export default merge(baseConfig, {

	target: 'electron-main',

	mode: 'production',

	// see https://webpack.js.org/configuration/devtool/#devtool
	devtool: 'cheap-source-map',

	entry: [
		'./app/main/index',
	],

	output: {
		path: __dirname,
		filename: './main.js'
	},

	plugins: [

		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			},
		}),

	],

	/**
	 * Disables webpack processing of __dirname and __filename.
	 * If you run the bundle in node.js it falls back to these values of node.js.
	 * https://github.com/webpack/webpack/issues/2010
	 * TODO: still needed?
	 */
	node: {
		__dirname: false,
		__filename: false,
	},

});

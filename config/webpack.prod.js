const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common');

module.exports = (env) => {
	return merge(common(env), {
		mode: 'production',
		output: {
			path: path.resolve(__dirname, '../dist'),
			filename: 'bundle.[contenthash].js',
		},
		optimization: {
			minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
		},
		plugins: [
			new CleanWebpackPlugin(),
			new MiniCssExtractPlugin({
				filename: '[name].[contenthash].css',
			}),
		],
		module: {
			rules: [
				{
					test: /\.scss$/,
					use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
				},
			],
		},
	});
};

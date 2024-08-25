import path from 'path';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from "mini-css-extract-plugin"

type BuildMode = 'development' | 'production'

interface BuildEnv {
	mode: BuildMode
	port: number
}

export default (env: BuildEnv) => {

	const mode = env.mode || 'development'
	const PORT = env.port || 3000
	const isDev = mode === 'development';

	const config: webpack.Configuration = {
		mode: mode,
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		module: {
			rules: [
				{
					test: /\.s[ac]ss$/i,
					use: [
						isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								modules: {
									auto: (resPath: string) => Boolean(resPath.includes('.module.')),
									localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
									namedExport: false,
								},
							}
						},
						'sass-loader',
					]
				},
				{
					test: /\.svg$/,
					use: ['@svgr/webpack'],
				},
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				}
			],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},
		output: {
			filename: '[name].[contenthash].js',
			path: path.resolve(__dirname, 'build'),
			clean: true
		},
		plugins: [
			new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
			new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash:8].css' })
		],
		devtool: isDev ? 'inline-source-map' : undefined,
		devServer: isDev ? {
			port: PORT,
			open: true
		} : undefined
	};
	return config
};
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry:'./src/js/index.js',
	output:{
		path:path.resolve(__dirname, 'dist'),
		filename:'js/bundle.js'
	},
	devServer:{
		contentBase:'./dist' //For Live Server + for creating instances without the actual file/ if file require use npm run dev at last
	},
	plugins:[ //For Installing Additional Plugin
		new HtmlWebpackPlugin({	//This Plugin is for copying index.html file from src to final folder dist
			filename:'index.html',
			template:'./src/index.html'
		})
	]
};


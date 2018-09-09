const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
    src: path.resolve(__dirname, 'src'),
    dist: path.resolve(__dirname, 'dist')
};

const config = {
    mode: 'development',
    context: paths.src, // базовая директория для точек входа и загрузчиков
    entry: {
        app: './index'  // точка входа в приложение, наш src/index.ts файл, названием итогового бандла будет имя свойства - app
    },

    output: {
        path: paths.dist,  // путь для результатов сборки
        filename: '[name].bundle.js'  // название итогового бандла, получится dist/app.bundle.js
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'] // добавляем расширение tsx для файлов с react компонентами
    },

    devtool: 'inline-source-map', // дополнительные настройки и загрузчики не требуются, хотя даже официальный рецепт от TypeScript рекомендует source-map-loader и поле в tsconfig - "sourceMap": true

    module: {
        rules: [
            {
                test: /\.tsx?$/, // добавляем расширение tsx для файлов с react компонентами
                loader: 'awesome-typescript-loader'
            } // загрузчик для обработки файлов с расширением .ts
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './index.html'
        }) // генерация html-файла на основе нашего шаблона
    ]
};

module.exports = config;
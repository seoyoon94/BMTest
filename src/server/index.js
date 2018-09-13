import express from "express";
import React from "react";
import ReactDOM from "react-dom/server";
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpack from 'webpack'
import config from '../../webpack.config.js'
import Recorder from "../shared/Recorder";

const [clientConfig] = config
const compiler = webpack(config)

const app = express()

app.get("/", (_, res) => {
    const jsx = (<Recorder />)
    const reactDom = ReactDOM.renderToString(jsx)

    res.end(htmlTemplate(reactDom))
})

app.use(webpackDevMiddleware(compiler, {
    publicPath: clientConfig.output.publicPath
}))

app.listen(3000)

function htmlTemplate(reactDom) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>BlabberMouth</title>
            <link rel="stylesheet" href="style.css">
            <script src="/client.js" defer></script>
        </head>
        <body>
            <div id="app">${reactDom}</div>
        </body>
        </html>
    `
}

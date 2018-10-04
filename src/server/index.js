import express from "express";
import React from "react";
import ReactDOM from "react-dom/server";
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpack from 'webpack'
import config from '../../webpack.config'
import blabberMouthConfigs from '../../blabbermouth.config'
import Recorder from "../shared/Recorder";

const [clientConfig] = config
const compiler = webpack(config)

const app = express()
app.get('/', (_, res) => {
    const props = {
        ttsClient: process.env.BLABBERMOUTH_TTS_CLIENT || blabberMouthConfigs.ttsClient || 'native'
    }
    const jsx = (<Recorder {...props}/>)
    const reactDom = ReactDOM.renderToString(jsx)

    res.end(htmlTemplate(reactDom))
})

app.get('/authenticate', (req, res) => {
    const url = new URL(blabberMouthConfigs.lyrebird.baseUrl)
    const queryParams = new URLSearchParams({
        response_type: 'token',
        client_id: blabberMouthConfigs.lyrebird.clientId,
        redirect_uri: blabberMouthConfigs.lyrebird.redirectUrl,
        scope: 'voice',
        state: blabberMouthConfigs.lyrebird.state
    })
    url.search = queryParams.toString()
    res.redirect(url.toString())
})

app.use(express.json())

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

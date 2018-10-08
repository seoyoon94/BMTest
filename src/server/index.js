import express from "express";
import React from "react";
import ReactDOM from "react-dom/server";
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpack from 'webpack'
import config from '../../webpack.config'
import Recorder from "../shared/Recorder";
import blabberMouthConfigs from '../../blabbermouth.config'

const [clientConfig] = config
const compiler = webpack(config)

const app = express()

/**
 * Default route which will render the recorder with default settings.
 * Default settings are currently set to use the native SpeechSynthesis
 * Web API as a text-to-speech client.
 */
app.get('/', (_, res) => {
    const jsx = (<Recorder {...blabberMouthConfigs}/>)
    const reactDom = ReactDOM.renderToString(jsx)

    res.end(htmlTemplate(reactDom))
})

/**
 * Route used to authenticate the user for the Lyrebird client.
 * Must access this route first if using Lyrebird for text-to-speech
 * synthesis.
 */
app.get('/authenticate', (_, res) => {
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

/**
 * Generates an HTML template for server side rendering and instantiates
 * the React app within the DOM.
 * @param {string} reactDom Stringified react DOM.
 * @returns {string} Formatted HTML template with the React app.
 */
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

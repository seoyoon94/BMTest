import uuid from 'uuid/v4'

export default {
  ttsClient: 'lyrebird',
  sttClient: null,
  lyrebird: {
    baseUrl: 'https://myvoice.lyrebird.ai/authorize',
    clientId: '1B2RJtJw0cR9jMjvCeIfams1cew',
    redirectUrl: 'http://127.0.0.1:3000',
    state: uuid()
  }
}
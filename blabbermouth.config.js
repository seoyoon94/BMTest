import uuid from 'uuid/v4'

export default {
  ttsClient: 'lyrebird',
  sttClient: null,
  lyrebird: {
    baseUrl: 'https://myvoice.lyrebird.ai/authorize',
    clientId: '1B2RJtJw0cR9jMjvCeIfams1cew',
    redirectUrl: 'http://127.0.0.1:3000',
    state: uuid()
  },
  pullstring: {
    projectId: '0fe4bf2c-8771-4dcc-b767-877b6abcd772',
    apiKey: '3bcba332-2c98-4044-a6eb-8927c5cb5f4c'
  }
}
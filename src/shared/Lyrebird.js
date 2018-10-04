class Lyrebird {
  constructor(accessToken) {
    if(!accessToken) {
      throw new Error('Access token is required!')
    }
    this.endpoint = 'https://avatar.lyrebird.ai/api/v0'
    this.accessToken = accessToken
    this.generate = this.generate.bind(this)
  }

  generate(text) {
    return fetch(`${this.endpoint}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      },
      body: JSON.stringify({text})
    }).then(response => {
      return response.arrayBuffer()
    }).then(rawAudioData => {
      const audioContext = new AudioContext()
      audioContext.decodeAudioData(rawAudioData, buffer => {
        const source = audioContext.createBufferSource()
        source.buffer = buffer
        source.connect(audioContext.destination)
        source.start(0)
      })
    })
  }
}``

export default Lyrebird
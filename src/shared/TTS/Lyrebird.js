/**
 * Simple Lyrebird web client used to synthesize speech from text.
 * @see {@link https://docs.lyrebird.ai/} For Lyrebird documentation.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis} For SpeechSynthesis Web API.
 */
class Lyrebird {
  constructor(accessToken) {
    if(!accessToken) {
      throw new Error('Access token is required!')
    }
    this.endpoint = 'https://avatar.lyrebird.ai/api/v0'
    this.accessToken = accessToken
    this.generate = this.generate.bind(this)
    this.getArrayBuffer = this.getArrayBuffer.bind(this)
    this.startAudioPlayback = this.startAudioPlayback.bind(this)
  }

  /**
   * Creates a request to Lyrebird to synthesize text to speech and
   * begins audio playback to the user.
   * @param {string} text Text to speak to the user.
   * @returns {undefined}
   */
  generate(text) {
    fetch(`${this.endpoint}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      },
      body: JSON.stringify({text})
    }).then(this.getArrayBuffer)
    .then(this.startAudioPlayback)
  }

  /**
   * Returns raw audio data synthesized by Lyrebird.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Body/arrayBuffer}
   * @param {Response} response Fetch API Response.
   * @returns {ArrayBuffer} Buffer containing raw audio data
   *    received from Lyrebird.
   */
  getArrayBuffer(response) {
    return response.arrayBuffer()
  }

  /**
   * Uses the raw audio data in a buffer to play back audio to the user
   * with the user's default output device.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioContext}
   * @param {ArrayBuffer} rawAudioData Raw audio data.
   * @returns {undefined}
   */
  startAudioPlayback(rawAudioData) {
    const audioContext = new AudioContext()
    audioContext.decodeAudioData(rawAudioData, buffer => {
      const source = audioContext.createBufferSource()
      source.buffer = buffer
      source.connect(audioContext.destination)
      source.start(0)
    })
  }
}

export default Lyrebird
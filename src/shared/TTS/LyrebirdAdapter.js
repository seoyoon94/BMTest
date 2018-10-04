import Lyrebird from './Lyrebird'

class LyrebirdAdapter {
  constructor(accessToken) {
    this.ttsClient = new Lyrebird(accessToken)
  }

  speak(text) {
    this.ttsClient.generate(text)
  }
}

export default LyrebirdAdapter
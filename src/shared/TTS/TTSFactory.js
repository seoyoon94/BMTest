import NativeAdapter from './NativeAdapter'
import LyrebirdAdapter from './LyrebirdAdapter'

class TTSFactory {
  static createTTSClient(mode, accessToken = null) {
    const ttsMode = mode.toLowerCase()
    switch(ttsMode) {
      case 'lyrebird':
        return accessToken ?  new LyrebirdAdapter(accessToken) : new NativeAdapter()
      case 'native':
      default:
        return new NativeAdapter()
    }
  }
}

export default TTSFactory
import React from 'react'
import Button from './Button'
import Pullstring from 'pullstring'
import TTSFactory from './TTS/TTSFactory'
import './normalize.css'
import './main.css'

class Recorder extends React.Component {
  constructor(props) {
    super(props)
    this.onStart = this.onStart.bind(this)
    this.onResult = this.onResult.bind(this)
    this.onResponse = this.onResponse.bind(this)
    this.initializeSpeechRecognizer = this.initializeSpeechRecognizer.bind(this)
    this.conversation = new Pullstring.Conversation()
    this.conversation.onResponse = this.onResponse
    this.conversation.start(this.props.pullstring.projectId, new Pullstring.Request({
      apiKey: this.props.pullstring.apiKey
    }))

    this.state = {
      isRecording: false,
      userHeader: 'User',
      userText: 'Ready to begin conversation',
      psHeader: 'Pullstring',
      psText: 'Ready to begin conversation'
    }
  }

  /**
   * Set up speech-to-text and text-to-speech clients on component
   * mount, as the clients are Web APIs.
   */
  componentDidMount() {
    let accessToken = window.location.hash.split('&')[0]
    accessToken = accessToken.substring(accessToken.indexOf('=') + 1)
    this.ttsClient = TTSFactory.createTTSClient(this.props.ttsClient, accessToken)

    // Initialize speech recognition
    this.speechRecognizer = this.initializeSpeechRecognizer()
  }

  /**
   * Initializes and returns a SpeechRecognition Web API object.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition}
   * @return {SpeechRecognition} Configured SpeechRecognition
   */
  initializeSpeechRecognizer() {
    const speechRecognizer = new webkitSpeechRecognition()
    speechRecognizer.lang = 'en-US'
    speechRecognizer.interimResults = false
    speechRecognizer.maxAlternatives = 1
    speechRecognizer.onresult = this.onResult

    return speechRecognizer
  }

  /**
   * Button click handler which initiates the speech-to-text client to
   * begin recording and parsing user input.
   * @return {undefined}
   */
  onStart() {
    this.speechRecognizer.start()

    this.setState({ 
      isRecording: true
    })
  }

  /**
   * Speech recognition event handler. Utilizes the parsed user voice input
   * and sends the result to Pullstring to initiate/continue a conversation.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognitionEvent}
   * @param {SpeechRecognitionEvent} e Speech recognition event containing
   *     the parsed user voice input.
   * @return {undefined}
   */
  onResult(e) {
    const transcript = e.results[0][0].transcript
    this.speechRecognizer.stop()
    this.conversation.sendText(transcript)

    this.setState({
      userText: transcript
    })
  }

  /**
   * Pullstring response event handler. After receiving a response from Pullstring,
   * use the received text to output synthesized speech back to the user.
   * @see {@link https://github.com/pullstring/pullstring-js/blob/master/docs/PullStringSDK.md}
   * @param {Pullstring.Response} response Pullstring response containing
   *      information on the current state of the conversaton.
   * @return {undefined}
   */
  onResponse(response) {
    const text = response.outputs && response.outputs[0] && response.outputs[0].text
    if (text) {
      this.ttsClient.speak(text)
      this.setState({
        isRecording: false,
        psText: text
      })
    }
  }

  render() {
    return (
      <div className="container">
        <div className="screen">
          <div className="screen-user">
            <h3>{this.state.userHeader}</h3>
            <p>{this.state.userText}</p>
          </div>
          <div className="screen-ps">
            <h3>{this.state.psHeader}</h3>
            <p>{this.state.psText}</p>
          </div>
        </div>
        <div className="control">
          <Button
            id="start"
            onClick={this.onStart}
            active={!this.state.isRecording}
          >
          </Button>
        </div>
      </div>
    )
  }
}

export default Recorder

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

  componentDidMount() {
    let accessToken = window.location.hash.split('&')[0]
    accessToken = accessToken.substring(accessToken.indexOf('=') + 1)
    this.ttsClient = TTSFactory.createTTSClient(this.props.ttsClient, accessToken)

    // Initialize speech recognition
    this.speechRecognizer = new webkitSpeechRecognition()
    this.speechRecognizer.lang = 'en-US'
    this.speechRecognizer.interimResults = false
    this.speechRecognizer.maxAlternatives = 1
    this.speechRecognizer.onresult = this.onResult
  }

  onStart() {
    this.setState({ 
      isRecording: true
    })
    this.speechRecognizer.start()
  }

  onResult(e) {
    this.speechRecognizer.stop()
    const transcript = e.results[0][0].transcript
    this.setState({
      userText: transcript
    })
    this.conversation.sendText(transcript)
  }

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

import React from 'react'
import Button from './Button'
import Pullstring from 'pullstring'
import './normalize.css'
import './main.css'

/**
 * Pullstring constants
 */
const psProjectId = '0fe4bf2c-8771-4dcc-b767-877b6abcd772'
const psApiKey = '3bcba332-2c98-4044-a6eb-8927c5cb5f4c'

class Recorder extends React.Component {
  constructor(props) {
    super(props)
    this.onStart = this.onStart.bind(this)
    this.onResult = this.onResult.bind(this)

    this.state = {
      isRecording: false,
      speechRecognizer: null,
      userHeader: 'User',
      userText: 'Ready to begin conversation',
      psHeader: 'Pullstring',
      psText: 'Ready to begin conversation'
    }
  }

  componentDidMount() {
    const request = new Pullstring.Request({
      apiKey: psApiKey
    })
    this.conversation = new Pullstring.Conversation()
    this.conversation.start(psProjectId, request)
    this.speechRecognizer = new webkitSpeechRecognition()
  }

  onStart() {
    this.setState({ 
      isRecording: true
    })
    const speechRecognizer = this.speechRecognizer
    speechRecognizer.lang = 'en-US'
    speechRecognizer.interimResults = false
    speechRecognizer.maxAlternatives = 1
    speechRecognizer.onresult = this.onResult

    speechRecognizer.start()
  }

  onResult(e) {
    this.speechRecognizer.stop()
    const transcript = e.results[0][0].transcript
    this.setState({
      userText: transcript
    })
    this.conversation.sendText(transcript)

    this.conversation.onResponse = (response) => {
      const text = response.outputs && response.outputs[0] && response.outputs[0].text
      if (text) {
        const speech = new SpeechSynthesisUtterance(text)
        speechSynthesis.speak(speech)
        this.setState({
          isRecording: false,
          psText: text
        })
      }
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

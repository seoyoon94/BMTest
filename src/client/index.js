import React from 'react';
import ReactDOM from 'react-dom';
import Recorder from '../shared/Recorder';
import blabberMouthConfigs from '../../blabbermouth.config'

const props = {
  ttsClient: process.env.BLABBERMOUTH_TTS_CLIENT || blabberMouthConfigs.ttsClient || 'native'
}

ReactDOM.hydrate(<Recorder {...props}/>, document.getElementById('app'));

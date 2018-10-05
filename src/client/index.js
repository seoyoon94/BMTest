import React from 'react';
import ReactDOM from 'react-dom';
import Recorder from '../shared/Recorder';
import blabberMouthConfigs from '../../blabbermouth.config'

ReactDOM.hydrate(<Recorder {...blabberMouthConfigs}/>, document.getElementById('app'));

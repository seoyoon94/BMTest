import React from 'react'
import './main.css'

class Recorder extends React.Component {
    constructor() {
        super()
    }

    onSuccess (stream) {
        const player = document.getElementById('player');
        window.URL ? player.src = window.URL.createObjectURL(stream) : stream
    }

    componentDidMount() {
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then(this.onSuccess);      
    }

    render() {
        return (
            <audio id="player" controls></audio>
        )
    }
}

export default Recorder
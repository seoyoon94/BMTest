class NativeAdapter {
  speak(text) {
    const speech = new SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(speech)
  }
}

export default NativeAdapter
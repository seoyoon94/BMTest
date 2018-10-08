# BlabberMouth

Blabbermouth POC

## Requirements
* Node v8.9.4
* Yarn v1.6.0

## Configurations

Configurations for this project is defined in ```blabbermouth.config.js```. Currently supported configurations for the project includes: Selecting the text-to-speech client (Native javascript/Lyrebird), Lyrebird client configurations (API Keys, Redirect URL), and Pullstring project information.

### Selecting the text-to-speech client

    {
      // Selects Lyrebird as the text-to-speech client used to synthesize text into speech.
      // Supported values are 'lyrebird' for the Lyrebird API or 'native' for native Javascript.
      ttsClient: 'lyrebird' 
    }

### Lyrebird
    {
      // Values are defined in Lyrebird docs and can be viewed at: 
      // https://docs.lyrebird.ai/avatar_api/11_getting_token.html
      //
      // The project currently follows the OAuth 2.0 implicit flow
      baseUrl: 'https://myvoice.lyrebird.ai/authorize',
      clientId: 'client-id-from-account',
      redirectUrl: 'lyrebird-redirect-url',
      state: 'sample-state'
    }

### Pullstring
    {
      // Description of the values are defined in Pullstring docs and can be found at:
      // https://docs.pullstring.com/docs/api#section-authentication
      projectId: 'pullstring-project-id',
      apiKey: 'pullstring-api-key'
    }

## Setting Up The Project
    # Clone the project to local directory
    git clone ssh://git@stash.mtvi.com/nsp/blabbermouth.git

    # Install package dependencies
    yarn install

    # Begin webserver and listen on port 3000
    yarn dev

Navigate to http://127.0.0.1:3000/authenticate to authorize the Lyrebird client to synthesize speech and begin speaking with the client!

## Notes
Below are remaining thoughts and discoveries regarding the project for future consideration.

### Speech-to-text clients
Various speech-to-text clients exist which can parse the user's voice input and provide a text transcript. However, there are several factors to consider prior to selecting a client that exists in the wild. For the purposes of the POC, the native [Javascript SpeechRecognition API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) was used to parse the user's voice. 

One issue with this approach is that the SpeechRecognition API is [not widely supported across browsers](https://caniuse.com/#search=speechrecognition) currently. Another issue is that logic for parsing input will have to be reimplemented across devices such as Android/iOS/Web. 

To combat the issue, the parsing logic can be moved to the server side by capturing raw audio input and sending the raw audio to the server rather than parsing the input in the client. Once the raw audio is received in the server, integration among Pullstring and Lyrebird could be done in the server which could then send the synthesized raw audio data back to the client to output. With this approach, a standalone server can serve requests for Android/iOS/Web and each platform will only need to concern themselves with outputting the audio to its native speaker.

Available speech-to-text clients:

* [Google Speech-to-Text](https://cloud.google.com/speech-to-text/docs/reference/libraries)
* [Native Javascript Speech Recognition API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)

### Text-to-speech clients
As described in the previous block, the purpose of the POC was to show that integration was possible among Lyrebird, Dialogflow/Pullstring, and the app. Similarly to moving logic to the server side for speech-to-text clients, the same is suggested to be done for synthesizing text-to-speech so that each native platform only has to output the synthesized speech sent fromt he server.

Available text-to-speech clients:

* [Google Text-to-Speech](https://cloud.google.com/text-to-speech/docs/reference/libraries)
* [Amazon Polly](https://aws.amazon.com/polly/)
* [Native Javascript Speech Synthesis API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)

### Intent Recognition
As shown through demos, it was displayed that recognizing a user's intent could be done through either Dialogflow or through Pullstring. More thorough investigation of the capabilities of each client should be done to see the advantages/disadvantages for development, VUI design, and feature support.
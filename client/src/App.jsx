import { useState, useRef } from "react";

function App() {

  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const recognitionRef = useRef(null);

  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {

      let transcript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {

        transcript += event.results[i][0].transcript;

      }

      setText(transcript);

    };

    recognition.start();

    recognitionRef.current = recognition;

    setIsListening(true);

  };

  const stopListening = () => {

    recognitionRef.current.stop();

    setIsListening(false);

  };

  const handleFileChange = (e) => {

    setSelectedFile(e.target.files[0]);

  };

  return (

    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">

      <h1 className="text-5xl font-bold mb-10 text-green-400">
        Speech To Text App
      </h1>

      <div className="bg-gray-900 w-full max-w-3xl min-h-[250px] p-6 rounded-xl border border-green-500">

        <p className="text-lg whitespace-pre-wrap">

          {text || "Your speech will appear here..."}

        </p>

      </div>

      <div className="flex gap-5 mt-8">

        <button
          onClick={startListening}
          className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg text-lg font-semibold"
        >
          Start Listening
        </button>

        <button
          onClick={stopListening}
          className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg text-lg font-semibold"
        >
          Stop Listening
        </button>

      </div>

      <div className="mt-8">

        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4"
        />

        {selectedFile && (

          <p className="text-green-400">

            Selected File:
            {" "}
            {selectedFile.name}

          </p>

        )}

      </div>

      <div className="mt-6">

        {isListening ? (

          <p className="text-green-400 animate-pulse text-xl">

            🎤 Listening...

          </p>

        ) : (

          <p className="text-red-400 text-xl">

            Microphone Stopped

          </p>

        )}

      </div>

    </div>

  );

}

export default App;
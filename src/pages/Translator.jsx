 import { useState, useEffect } from "react";

function Translator() {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("theme") === "dark";
  }
  return false;
});

  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("hi");

  const languages = [
    { code: "en", speech: "en-US", name: "English" },
    { code: "hi", speech: "hi-IN", name: "Hindi" },
    { code: "mr", speech: "mr-IN", name: "Marathi" },
    { code: "fr", speech: "fr-FR", name: "French" },
    { code: "es", speech: "es-ES", name: "Spanish" },
    { code: "de", speech: "de-DE", name: "German" },
    { code: "it", speech: "it-IT", name: "Italian" },
    { code: "pt", speech: "pt-PT", name: "Portuguese" },
    { code: "ru", speech: "ru-RU", name: "Russian" },
    { code: "ja", speech: "ja-JP", name: "Japanese" },
    { code: "ko", speech: "ko-KR", name: "Korean" },
    { code: "zh", speech: "zh-CN", name: "Chinese" },
    { code: "ar", speech: "ar-SA", name: "Arabic" },
  ];
     useEffect(() => {
  localStorage.setItem("theme", darkMode ? "dark" : "light");
  document.documentElement.classList.toggle("dark", darkMode);
}, [darkMode]);

  const translateText = async () => {
    if (!text.trim()) {
      alert("Please enter some text.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://text-translator2.p.rapidapi.com/translate",
        {
          method: "POST",
          headers: {
            "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
            "x-rapidapi-host": "text-translator2.p.rapidapi.com",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            source_language: sourceLanguage,
            target_language: targetLanguage,
            text: text,
          }),
        }
      );

      const result = await response.json();

      if (result.status === "success") {
        setTranslatedText(result.data.translatedText);
      } else {
        setTranslatedText("Translation failed.");
      }
    } catch (error) {
      console.error(error);
      setTranslatedText("Something went wrong!");
    }

    setLoading(false);
  };

  const swapLanguages = () => {
  setSourceLanguage(targetLanguage);
  setTargetLanguage(sourceLanguage);

  setText(translatedText);
  setTranslatedText(text);
};

   const copyText = async () => {
  if (!translatedText) {
    alert("Nothing to copy.");
    return;
  }

  try {
    await navigator.clipboard.writeText(translatedText);
    alert("Copied Successfully!");
  } catch (err) {
    alert("Copy failed.");
  }
};

  const clearText = () => {
  setText("");
  setTranslatedText("");
  setListening(false);
};
  
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    const lang =
      languages.find((l) => l.code === sourceLanguage)?.speech || "en-US";

    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setText(speechText);
    };

    recognition.onerror = (event) => {
      console.error(event.error);

      if (event.error === "not-allowed") {
        alert("Please allow microphone permission.");
      }

      if (event.error === "no-speech") {
        alert("No speech detected.");
      }

      if (event.error === "audio-capture") {
        alert("Microphone not found.");
      }

      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return (
  <div
    className={`min-h-screen flex items-center justify-center px-4 py-8 transition-all duration-500 ${
      darkMode
        ? "bg-gray-900"
        : "bg-linear-to-br from-blue-500 via-indigo-500 to-purple-600"
    }`}
  >
    <div
      className={`w-full max-w-5xl rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 transition-all duration-500 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
    

      <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-center text-blue-600 mb-2">
        🌍 AI Language Translator
      </h1>

      <div className="flex justify-center sm:justify-end mb-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700"
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <p
        className={`text-center text-sm sm:text-base mb-8 ${
          darkMode ? "text-gray-300" : "text-gray-500"
        }`}
      >
        Translate text into multiple languages instantly
      </p>

      <textarea
        rows="5"
        placeholder="Enter text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={`w-full border-2 rounded-xl p-3 sm:p-4 text-base sm:text-lg resize-none focus:outline-none ${
          darkMode
            ? "bg-gray-700 text-white border-gray-600"
            : "bg-white text-black border-gray-300"
        }`}
      />

      <button
        onClick={startListening}
        className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl mt-4"
      >
        {listening ? "🎤 Listening..." : "🎤 Speak"}
      </button>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
        <select
          value={sourceLanguage}
          onChange={(e) => setSourceLanguage(e.target.value)}
          className={`w-full md:w-56 border-2 rounded-xl p-3 ${
            darkMode
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          }`}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>

        <button
          onClick={swapLanguages}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-xl"
        >
          ⇄
        </button>

        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          className={`w-full md:w-56 border-2 rounded-xl p-3 ${
            darkMode
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          }`}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={translateText}
        disabled={loading}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white py-3 rounded-xl text-sm sm:text-base transition" 
      >
        {loading ? "Translating..." : "Translate"}
      </button>

      <div className="mt-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-3">
          Translated Text
        </h2>

        <div
           className={`border-2 rounded-xl p-5 min-h-37.5 warp-break-word whitespace-pre-wrap ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-gray-50 border-gray-300 text-black"
          }`}
        >
          {translatedText || "Your translated text will appear here..."}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
        <button
          onClick={copyText}
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
        >
          📋 Copy
        </button>

        <button
          onClick={clearText}
          className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
        >
          🗑 Clear
        </button>
      </div>
    </div>
  </div>
);

}

export default Translator;
 import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600 text-white p-8">

      <h1 className="text-5xl font-bold mb-4">
        🌍 AI Language Translator
      </h1>

      <p className="text-xl mb-8 text-center">
        Translate text into 100+ languages instantly.
      </p>

      <Link
        to="/translator"
        className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
      >
        Start Translating
      </Link>

    </div>
  );
}

export default Home;
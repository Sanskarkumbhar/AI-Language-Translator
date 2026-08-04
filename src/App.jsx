  import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Translator from "./pages/Translator";
import About from "./pages/About";
import RandomString from "./pages/RandomString";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/translator" element={<Translator />} />
        <Route path="/about" element={<About />} />
        <Route path="/random-string" element={<RandomString />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
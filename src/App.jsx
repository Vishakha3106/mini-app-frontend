import { useEffect, useState } from "react";
import axios from "axios";
import ModelViewer from "./components/ModelViewer";

function App() {
  const [models, setModels] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:2000/models")
      .then((res) => setModels(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-700 via-blue-800 to-purple-900 text-white p-6">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-cyan-300 drop-shadow-lg">
          Welcome to the 3D Model Explorer
        </h1>
        <p className="text-lg text-gray-200 mt-2">
          Browse and interact with 3D models in real-time!
        </p>
      </div>

      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search models..."
          className="w-3/4 md:w-1/2 p-4 mb-6 rounded-lg bg-white/20 text-white placeholder-gray-300 backdrop-blur-md focus:outline-none border border-white/30 focus:ring-2 focus:ring-cyan-400"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {models
          .filter((model) =>
            model.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((model) => (
            <div
              key={model.id}
              className="p-6 rounded-xl shadow-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:scale-105 transition-transform"
            >
              <h2 className="text-2xl font-semibold text-cyan-300 mb-2">
                {model.name}
              </h2>
              <p className="text-gray-200 mb-4">{model.description}</p>
              <ModelViewer modelUrl={model.url} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;

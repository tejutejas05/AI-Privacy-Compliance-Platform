import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Upload() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setResult(null);
    setFile(null);
    setError("");
  }, []);

  const handleAnalyze = async () => {
    if (!name || !email || !file) {
      setError("Please complete all details before analyzing.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:8000/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(response.data);
    } catch (err) {
      console.error("Backend Error:", err);

      if (err.response) {
        setError(`Backend error: ${err.response.status}`);
      } else if (err.request) {
        setError("Cannot reach backend server.");
      } else {
        setError("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">

      <h2 className="text-3xl font-bold mb-8">
        Analyze Digital Exposure
      </h2>

      {/* Form Card */}
      <div className="bg-cardbg p-8 rounded-2xl shadow-2xl">

        <div className="space-y-5">

          <input
            className="w-full p-3 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full p-3 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="file"
            className="w-full text-gray-300"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-primary py-3 rounded-lg font-semibold hover:scale-105 transition transform"
          >
            {loading ? "Analyzing..." : "Analyze Exposure"}
          </button>

          {error && (
            <p className="text-red-500 mt-3">{error}</p>
          )}

        </div>
      </div>

      {/* Result Section */}
      {result && (
        <div className="mt-10 bg-slate-800 p-8 rounded-2xl shadow-xl">

          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-gray-400">Exposure Score</p>
              <h3 className="text-4xl font-bold text-primary">
                {result.score}
              </h3>
            </div>

            <div>
              <p className="text-gray-400">Risk Level</p>
              <h3
                className={`text-3xl font-bold ${
                  result.risk_level === "High"
                    ? "text-red-500"
                    : result.risk_level === "Medium"
                    ? "text-yellow-400"
                    : "text-green-400"
                }`}
              >
                {result.risk_level}
              </h3>
            </div>
          </div>

          <h4 className="mb-4 text-lg font-semibold">
            Detected Platforms
          </h4>

          <div className="grid grid-cols-2 gap-4">
            {result.platforms.map((p, i) => (
              <div
                key={i}
                className="bg-slate-700 p-4 rounded-xl hover:bg-slate-600 transition"
              >
                <p className="font-semibold">{p.Platform}</p>
                <p className="text-sm text-gray-400">
                  {p.Category}
                </p>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}
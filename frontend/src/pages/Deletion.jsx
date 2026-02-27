import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Deletion() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [platform, setPlatform] = useState("");
  const [letter, setLetter] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLetter("");
    setError("");
  }, []);

  const generate = async () => {
    if (!name || !email || !platform) {
      setError("Please fill all fields first.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("platform", platform);

      const response = await axios.post(
        "http://localhost:8000/generate-deletion",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setLetter(response.data.letter);
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
        Generate Data Deletion Request
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
            className="w-full p-3 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Platform (e.g., Facebook, Amazon)"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          />

          <button
            onClick={generate}
            disabled={loading}
            className="w-full bg-primary py-3 rounded-lg font-semibold hover:scale-105 transition transform"
          >
            {loading ? "Generating..." : "Generate Deletion Request"}
          </button>

          {error && (
            <p className="text-red-500 mt-3">{error}</p>
          )}

        </div>
      </div>

      {/* Result Section */}
      {letter && (
        <div className="mt-10 bg-slate-800 p-8 rounded-2xl shadow-xl">

          <h4 className="text-lg font-semibold mb-4">
            Generated Legal Request Letter
          </h4>

          <div className="bg-slate-900 p-6 rounded-xl text-gray-300 whitespace-pre-wrap text-sm leading-relaxed max-h-96 overflow-y-auto">
            {letter}
          </div>

          <button
            onClick={() => navigator.clipboard.writeText(letter)}
            className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm"
          >
            Copy to Clipboard
          </button>

        </div>
      )}
    </div>
  );
}
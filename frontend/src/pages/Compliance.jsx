import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Compliance() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setData(null);
    setError("");
  }, []);

  const checkCompliance = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        "http://localhost:8000/compliance"
      );

      setData(response.data);
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

  const getStatusColor = (status) => {
    if (!status) return "text-gray-400";

    if (status.toLowerCase().includes("completed"))
      return "text-green-500";

    if (status.toLowerCase().includes("pending"))
      return "text-yellow-400";

    if (status.toLowerCase().includes("rejected"))
      return "text-red-500";

    return "text-blue-400";
  };

  return (
    <div className="max-w-3xl mx-auto">

      <h2 className="text-3xl font-bold mb-8">
        Compliance Tracking Dashboard
      </h2>

      {/* Action Card */}
      <div className="bg-cardbg p-8 rounded-2xl shadow-2xl">

        <button
          onClick={checkCompliance}
          disabled={loading}
          className="w-full bg-primary py-3 rounded-lg font-semibold hover:scale-105 transition transform"
        >
          {loading ? "Checking Compliance..." : "Check Compliance Status"}
        </button>

        {error && (
          <p className="text-red-500 mt-4">{error}</p>
        )}
      </div>

      {/* Result Section */}
      {data && (
        <div className="mt-10 bg-slate-800 p-8 rounded-2xl shadow-xl">

          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-gray-400">Current Status</p>
              <h3 className={`text-3xl font-bold ${getStatusColor(data.status)}`}>
                {data.status}
              </h3>
            </div>

            <div>
              <p className="text-gray-400">Compliance Score</p>
              <h3 className="text-4xl font-bold text-primary">
                {data.compliance_score}%
              </h3>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="w-full bg-slate-700 rounded-full h-4">
              <div
                className="bg-primary h-4 rounded-full transition-all duration-700"
                style={{ width: `${data.compliance_score}%` }}
              ></div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
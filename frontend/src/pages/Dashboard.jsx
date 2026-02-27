export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2">
          🔐 PrivacyGuard Dashboard
        </h1>
        <p className="text-gray-400 text-lg">
          AI-powered Personal Data Exposure & Compliance Intelligence Platform
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6 mb-10">

        <div className="bg-cardbg p-6 rounded-2xl shadow-xl hover:scale-105 transition">
          <p className="text-gray-400">Detected Platforms</p>
          <h2 className="text-3xl font-bold text-primary mt-2">--</h2>
        </div>

        <div className="bg-cardbg p-6 rounded-2xl shadow-xl hover:scale-105 transition">
          <p className="text-gray-400">Digital Exposure Score</p>
          <h2 className="text-3xl font-bold text-yellow-400 mt-2">--</h2>
        </div>

        <div className="bg-cardbg p-6 rounded-2xl shadow-xl hover:scale-105 transition">
          <p className="text-gray-400">Compliance Score</p>
          <h2 className="text-3xl font-bold text-green-400 mt-2">--</h2>
        </div>

      </div>

      {/* Risk Visualization Section */}
      <div className="bg-slate-800 p-8 rounded-2xl shadow-xl">

        <h3 className="text-xl font-semibold mb-4">
          Overall Risk Assessment
        </h3>

        <p className="text-gray-400 mb-4">
          Your digital exposure and compliance posture will appear here after analysis.
        </p>

        <div className="w-full bg-slate-700 rounded-full h-5">
          <div
            className="bg-primary h-5 rounded-full transition-all duration-700"
            style={{ width: "0%" }}
          ></div>
        </div>

      </div>

      {/* AI Insight Section */}
      <div className="mt-10 bg-cardbg p-8 rounded-2xl shadow-xl">

        <h3 className="text-xl font-semibold mb-4">
          🤖 AI Insight Engine
        </h3>

        <p className="text-gray-400 leading-relaxed">
          PrivacyGuard leverages AI-driven analysis to detect platform exposure,
          generate compliant data deletion requests, and track regulatory compliance
          status in real time. Upload your data to begin intelligent privacy monitoring.
        </p>

      </div>

    </div>
  );
}
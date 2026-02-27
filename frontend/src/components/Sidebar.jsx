import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const navItem = (path, label) => (
    <Link
      to={path}
      className={`block px-4 py-2 rounded-lg transition ${
        location.pathname === path
          ? "bg-primary text-white"
          : "hover:bg-slate-700 text-gray-300"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="w-64 h-screen bg-cardbg p-6 fixed shadow-xl">
      <h1 className="text-2xl font-bold mb-10 text-primary">
        🔐 PrivacyGuard
      </h1>

      <div className="space-y-4">
        {navItem("/", "Dashboard")}
        {navItem("/upload", "Analyze")}
        {navItem("/deletion", "Deletion")}
        {navItem("/compliance", "Compliance")}
      </div>
    </div>
  );
}
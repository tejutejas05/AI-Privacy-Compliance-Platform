import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Deletion from "./pages/Deletion";
import Compliance from "./pages/Compliance";

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />

        <div className="ml-64 w-full p-10">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/deletion" element={<Deletion />} />
            <Route path="/compliance" element={<Compliance />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
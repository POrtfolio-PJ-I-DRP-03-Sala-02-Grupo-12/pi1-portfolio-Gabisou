import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Editor from "./pages/Editor";
import ProtectedRoute from "./components/ProtectedRoute";
import BottomNav from "./components/BottomNav"; // ✅ added

function App() {
  return (
    <div className="min-h-screen bg-gabisou-primary pb-16">
      {" "}
      {/* ✅ pb-16 makes room for navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Home />} /> {/* Optional alias */}
        <Route path="/login" element={<Login />} />
        <Route
          path="/editor"
          element={
            <ProtectedRoute>
              <Editor />
            </ProtectedRoute>
          }
        />
      </Routes>
      <BottomNav /> {/* ✅ render the bottom nav */}
    </div>
  );
}

export default App;

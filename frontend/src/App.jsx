import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home.jsx";
import Login from "./components/login.jsx";
import Signup from "./components/signup.jsx";
import PageNotFound from "./components/pageNotFound.jsx";
import { Toaster } from "react-hot-toast";

const token = localStorage.getItem("jwt");

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;

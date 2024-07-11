import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import AboutUs from "./pages/AboutUs/AboutUs";
import Home from "./pages/Home/Home";
import ChatPage from "./pages/ChatPage/ChatPage";
import Register from "./pages/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chats/:chat/:number" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

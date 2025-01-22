import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Chat from "./pages/Chat";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Chat />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;

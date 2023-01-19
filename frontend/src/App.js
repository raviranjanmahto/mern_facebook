import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Profile } from "./pages/index";
import "../src/styles/icons/icons.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} exact />
        <Route path='/profile' element={<Profile />} exact />
        <Route path='/' element={<Home />} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

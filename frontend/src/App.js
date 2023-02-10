import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Profile } from "./pages/index";
import "../src/styles/icons/icons.css";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import Activate from "./pages/Activate";
import Reset from "./pages/reset/Reset";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path='/profile' element={<Profile />} exact />
          <Route path='/' element={<Home />} exact />
          <Route path='/activate/:token' element={<Activate />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path='/login' element={<Login />} exact />
        </Route>
        <Route path='/reset' element={<Reset />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

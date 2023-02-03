import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Profile } from "./pages/index";
import "../src/styles/icons/icons.css";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path='/profile' element={<Profile />} exact />
          <Route path='/' element={<Home />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path='/login' element={<Login />} exact />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

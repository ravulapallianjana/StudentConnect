import Home from "./home";
import Service from "./service";
import Contact from "./contact";
import Navigation from "./nav";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Navigation />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/edit/:stno"
          element={<Service />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;
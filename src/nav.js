import { NavLink } from "react-router-dom";

function Navigation() {

  return (

    <nav className="navbar">

      <div className="brand">

        <div className="brand-icon">
          🎓
        </div>

        <div>
          <h2>StudentHub</h2>
          <span>Student Management</span>
        </div>

      </div>

      <div className="nav-links">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          🏠 Home
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          👨‍🎓 Students
        </NavLink>

      </div>

      <div className="profile">
        A
      </div>

    </nav>

  );
}

export default Navigation;
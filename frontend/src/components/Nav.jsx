import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const { pathname } = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        Link Tracker
      </Link>

      <div className="navbar-nav">
        <Link
          className={`nav-link ${pathname === "/" ? "active" : ""}`}
          to="/"
        >
          Dashboard
        </Link>

        <Link
          className={`nav-link ${pathname === "/create" ? "active" : ""}`}
          to="/create"
        >
          Create Link
        </Link>
      </div>
    </nav>
  );
}

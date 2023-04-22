import "./Navbar.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../API/API";

export default function MyNavBar() {
  const navigate = useNavigate();
  useEffect(() => {
    if (getCurrentUser() === null) {
      navigate("/");
    }
  });

  const handleReload = () => {
    window.location.reload();
  };

  const goToFaq = () => {
    navigate("/faq");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" onClick={handleReload}>
            CHITCHAT
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" onClick={goToFaq}>
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

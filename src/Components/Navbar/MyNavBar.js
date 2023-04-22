import "./Navbar.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../API/API";
import { deleteUser } from "../../API/API";

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

  async function handleDeleteUser() {
    const prompt =
      "Are you sure you want to delete your account? Press OK to delete.";
    if (window.confirm(prompt)) {
      try {
        await deleteUser(getCurrentUser());
        navigate("/");
        alert(
          "Your user was succesfully deleted. You're welcome back anytime!"
        );
      } catch (error) {
        alert(`Your user wasn't deleted properly. Please try again. ${error}`);
        console.log(`Error when trying to delte user! ${error}`);
      }
    }
  }

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
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Settings
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <a className="dropdown-item" onClick={handleDeleteUser}>
                    delete profile
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

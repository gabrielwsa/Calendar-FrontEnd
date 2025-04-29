import { useAuthStore } from "../../hooks/useAuthStore";
import "./styles/Navbar.css";

export const Navbar = () => {

    const { startLogout, user } = useAuthStore();

    return (
        <nav className="navbar navbar-custom">
            <span className="navbar-brand">
                <i className="fas fa-calendar-alt"></i>
                <span className="user-name">{user.name.toUpperCase()}</span>
            </span>

            <button className="btn btn-logout" onClick={startLogout}>
                <i className="fas fa-sign-out-alt"></i>
                <span>Sair</span>
            </button>
        </nav>
    )
}
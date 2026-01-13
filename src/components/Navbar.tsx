import * as React from 'react'
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from '../context/AuthContext';
import { useMediaContext } from '../context/AppContext';

const Login: React.FC = () => {
    const { login, currentUser } = useAuthContext();
    console.log("login", currentUser);
    return (
        !currentUser && (
            <button type="button" className="btn btn-warning" onClick={login}>
                Login - {currentUser}
            </button>
        )
    )
}

const LogOut: React.FC = () => {
    const { logout, currentUser } = useAuthContext();
    return (
        !!currentUser && (
            <button type="button" className="btn btn-danger" onClick={logout}>
                Logout
            </button>
        )
    )
}

const Navigation: React.FC = () => {
    const { currentUser } = useAuthContext();
    const { pathname } = useLocation();

    return (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link className={`nav-link ${pathname === "/" ? "active" : ""}`} aria-current="page" to="/">
                    Home
                </Link>
            </li>
            {currentUser && (
                <li className="nav-item">
                    <Link className={`nav-link ${pathname === "/stockimages" ? "active" : ""}`} aria-current="page" to="/stockimages">
                        My Stock Images
                    </Link>
                </li>
            )}
            {currentUser && (
                <li className="nav-item">
                    <Link className={`nav-link ${pathname === "/profile" ? "active" : ""}`} aria-current="page" to="/profile">
                        Profile
                    </Link>
                </li>
            )}
        </ul>

    );
};

const SearchForm: React.FC = () => {
    const [text, search] = React.useState(null);
    const { filterItems: filter } = useMediaContext();
    const handleOnChange = (e) => {
        search(e.target.value);
        filter(e.targete.value);
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        filter(text);
    }

    return (
        <form className="d-flex" onSubmit={handleOnSubmit}>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleOnChange} />
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
    );
};

const Dropdown: React.FC = () => {
    const { currentUser } = useAuthContext();

    const username = React.useMemo(() => {
        return currentUser?.displayName || "profile";
    }, [currentUser]);

    const avatar = React.useMemo(() => {
        return !!currentUser ? (
            <img className="avatar" src={currentUser?.photoURL} alt={currentUser?.displayName} width="34" height="34" />
        ) : (
            "Session"
        )
    }, [currentUser]);

    return (
        <ul className="navbar-nav mb-2 mb-lg-0">
            {" "}
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href={() => false} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {avatar}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {currentUser && (
                        <li>
                            <a className="dropdown-item text-center" href={() => false}>
                                <Link to="/profile">{username}</Link>
                            </a>
                            <li>
                                <hr className="dropdown divider" />
                            </li>
                        </li>
                    )}
                    <div className="d-flex justify-content-center">
                        <Login />
                        <LogOut />
                    </div>
                </ul>
            </li>
        </ul>
    );
};

const Navbar: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
            <div className="container-fluid">
                <a className="navbar-brand" href={() => false}>
                    some photo app
                </a>
                <button className="navbar-toggler" type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <Navigation />
                    <SearchForm />
                    <Dropdown />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import React from "react";

export const Navbar = ({ auth }) => {
    const handleLogout = (e) => {
        e.preventDefault();
        Inertia.post("/account/logout");
    };
    return (
        <>
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                {/* Sidebar Toggle (Topbar) */}
                <button
                    id="sidebarToggleTop"
                    className="btn btn-link d-md-none rounded-circle mr-3"
                >
                    <i className="fa fa-bars" />
                </button>
                {/* Topbar Search */}

                {/* Topbar Navbar */}
                <ul className="navbar-nav ml-auto">
                    <div className="topbar-divider d-none d-sm-block" />
                    {/* Nav Item - User Information */}
                    <li className="nav-item dropdown no-arrow">
                        <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            id="userDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                                {auth.user.nama} [{auth.user.hak_akses}]
                            </span>
                            {/* /account/logout */}
                            <img
                                className="img-profile rounded-circle"
                                src="img/undraw_profile.svg"
                            />
                        </a>
                        {/* Dropdown - User Information */}
                        <div
                            className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="userDropdown"
                        >
                            {auth.user.hak_akses == "sarpras" && (
                                <>
                                    <Link
                                        className="dropdown-item"
                                        href="account"
                                    >
                                        <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                                        Settings
                                    </Link>
                                    <div className="dropdown-divider" />
                                </>
                            )}

                            <button
                                onClick={handleLogout}
                                className="dropdown-item"
                                data-toggle="modal"
                                data-target="#logoutModal"
                            >
                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                                Logout
                            </button>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    );
};

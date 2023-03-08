import { Link } from "@inertiajs/inertia-react";
import React from "react";
import { Navbar } from "../Components/Navbar";
import { Sidebar } from "../Components/Sidebar";
export const AuthenticatedLayout = ({ children, auth }) => {
    return (
        <div id="wrapper">
            {/* SIDEBAR */}
            <Sidebar auth={auth} />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Navbar auth={auth} />
                    <div className="container-fluid">{children}</div>
                </div>
            </div>
        </div>
    );
};

export const CardForm = ({ children, title, href, formHeader }) => {
    return (
        <div className="col-12 col-lg-6">
            <div className="mb-3">
                <h1 className="h3 mb-0 text-gray-800">{title}</h1>
            </div>
            <div className="card mb-4">
                <div className="card-header d-flex justify-content-between">
                    {formHeader}
                    <Link href={href}>Kembali</Link>
                </div>
                <div className="card-body">{children}</div>
            </div>
        </div>
    );
};

export const FormSectionCards = ({ formHeader, children }) => {
    return (
        <div className="card mb-4">
            <div className="card-header d-flex justify-content-between">
                {formHeader}
            </div>
            <div className="card-body">{children}</div>
        </div>
    );
};

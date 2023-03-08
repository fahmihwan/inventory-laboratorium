import { Link } from "@inertiajs/inertia-react";
import React from "react";

export const Pagination = ({ links, totals }) => {
    return (
        <div className="d-flex justify-content-between align-items-center">
            <span>total : {totals}</span>
            <nav aria-label="...">
                <ul className="pagination">
                    {links.map((link, key) =>
                        link.url === null ? (
                            <li key={key} className="page-item disabled ">
                                <Link className="page-link">{link.label}</Link>
                            </li>
                        ) : (
                            <li
                                key={key}
                                className={`page-item ${
                                    link.active && "active"
                                }`}
                            >
                                <Link
                                    key={key}
                                    className={`page-link `}
                                    href={link.url}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        )
                    )}
                </ul>
            </nav>
        </div>
    );
};

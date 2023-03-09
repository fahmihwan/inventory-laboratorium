import { Link } from "@inertiajs/inertia-react";
import React from "react";

export const EditButton = ({ href, title = "Edit" }) => {
    return (
        <Link href={href} className="btn btn-sm btn-warning mr-2">
            <i className="fas fa-edit"></i>
        </Link>
    );
};

export const DeleteButton = ({ handleDelete, dataId }) => {
    return (
        <button
            onClick={(e) => handleDelete(e, dataId)}
            className="btn btn-sm btn-danger"
        >
            <i className="fas fa-solid fa-trash"></i>
        </button>
    );
};

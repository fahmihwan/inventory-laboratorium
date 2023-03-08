import { Link } from "@inertiajs/inertia-react";
import React from "react";

export const EditButton = ({ href, title = "Edit" }) => {
    return (
        <Link href={href} className="btn btn-sm btn-warning mr-2">
            {/* Edit */}
            {title}
        </Link>
    );
};

export const DeleteButton = ({ handleDelete, dataId }) => {
    return (
        <button
            onClick={(e) => handleDelete(e, dataId)}
            className="btn btn-sm btn-danger"
        >
            Delete
        </button>
    );
};

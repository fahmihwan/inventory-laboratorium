import "./bootstrap";
import React from "react";
import { createRoot } from "react-dom/client";
import { InertiaProgress } from "@inertiajs/progress";
import { createInertiaApp } from "@inertiajs/inertia-react";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});

InertiaProgress.init();

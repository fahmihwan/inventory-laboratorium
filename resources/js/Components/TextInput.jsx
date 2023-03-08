import React from "react";

export const TextInput = ({
    type = "text",
    title,
    value,
    name,
    readOnly,
    handleChange,
    isError = false,
    disabled = false,
}) => {
    const idEl = title.split(" ").join("-");
    return (
        <div className="form-group">
            <label htmlFor={idEl}>{title}</label>
            <input
                type={type}
                name={name}
                className={`form-control ${isError ? "is-invalid" : ""}`}
                id={idEl}
                value={value}
                onChange={(e) => handleChange(e)}
                placeholder={"Input " + title}
                readOnly={readOnly}
                disabled={disabled}
                // required={required}
            />
            <div className="invalid-feedback">{isError}</div>
        </div>
    );
};

export const RadioButton = ({ title, name, handleChange, isError }) => {
    // console.log(title, defaultChecked);
    const idEl = title.toLowerCase().split(" ").join("-");
    const defaultValue = title.toLowerCase();

    return (
        <div className="form-check is-invalid">
            <input
                className={`form-check-input `}
                type="radio"
                name={name}
                id={idEl}
                onChange={(e) => handleChange(e)}
                value={defaultValue}
            />
            <label className="form-check-label" htmlFor={idEl}>
                {title}
            </label>
        </div>
    );
};

export const SelectInput = ({
    title,
    name,
    handleChange,
    children,
    defaultValue,
    isError,
}) => {
    const idEl = title.toLowerCase().split(" ").join("-");

    return (
        <div className="form-group">
            <label htmlFor={idEl}>{title}</label>
            <select
                className={`form-control ${isError ? "is-invalid" : ""}`}
                name={name}
                onChange={handleChange}
                defaultValue={defaultValue}
                id={idEl}
            >
                {children}
            </select>
            <div className="invalid-feedback">{isError}</div>
        </div>
    );
};

export const TextareaInput = ({
    title,
    name,
    handleChange,
    defaultValue,
    isError,
}) => {
    const idEl = title.toLowerCase().split(" ").join("-");
    return (
        <div className="form-group">
            <label htmlFor={idEl}>{title}</label>
            <textarea
                className={`form-control ${isError ? "is-invalid" : ""}`}
                id={idEl}
                rows={3}
                name={name}
                onChange={handleChange}
                placeholder={"Input " + title}
                defaultValue={defaultValue}
            />
            <div className="invalid-feedback">{isError}</div>
        </div>
    );
};

export const DateInput = ({ title, value, handleChange, isError, name }) => {
    const idEl = title.toLowerCase().split(" ").join("-");
    return (
        <div className="form-group">
            <label htmlFor="tanggal_masuk">{title}</label>
            <input
                value={value}
                onChange={handleChange}
                type="date"
                className={`form-control ${isError ? "is-invalid" : ""}`}
                id={idEl}
                name={name}
                placeholder={"Input " + title}
            />
            <div className="invalid-feedback">{isError}</div>
        </div>
    );
};

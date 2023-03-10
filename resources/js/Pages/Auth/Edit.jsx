import { useForm } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import { SelectInput, TextInput } from "../../Components/TextInput";
import {
    AuthenticatedLayout,
    CardForm,
} from "../../Layouts/AuthenticatedLayout";

const Edit = (props) => {
    // const [changePassword, setChangePassword] = useState(false);
    // console.log(changePassword);
    const { data, setData, put, processing, errors, reset } = useForm({
        nama: props.user.nama,
        username: props.user.username,
        hak_akses: props.user.hak_akses,
        password: "",
        changePassword: false,
    });
    console.log(data.changePassword);

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/account/${props.user.id}`);
    };

    return (
        <AuthenticatedLayout auth={props.auth}>
            <CardForm
                title="Edit Akun"
                formHeader="Form Edit Akun"
                href="/account"
            >
                <form onSubmit={handleSubmit}>
                    <TextInput
                        title={"Nama"}
                        name={"nama"}
                        value={data.nama}
                        handleChange={handleChange}
                        isError={errors.nama}
                    />
                    <TextInput
                        title={"Username"}
                        name={"username"}
                        value={data.username}
                        handleChange={handleChange}
                        isError={errors.username}
                    />
                    <TextInput
                        title={"Hak akses"}
                        name={"hak_akses"}
                        value={data.hak_akses}
                        handleChange={handleChange}
                        disabled={true}
                    />

                    <div className="form-check mb-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="defaultCheck1"
                            onChange={() =>
                                setData("changePassword", !data.changePassword)
                            }
                        />
                        <label
                            className="form-check-label"
                            htmlFor="defaultCheck1"
                        >
                            ubah password ?
                        </label>
                    </div>
                    {data.changePassword && (
                        <div className="form-group">
                            <label htmlFor="password">Ubah Password</label>
                            <input
                                type="password"
                                name="password"
                                className={`form-control ${
                                    errors.password ? "is-invalid" : ""
                                }`}
                                required
                                id="password"
                                value={data.password}
                                onChange={(e) => handleChange(e)}
                                placeholder={"Input Password"}
                            />
                            <div className="invalid-feedback">
                                {errors.password}
                            </div>
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </CardForm>
        </AuthenticatedLayout>
    );
};

export default Edit;

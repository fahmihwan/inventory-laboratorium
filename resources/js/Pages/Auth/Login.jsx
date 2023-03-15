import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import { GuestLayout } from "../../Layouts/GuestLayout";

const Login = (props) => {
    console.log(props);
    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/account/authenticate");
    };
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    return (
        <div className="bg-gradient-success " style={{ height: "100vh" }}>
            <div className="container">
                {/* Outer Row */}
                <div
                    className="row justify-content-center align-items-center "
                    style={{ height: "100vh" }}
                >
                    <div className="col-xl-10 col-lg-12 col-md-9 ">
                        <div className="card o-hidden border-0 shadow-lg ">
                            <div className="card-body p-5">
                                {/* Nested Row within Card Body */}

                                <div className="row ">
                                    {/* <div className="col-lg-6 d-none d-lg-block bg-login-image" /> */}
                                    <div className="col-lg-6 d-none d-lg-block ">
                                        <div
                                            className="d-flex justify-content-center align-items-center "
                                            style={{ height: "100%" }}
                                        >
                                            <div>
                                                <img
                                                    src="./img/logo1.png"
                                                    alt=""
                                                    style={{ width: "300px" }}
                                                />
                                                <div className="text-center  mt-3">
                                                    Sistem Informasi Kelola Aset
                                                    Laboratorium
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">
                                                    Selamat Datang :)
                                                </h1>
                                            </div>
                                            <form
                                                className="user"
                                                onSubmit={handleSubmit}
                                            >
                                                <div className="form-group">
                                                    <input
                                                        onChange={handleChange}
                                                        name="username"
                                                        type="text"
                                                        className="form-control form-control-user"
                                                        placeholder="username"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        onChange={handleChange}
                                                        name="password"
                                                        type="password"
                                                        className="form-control form-control-user"
                                                        placeholder="Password"
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-user btn-block"
                                                >
                                                    Masuk
                                                </button>
                                            </form>
                                            <hr />
                                            {props.flash.error_message && (
                                                <div
                                                    // className="alert alert-danger text-center"
                                                    // role="alert"
                                                    className="text-danger text-center"
                                                >
                                                    {props.flash.error_message}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import { SelectInput, TextInput } from "../../Components/TextInput";
import {
    AuthenticatedLayout,
    CardForm,
} from "../../Layouts/AuthenticatedLayout";

const Create = (props) => {
    console.log(props);
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: "",
        username: "",
        hak_akses: "",
        password: "",
        ruangan_id: "",
    });
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    // console.log(data.hak_akses);
    // console.log();

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/account");
    };

    return (
        <AuthenticatedLayout auth={props.auth}>
            <CardForm
                title="Tambah Akun"
                formHeader="Form Tambah Akun"
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
                    <SelectInput
                        title="Hak Akases"
                        name="hak_akses"
                        handleChange={handleChange}
                        defaultValue={"DEFAULT"}
                        isError={errors.hak_akses}
                    >
                        <option value="DEFAULT" disabled>
                            pilih
                        </option>
                        <option value="sarpras">sarpras</option>
                        <option value="admin_akl">admin akl</option>
                        <option value="admin_bpd">admin bpd</option>
                        <option value="admin_ap">admin ap</option>
                        <option value="admin_tkj">admin tkj</option>
                    </SelectInput>
                    {data.hak_akses !== "sarpras" && data.hak_akses !== "" && (
                        <SelectInput
                            title="admin ruangan"
                            name="ruangan_id"
                            handleChange={handleChange}
                            defaultValue={"DEFAULT"}
                            isError={errors.ruangan_id}
                        >
                            <option value="DEFAULT" disabled>
                                pilih
                            </option>
                            {props.ruangans.map((d, i) => (
                                <option key={i} value={d.id}>
                                    {d.nama}
                                </option>
                            ))}
                        </SelectInput>
                    )}

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            className={`form-control ${
                                errors.password ? "is-invalid" : ""
                            }`}
                            id="password"
                            value={data.password}
                            onChange={(e) => handleChange(e)}
                            placeholder={"Input Password"}
                            // required={required}
                        />
                        <div className="invalid-feedback">
                            {errors.password}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </CardForm>
        </AuthenticatedLayout>
    );
};

export default Create;

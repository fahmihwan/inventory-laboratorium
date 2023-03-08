import { Link, useForm } from "@inertiajs/inertia-react";
import React from "react";
import {
    SelectInput,
    TextareaInput,
    TextInput,
} from "../../Components/TextInput";
import {
    AuthenticatedLayout,
    CardForm,
} from "../../Layouts/AuthenticatedLayout";

const Create = (props) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: "",
        spesifikasi: "",
        kategori_id: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/perabot");
    };

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    return (
        <AuthenticatedLayout auth={props.auth}>
            <CardForm
                title="Tambah Perabot"
                formHeader="Form Tambah Perabot"
                href="/perabot"
            >
                <form onSubmit={handleSubmit} className="needs-validation">
                    <TextInput
                        title={"Perabot / Alat"}
                        name={"nama"}
                        value={data.nama}
                        handleChange={handleChange}
                        isError={props.errors.nama}
                    />
                    <SelectInput
                        title={"Kategori"}
                        name="kategori_id"
                        defaultValue={
                            data.kategori_id !== ""
                                ? data.kategori_id
                                : "DEFAULT"
                        }
                        handleChange={handleChange}
                        isError={props.errors.kategori_id}
                    >
                        <option value={"DEFAULT"} disabled>
                            select
                        </option>
                        {props.kategories.map((d, i) => (
                            <option key={i} value={d.id}>
                                {d.nama}
                            </option>
                        ))}
                    </SelectInput>

                    <TextareaInput
                        title={"Spesifikasi"}
                        name={"spesifikasi"}
                        handleChange={handleChange}
                        defaultValue={data.spesifikasi}
                        isError={props.errors.spesifikasi}
                    />

                    <button type="submit" className="btn btn-primary">
                        submit
                    </button>
                </form>
            </CardForm>
        </AuthenticatedLayout>
    );
};

export default Create;

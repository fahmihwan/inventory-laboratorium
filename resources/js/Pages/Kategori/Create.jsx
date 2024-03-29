import { Link, useForm } from "@inertiajs/inertia-react";
import React from "react";
import { TextInput } from "../../Components/TextInput";
import {
    AuthenticatedLayout,
    CardForm,
} from "../../Layouts/AuthenticatedLayout";

const Create = (props) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: "",
    });
    console.log(props);
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/kategori");
    };

    return (
        <AuthenticatedLayout auth={props.auth}>
            <CardForm
                title="Tambah Kategori"
                formHeader="Form Tambah Kategori"
                href="/kategori"
            >
                <form onSubmit={handleSubmit} className="needs-validation">
                    <TextInput
                        title={"Kategori"}
                        name={"nama"}
                        value={data.nama}
                        handleChange={handleChange}
                        isError={errors.nama}
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

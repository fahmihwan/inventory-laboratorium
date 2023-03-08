import { Link, useForm } from "@inertiajs/inertia-react";
import React from "react";
import { TextInput } from "../../Components/TextInput";
import {
    AuthenticatedLayout,
    CardForm,
} from "../../Layouts/AuthenticatedLayout";

const Edit = (props) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        nama: props.data.nama,
    });
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/kategori/${props.data.id}`);
    };

    return (
        <AuthenticatedLayout auth={props.auth}>
            <CardForm
                title="Edit Kategori"
                formHeader="Form Edit Kategori"
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

export default Edit;

import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import {
    DateInput,
    TextareaInput,
    TextInput,
} from "../../Components/TextInput";
import {
    AuthenticatedLayout,
    CardForm,
} from "../../Layouts/AuthenticatedLayout";

const Edit = (props) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        kode_transaksi_masuk: props.data.kode_transaksi_masuk,
        tanggal_masuk: props.data.tanggal_masuk,
        keterangan: props.data.keterangan,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/transaksi_aset_masuk/${props.data.id}`);
    };

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };
    return (
        <AuthenticatedLayout auth={props.auth}>
            <CardForm
                title="Edit Transaksi Aset Masuk"
                formHeader="Form Edit Transaksi Aset Masuk"
                href="/transaksi_aset_masuk"
            >
                <form onSubmit={handleSubmit} className="needs-validation">
                    <TextInput
                        title={"Kode Transaksi Masuk"}
                        name={"kode_transaksi_masuk"}
                        value={data.kode_transaksi_masuk}
                        handleChange={handleChange}
                        isError={props.errors.kode_transaksi_masuk}
                    />
                    <DateInput
                        title={"Tanggal Masuk"}
                        handleChange={handleChange}
                        name="tanggal_masuk"
                        value={data.tanggal_masuk}
                        isError={props.errors.tanggal_masuk}
                    />
                    <TextareaInput
                        title={"Keterangan"}
                        name={"keterangan"}
                        handleChange={handleChange}
                        defaultValue={data.keterangan}
                        isError={props.errors.keterangan}
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

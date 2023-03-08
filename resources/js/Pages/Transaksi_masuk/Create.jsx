import React from "react";
import {
    AuthenticatedLayout,
    CardForm,
} from "../../Layouts/AuthenticatedLayout";
import {
    DateInput,
    TextareaInput,
    TextInput,
} from "../../Components/TextInput";
import { useForm } from "@inertiajs/inertia-react";

const Create = (props) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        kode_transaksi_masuk: props.no_referensi,
        tanggal_masuk: "",
        keterangan: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/transaksi_aset_masuk");
    };

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };
    return (
        <AuthenticatedLayout auth={props.auth}>
            <CardForm
                title="Transaksi Aset Masuk"
                formHeader="Form Transaksi Aset Masuk"
                href="/transaksi_aset_masuk"
            >
                <form onSubmit={handleSubmit} className="needs-validation">
                    <TextInput
                        title={"Kode Transaksi Masuk"}
                        name={"kode_transaksi_masuk"}
                        value={data.kode_transaksi_masuk}
                        handleChange={handleChange}
                        isError={props.errors.kode_transaksi_masuk}
                        readOnly={true}
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

export default Create;

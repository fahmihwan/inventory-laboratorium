import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import { TextInput } from "../../Components/TextInput";
import {
    AuthenticatedLayout,
    CardForm,
} from "../../Layouts/AuthenticatedLayout";

const Edit = (props) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        kode_transaksi_keluar: props.data.kode_transaksi_keluar,
        tanggal_keluar: props.data.tanggal_keluar,
        keterangan: props.data.keterangan,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/transaksi_aset_keluar/${props.data.id}`);
    };

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };
    return (
        <AuthenticatedLayout auth={props.auth}>
            <CardForm
                title="Edit Transaksi Aset Keluar"
                formHeader="Form Edit Transaksi Aset Keluar"
                href="/transaksi_aset_keluar"
            >
                <form onSubmit={handleSubmit} className="needs-validation">
                    <TextInput
                        title={"Kode Transaksi Keluar"}
                        name={"kode_transaksi_keluar"}
                        value={data.kode_transaksi_keluar}
                        handleChange={handleChange}
                        isError={errors.kode_transaksi_keluar}
                    />
                    <div className="form-group">
                        <label htmlFor="tanggal_keluar">Tanggal Masuk</label>
                        <input
                            value={data.tanggal_keluar}
                            onChange={handleChange}
                            type="date"
                            className="form-control"
                            id="tanggal_keluar"
                            name="tanggal_keluar"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="keterangan">Keterangan</label>
                        <textarea
                            className="form-control"
                            id="keterangan"
                            rows={3}
                            name="keterangan"
                            onChange={handleChange}
                            placeholder={"Input Keterangan"}
                            defaultValue={data.keterangan}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        submit
                    </button>
                </form>
            </CardForm>
        </AuthenticatedLayout>
    );
};

export default Edit;

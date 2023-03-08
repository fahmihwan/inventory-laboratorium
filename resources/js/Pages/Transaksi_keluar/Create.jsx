import React from "react";
import {
    AuthenticatedLayout,
    CardForm,
} from "../../Layouts/AuthenticatedLayout";
import { TextInput } from "../../Components/TextInput";
import { useForm } from "@inertiajs/inertia-react";

const Create = (props) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        kode_transaksi_keluar: props.no_referensi,
        tanggal_keluar: "",
        keterangan: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/transaksi_aset_keluar");
    };

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };
    return (
        <AuthenticatedLayout auth={props.auth}>
            <CardForm
                title="Transaksi Aset Keluar"
                formHeader="Form Transaksi Aset Keluar"
                href="/transaksi_aset_keluar"
            >
                <form onSubmit={handleSubmit} className="needs-validation">
                    <TextInput
                        title={"Kode Transaksi Keluar"}
                        name={"kode_transaksi_keluar"}
                        value={data.kode_transaksi_keluar}
                        handleChange={handleChange}
                        isError={errors.kode_transaksi_keluar}
                        readOnly={true}
                    />
                    <div className="form-group">
                        <label htmlFor="tanggal_keluar">Tanggal Keluar</label>
                        <input
                            value={data.tanggal_keluar}
                            onChange={handleChange}
                            type="date"
                            className="form-control"
                            id="tanggal_keluar"
                            name="tanggal_keluar"
                            placeholder="name@example.com"
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
                            defaultValue={data.Keterangan}
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

export default Create;

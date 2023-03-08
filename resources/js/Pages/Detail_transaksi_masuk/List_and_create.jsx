import { Link, useForm } from "@inertiajs/inertia-react";
import React, { useEffect, useState } from "react";
import {
    AuthenticatedLayout,
    FormSectionCards,
} from "../../Layouts/AuthenticatedLayout";
import {
    RadioButton,
    SelectInput,
    TextInput,
} from "../../Components/TextInput";
import { Inertia } from "@inertiajs/inertia";
import { DeleteButton } from "../../Components/ActionButtons";
import axios from "axios";

const List_and_create = (props) => {
    console.log(props);
    const { data, setData, post, processing, errors, reset } = useForm({
        perabot_id: props.perabots[0].id,
        kondisi: "",
        ruangan_id: props.ruangans.id,
        transaksi_barang_masuk_id: props.transaksi_masuk.id,
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
        if (e.target.name == "perabot_id") {
            get_detail_ajax(e.target.value);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/detail_transaksi_masuk`);
    };

    const handleDelete = (e, id) => {
        e.preventDefault();
        confirm("apakah anda yakin ingin menghapus?") &&
            Inertia.delete(`/detail_transaksi_masuk/${id}`);
    };

    // /detail_transaksi_masuk/{id}/get

    const [detail_ajax, setDetail_ajax] = useState(null);

    const get_detail_ajax = async (kode) => {
        await axios
            .get(`/detail_transaksi_masuk/${kode}/get`)
            .then(function (response) {
                // handle success
                // console.log(response);
                setDetail_ajax(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    };
    // console.log(detail_ajax);

    return (
        <AuthenticatedLayout auth={props.auth}>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">
                    Tambah Detail Tranasksi Masuk
                </h1>
                <Link
                    href="/transaksi_aset_masuk"
                    className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                >
                    kembali
                </Link>
            </div>
            {props.flash.error_message && (
                <div className="alert alert-danger" role="alert">
                    {props.flash.error_message}
                </div>
            )}
            <div className="row mb-4">
                <div className="col-md-4">
                    <FormSectionCards formHeader="Form Alat / Perabot">
                        <form
                            onSubmit={handleSubmit}
                            className="needs-validation"
                        >
                            <TextInput
                                title="Ruangan"
                                name="perabot_id"
                                value={props.ruangans.nama}
                                disabled={true}
                            />
                            <SelectInput
                                title="Perabot"
                                name="perabot_id"
                                defaultValue={"DEFAULT"}
                                handleChange={handleChange}
                            >
                                <option value="DEFAULT" disabled>
                                    pilih
                                </option>
                                {props.perabots.map((d, i) => (
                                    <option key={i} value={d.id}>
                                        {d.nama}
                                    </option>
                                ))}
                            </SelectInput>
                            {detail_ajax && (
                                <CardDetailAjax detail_ajax={detail_ajax} />
                            )}

                            <div className="form-group is-invalid">
                                <label htmlFor="kondisi">Kondisi</label>
                                <RadioButton
                                    handleChange={handleChange}
                                    title={"Baik"}
                                    name="kondisi"
                                />
                                <RadioButton
                                    handleChange={handleChange}
                                    title={"Rusak Ringan"}
                                    name="kondisi"
                                />
                                <RadioButton
                                    handleChange={handleChange}
                                    title={"Rusak Berat"}
                                    name="kondisi"
                                />
                                {props.errors.kondisi && (
                                    <div className="invalid-feedback">
                                        {props.errors.kondisi}
                                    </div>
                                )}
                            </div>

                            <button type="submit" className="btn btn-primary">
                                submit
                            </button>
                        </form>
                    </FormSectionCards>
                </div>
                <div className="col-md-8">
                    <FormSectionCards formHeader="Transaksi">
                        <div className="row mb-3">
                            <Keterangan
                                transaksi_masuk={props.transaksi_masuk}
                            />
                        </div>
                        <div className="row">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Kode Perabot</th>
                                        <th scope="col">Perabot</th>
                                        <th scope="col">Ruangan</th>
                                        <th scope="col">Kondisi</th>
                                        <th scope="col">action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.detail_transaksi_barang_masuks.map(
                                        (d, i) => (
                                            <tr key={i}>
                                                <th scope="row">{i + 1}</th>
                                                <td>{d.kode_perabot}</td>
                                                <td>{d.perabot.nama}</td>
                                                <td>{d.ruangan.nama}</td>
                                                <td>{d.kondisi}</td>
                                                <td>
                                                    <DeleteButton
                                                        handleDelete={(e) =>
                                                            handleDelete(
                                                                e,
                                                                d.id
                                                            )
                                                        }
                                                    >
                                                        delete
                                                    </DeleteButton>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </FormSectionCards>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default List_and_create;

const Keterangan = ({ transaksi_masuk }) => {
    return (
        <table>
            <tbody>
                <tr>
                    <td>Kode tranasksi masuk</td>
                    <td> : {transaksi_masuk.kode_transaksi_masuk}</td>
                </tr>
                <tr>
                    <td className="pr-3">Tanggal masuk</td>
                    <td> : {transaksi_masuk.tanggal_masuk}</td>
                </tr>
                <tr>
                    <td>Ruangan</td>
                    <td> : {transaksi_masuk.ruangan.nama}</td>
                </tr>
                <tr>
                    <td>Keterangan</td>
                    <td> : {transaksi_masuk.keterangan}</td>
                </tr>
            </tbody>
        </table>
    );
};

const CardDetailAjax = ({ detail_ajax }) => {
    return (
        <div className="card bg-info p-2 text-white mb-3">
            <table id="">
                <tbody>
                    <tr>
                        <th style={{ width: "100px" }}>perabot</th>
                        <td>: {detail_ajax?.nama}</td>
                    </tr>
                    <tr>
                        <th>kategori</th>
                        <td>: {detail_ajax?.kategori.nama}</td>
                    </tr>
                    <tr>
                        <th>spesifikasi</th>
                        <td>: {detail_ajax?.spesifikasi}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

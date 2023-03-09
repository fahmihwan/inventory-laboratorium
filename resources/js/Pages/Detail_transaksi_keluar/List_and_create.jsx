import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { DeleteButton } from "../../Components/ActionButtons";
import {
    AuthenticatedLayout,
    FormSectionCards,
} from "../../Layouts/AuthenticatedLayout";

import "./../../../../public/css/select.css";
const List_and_create = (props) => {
    const [searchKode, setSearchKode] = useState("");
    const [listKode, setListKode] = useState([]);
    const dropdownRef = useRef();
    const [detail_ajax, setDetail_ajax] = useState([]);
    const [focusSearch, setFocusSearch] = useState(false);
    const [radioValue, setRadioValue] = useState("");

    const handleSelected = (kode) => {
        setSearchKode(kode);
        dropdownRef.current.classList.add("d-none");
    };

    const getDatas = async (link) => {
        const response = await fetch(`/detail_transaksi_keluar/${link}/search`);
        const data = await response.json();
        await setListKode(data);
        if (data.length == 1) {
            get_detail_ajax(data[0].kode_perabot);
        }
    };

    useEffect(() => {
        if (focusSearch) {
            dropdownRef.current.classList.remove("d-none");
        }
        let search = searchKode.length !== 0 ? searchKode : "lb";
        getDatas(search);
    }, [searchKode, focusSearch]);

    const get_detail_ajax = async (kode) => {
        await axios
            .get(`/detail_transaksi_keluar/${kode}/get`)
            .then(function (response) {
                setRadioValue(response.data.kondisi);
                setDetail_ajax(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await Inertia.post("/detail_transaksi_keluar", {
            transaksi_barang_keluar_id: props.transaksi_barang_keluar.id,
            kode_perabot: searchKode,
            kondisi: radioValue,
        });
        await getDatas("lb");
        setSearchKode("");
    };

    const handleDelete = async (e, id) => {
        e.preventDefault();
        if (confirm("apakah anda yakin ingin menghapus?")) {
            await Inertia.delete(`/detail_transaksi_keluar/${id}`);
            await getDatas("lb");
            setSearchKode("");
        }
        dropdownRef.current.classList.add("d-none");
    };

    return (
        <AuthenticatedLayout auth={props.auth}>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">
                    Tambah Detail Transaksi Keluar
                </h1>
                <Link
                    href="/transaksi_aset_keluar"
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
                <div className="col-md-6">
                    <FormSectionCards formHeader="Form Alat / Perabot">
                        <form
                            onSubmit={handleSubmit}
                            className="needs-validation"
                        >
                            <SelecSearchEl
                                setFocusSearch={setFocusSearch}
                                searchKode={searchKode}
                                setSearchKode={setSearchKode}
                                dropdownRef={dropdownRef}
                                handleSelected={handleSelected}
                                listKode={listKode}
                            />
                            {detail_ajax.length !== 0 && (
                                <>
                                    <CardDetailAjax detail_ajax={detail_ajax} />
                                    <div className="mb-5 ">
                                        <label>kondisi</label>
                                        <RadioButtonEl
                                            id="customeRadio1"
                                            name="kondisi"
                                            value="baik"
                                            radioValue={radioValue}
                                            setRadioValue={setRadioValue}
                                        />
                                        <RadioButtonEl
                                            id="customeRadio2"
                                            name="kondisi"
                                            value="rusak ringan"
                                            radioValue={radioValue}
                                            setRadioValue={setRadioValue}
                                        />
                                        <RadioButtonEl
                                            id="customeRadio3"
                                            name="kondisi"
                                            value="rusak berat"
                                            radioValue={radioValue}
                                            setRadioValue={setRadioValue}
                                        />
                                    </div>
                                </>
                            )}
                            <button type="submit" className="btn btn-primary">
                                Tambah Data
                            </button>
                        </form>
                    </FormSectionCards>
                </div>
                <div className="col-md-6">
                    <FormSectionCards formHeader="Form Alat / Perabot">
                        <NoteTransaksi
                            transaksi_barang_keluar={
                                props.transaksi_barang_keluar
                            }
                        />
                    </FormSectionCards>
                </div>
            </div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                        List Perabot
                    </h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table
                            className="table table-bordered"
                            id="dataTable"
                            width="100%"
                            cellSpacing={0}
                        >
                            <thead>
                                <tr>
                                    <th>no</th>
                                    <th>kode</th>
                                    <th>alat</th>
                                    <th>kategori</th>
                                    <th>spesifikasi</th>
                                    <th>kondisi</th>
                                    <th>ruangan</th>
                                    <th>action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.detail_transaksi_barang_keluars?.map(
                                    (d, i) => (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>
                                                {
                                                    d
                                                        .detail_transaksi_barang_masuk
                                                        .kode_perabot
                                                }
                                            </td>
                                            <td>
                                                {
                                                    d
                                                        .detail_transaksi_barang_masuk
                                                        .perabot.nama
                                                }
                                            </td>
                                            <td>
                                                {
                                                    d
                                                        .detail_transaksi_barang_masuk
                                                        .perabot.kategori.nama
                                                }
                                            </td>
                                            <td>
                                                {
                                                    d
                                                        .detail_transaksi_barang_masuk
                                                        .perabot.spesifikasi
                                                }
                                            </td>
                                            <td>
                                                {
                                                    d
                                                        .detail_transaksi_barang_masuk
                                                        .kondisi
                                                }
                                            </td>
                                            <td>
                                                {
                                                    d
                                                        .detail_transaksi_barang_masuk
                                                        .ruangan.nama
                                                }
                                            </td>

                                            <td>
                                                <DeleteButton
                                                    handleDelete={(e) =>
                                                        handleDelete(e, d.id)
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
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default List_and_create;

const SelecSearchEl = ({
    searchKode,
    setSearchKode,
    dropdownRef,
    handleSelected,
    listKode,
    setFocusSearch,
}) => {
    return (
        <div className="form-group">
            <label htmlFor="">Select Kode</label>
            <div className="select-container">
                <input
                    required
                    type="text"
                    onFocus={() => setFocusSearch(true)}
                    onBlur={() => setFocusSearch(false)}
                    value={searchKode}
                    onChange={(e) => setSearchKode(e.target.value)}
                    className="form-control "
                    placeholder="kode perabot"
                />

                <div className={`select-dropdown d-none`} ref={dropdownRef}>
                    {listKode?.length != 0 &&
                        listKode?.map((d, i) => (
                            <div
                                key={i}
                                className="select-dropdown-option"
                                onClick={() => handleSelected(d.kode_perabot)}
                            >
                                {d.kode_perabot}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

const NoteTransaksi = ({ transaksi_barang_keluar }) => {
    return (
        <table id="table-info-detail">
            <tbody>
                <tr>
                    <th>kode transaksi</th>
                    <td>: {transaksi_barang_keluar.kode_transaksi_keluar}</td>
                </tr>

                <tr>
                    <th>tanggal_keluar</th>
                    <td>: {transaksi_barang_keluar.tanggal_keluar}</td>
                </tr>

                <tr>
                    <th>ruangan</th>
                    <td>: {transaksi_barang_keluar.ruangan.nama}</td>
                </tr>
                <tr>
                    <th>keterangan</th>
                    <td>: {transaksi_barang_keluar.keterangan}</td>
                </tr>
            </tbody>
        </table>
    );
};

const CardDetailAjax = ({ detail_ajax }) => {
    return (
        <div className="card bg-primary p-2 text-white mb-3">
            <table id="table-info-detail">
                <tbody>
                    <tr>
                        <th>perabot</th>
                        <td>: {detail_ajax?.perabot?.nama}</td>
                    </tr>
                    <tr>
                        <th>spesifikasi</th>
                        <td>: {detail_ajax?.perabot?.spesifikasi}</td>
                    </tr>
                    <tr>
                        <th>ruangan</th>
                        <td>: {detail_ajax?.ruangan?.nama}</td>
                    </tr>
                    <tr>
                        <th>kondisi</th>
                        <td>: {detail_ajax?.kondisi}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

const RadioButtonEl = ({ id, name, value, radioValue, setRadioValue }) => {
    return (
        <div className="custom-control custom-radio">
            <input
                type="radio"
                id={id}
                name={name}
                className="custom-control-input"
                value={value}
                onChange={(e) => setRadioValue(e.target.value)}
                checked={radioValue == value}
            />
            <label className="custom-control-label" htmlFor={id}>
                {value}
            </label>
        </div>
    );
};

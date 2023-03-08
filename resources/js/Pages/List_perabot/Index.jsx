import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import React, { useEffect, useRef, useState } from "react";

import { DeleteButton, EditButton } from "../../Components/ActionButtons";
import { Pagination } from "../../Components/Pagination";
import { RadioButton } from "../../Components/TextInput";

import { AuthenticatedLayout } from "../../Layouts/AuthenticatedLayout";

const Index = (props) => {
    const [kondisi, setKondisi] = useState({
        id: "",
        kondisi: "",
    });
    const btnCloseModal = useRef(null);

    const handleChange = (e) => {
        setKondisi((currentId) => ({
            ...currentId,
            kondisi: e.target.value,
        }));
    };

    const updateKondisi = () => {
        Inertia.put(`/list_perabot/${kondisi.id}`, kondisi);
        btnCloseModal.current.click();
    };
    return (
        <AuthenticatedLayout auth={props.auth}>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">List Perabot / Alat</h1>
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
                                    <th>created_at</th>
                                    <th>action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props?.datas?.data?.map((d, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i + props.datas.from} </td>
                                            <td>{d.kode_perabot}</td>
                                            <td>{d.perabot.nama}</td>
                                            <td>{d.perabot.kategori.nama}</td>
                                            <td>{d.perabot.spesifikasi}</td>
                                            <td>{d.kondisi}</td>
                                            <td>{d.ruangan.nama}</td>
                                            <td>{d.created_at}</td>
                                            <td>
                                                <button
                                                    onClick={() =>
                                                        setKondisi({
                                                            id: d.id,
                                                            kondisi: d.kondisi,
                                                        })
                                                    }
                                                    type="button"
                                                    className="btn btn-sm btn-warning"
                                                    data-toggle="modal"
                                                    data-target="#exampleModal"
                                                >
                                                    update kondisi
                                                </button>
                                                {/* Modal */}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>no</th>
                                    <th>kode</th>
                                    <th>kategori</th>
                                    <th>alat</th>
                                    <th>spesifikasi</th>
                                    <th>kondisi</th>
                                    <th>ruangan</th>
                                    <th>created_at</th>
                                    <th>action</th>
                                </tr>
                            </tfoot>
                        </table>
                        <Pagination
                            totals={props.datas.total}
                            links={props.datas.links}
                        />
                        {/* <ModalEdit kondisi={kondisi} /> */}
                        <div
                            className="modal fade"
                            id="exampleModal"
                            tabIndex={-1}
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5
                                            className="modal-title"
                                            id="exampleModalLabel"
                                        >
                                            Modal title
                                        </h5>
                                        <button
                                            type="button"
                                            className="close"
                                            data-dismiss="modal"
                                            aria-label="Close"
                                        >
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <label htmlFor="kondisi">
                                                Kondisi
                                            </label>
                                            <RadioButton
                                                handleChange={handleChange}
                                                title={"Baik"}
                                                name="kondisi"
                                                defaultChecked={
                                                    kondisi.kondisi === "baik"
                                                }
                                            />
                                            <RadioButton
                                                handleChange={handleChange}
                                                title={"Rusak Ringan"}
                                                name="kondisi"
                                                defaultChecked={
                                                    kondisi.kondisi ==
                                                    "rusak ringan"
                                                }
                                            />
                                            <RadioButton
                                                handleChange={handleChange}
                                                title={"Rusak Berat"}
                                                name="kondisi"
                                                defaultChecked={
                                                    kondisi.kondisi ==
                                                    "rusak berat"
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-dismiss="modal"
                                            ref={btnCloseModal}
                                        >
                                            Close
                                        </button>
                                        <button
                                            type="button"
                                            onClick={updateKondisi}
                                            className="btn btn-primary"
                                        >
                                            Save changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;

const ModalEdit = ({ kondisi }) => {
    // console.log(kondisi == "baik" ? true : false);
    // console.log(kondisi == "baik" ? true : false);
    return (
        <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Modal title
                        </h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="kondisi">Kondisi</label>
                            <RadioButton
                                // handleChange={setKondisi}
                                title={"Baik"}
                                name="kondisi"
                                defaultChecked={
                                    kondisi == "baik" ? true : false
                                }
                            />
                            <RadioButton
                                // handleChange={setKondisi}
                                title={"Rusak Ringan"}
                                name="kondisi"
                                defaultChecked={kondisi == "rusak ringan"}
                                // defaultChecked={false}
                            />
                            <RadioButton
                                // handleChange={setKondisi}
                                title={"Rusak Berat"}
                                name="kondisi"
                                // defaultChecked={false}
                                defaultChecked={kondisi == "rusak berat"}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                        >
                            Close
                        </button>
                        <button type="button" className="btn btn-primary">
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

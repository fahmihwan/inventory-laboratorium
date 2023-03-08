import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import React from "react";
import { DeleteButton, EditButton } from "../../Components/ActionButtons";
import { Pagination } from "../../Components/Pagination";

import { AuthenticatedLayout } from "../../Layouts/AuthenticatedLayout";

const Index = (props) => {
    const handleDelete = (e, id) => {
        e.preventDefault();
        confirm("apakah anda yakin ingin menghapus?") &&
            Inertia.delete(`/perabot/${id}`);
    };
    return (
        <AuthenticatedLayout auth={props.auth}>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">List Perabot</h1>
                <Link
                    href="/perabot/create"
                    className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                >
                    Tambah Data
                </Link>
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
                                    <th>alat</th>
                                    <th>kategori</th>
                                    <th>spesifikasi</th>
                                    <th>created_at</th>
                                    <th>action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props?.datas?.data?.map((d, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i + props.datas.from} </td>
                                            <td>{d.nama}</td>
                                            <td>{d.kategori.nama}</td>
                                            <td>{d.spesifikasi}</td>
                                            <td>{d.created_at}</td>
                                            <td>
                                                <EditButton
                                                    href={`/perabot/${d.id}/edit`}
                                                />
                                                <DeleteButton
                                                    handleDelete={handleDelete}
                                                    dataId={d.id}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>no</th>
                                    <th>alat</th>
                                    <th>kategori</th>
                                    <th>spesifikasi</th>
                                    <th>created_at</th>
                                    <th>action</th>
                                </tr>
                            </tfoot>
                        </table>
                        <Pagination
                            totals={props.datas.total}
                            links={props.datas.links}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;

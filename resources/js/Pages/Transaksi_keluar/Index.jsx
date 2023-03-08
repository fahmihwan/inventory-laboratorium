import { Link } from "@inertiajs/inertia-react";
import React from "react";
import { Pagination } from "../../Components/Pagination";
import { AuthenticatedLayout } from "../../Layouts/AuthenticatedLayout";
import { DeleteButton, EditButton } from "../../Components/ActionButtons";
import { Inertia } from "@inertiajs/inertia";

const Index = (props) => {
    const handleDelete = (e, id) => {
        e.preventDefault();
        confirm("apakah anda yakin ingin menghapus?") &&
            Inertia.delete(`/transaksi_aset_keluar/${id}`);
    };

    return (
        <AuthenticatedLayout auth={props.auth}>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">List Transaksi Keluar</h1>
                <Link
                    href="/transaksi_aset_keluar/create"
                    className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                >
                    Tambah Data
                </Link>
            </div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                        List Transaksi Keluar
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
                                    <th>kode keluar</th>
                                    <th>tanggal keluar</th>
                                    <th>ruangan</th>
                                    <th>keterangan</th>
                                    <th>action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props?.datas?.data?.map((d, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i + props.datas.from} </td>
                                            <td>{d.kode_transaksi_keluar}</td>
                                            <td>{d.tanggal_keluar}</td>
                                            <td>{d.ruangan.nama}</td>
                                            <td>{d.keterangan}</td>
                                            <td>
                                                {props.auth.user.ruangan_id ==
                                                    d.ruangan_id && (
                                                    <>
                                                        <EditButton
                                                            href={`/transaksi_aset_keluar/${d.id}/edit`}
                                                        />
                                                        <Link
                                                            href={`/detail_transaksi_keluar/${d.id}/create`}
                                                            className="btn btn-sm btn-info mr-2"
                                                        >
                                                            view
                                                        </Link>
                                                        <DeleteButton
                                                            handleDelete={
                                                                handleDelete
                                                            }
                                                            dataId={d.id}
                                                        />
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>no</th>
                                    <th>kode keluar</th>
                                    <th>tanggal keluar</th>
                                    <th>ruangan</th>
                                    <th>keterangan</th>
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

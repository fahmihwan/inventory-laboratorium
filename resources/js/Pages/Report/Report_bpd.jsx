import React from "react";
import { Pagination } from "../../Components/Pagination";
import { AuthenticatedLayout } from "../../Layouts/AuthenticatedLayout";

const Report_perabot = (props) => {
    return (
        <AuthenticatedLayout auth={props.auth}>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Laporan bpd</h1>
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
                                </tr>
                            </thead>
                            <tbody>
                                {/* {props?.datas?.data?.map((d, i) => {
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
                                        </tr>
                                    );
                                })} */}
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
                                </tr>
                            </tfoot>
                        </table>
                        {/* <Pagination
                            totals={props.datas.total}
                            links={props.datas.links}
                        /> */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Report_perabot;

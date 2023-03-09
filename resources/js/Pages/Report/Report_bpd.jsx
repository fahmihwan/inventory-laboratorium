import React from "react";
import { Pagination } from "../../Components/Pagination";
import { AuthenticatedLayout } from "../../Layouts/AuthenticatedLayout";

const Report_bpd = (props) => {
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
                        <table className="table table-bordered " id="dataTable">
                            <thead className="text-center">
                                <tr>
                                    <td rowSpan="2">No</td>
                                    <td rowSpan="2">Nama Alat / Perabot</td>
                                    <td rowSpan="2">Spesifikasi</td>
                                    <td colSpan="3">jumlah</td>
                                    <td rowSpan="2">jumlah</td>
                                </tr>
                                <tr>
                                    <td>baik</td>
                                    <td>rusak ringan</td>
                                    <td>rusak berat</td>
                                </tr>
                            </thead>
                            <tbody>
                                {props?.datas?.map((d, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{d.nama}</td>
                                            <td>{d.spesifikasi}</td>
                                            <td>{d.count_baik}</td>
                                            <td>{d.count_rusak_ringan}</td>
                                            <td>{d.count_rusak_berat}</td>
                                            <td>{d.count_total}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
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

export default Report_bpd;

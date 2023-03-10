import { Link } from "@inertiajs/inertia-react";
import React, { useState } from "react";
// import CartIcon from '../images/CartIcon.png';
// import CartIcon from './img/logo1.png';
import LogoInstansi from "../../../public/img/logo1.png";
export const Sidebar = ({ auth }) => {
    return (
        <>
            <ul
                className="navbar-nav bg-gradient-success sidebar sidebar-dark accordion"
                id="accordionSidebar"
            >
                <LogoDashboard LogoInstansi={LogoInstansi} />

                <hr className="sidebar-divider my-0" />
                {/* DASHBOARD */}
                <li className={`nav-item`}>
                    <Link className="nav-link" href="/dashboard">
                        <i className="fas fa-fw fa-tachometer-alt" />
                        <span>Dashboard</span>
                    </Link>
                </li>
                {/* DATA MASTER */}
                {auth.user.hak_akses === "sarpras" && (
                    <>
                        <hr className="sidebar-divider" />
                        <div className="sidebar-heading">Master </div>
                        <li className="nav-item">
                            <a
                                className="nav-link collapsed"
                                href="#"
                                data-toggle="collapse"
                                data-target="#collapseUtilities"
                                aria-expanded="true"
                                aria-controls="collapseUtilities"
                            >
                                <i className="fas fa-solid fa-lock"></i>
                                <span>Master Data</span>
                            </a>

                            <div
                                id="collapseUtilities"
                                className="collapse"
                                aria-labelledby="headingUtilities"
                                data-parent="#accordionSidebar"
                            >
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <Link
                                        className="collapse-item"
                                        href="/kategori"
                                    >
                                        Kategori
                                    </Link>
                                    <Link
                                        className="collapse-item"
                                        href="/ruangan"
                                    >
                                        Ruangan
                                    </Link>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/perabot">
                                <i className="fas fa-solid fa-warehouse"></i>
                                <span>Perabot / Alat</span>
                            </Link>
                        </li>
                    </>
                )}

                {/* TRANSAKSI */}
                {auth.user.hak_akses !== "sarpras" && (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" href="/list_perabot">
                                <i className="fas fa-solid fa-warehouse"></i>
                                <span>List Perabot / Alat</span>
                            </Link>
                        </li>
                        <div className="sidebar-heading">Data Transaksi</div>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                href="/transaksi_aset_masuk"
                            >
                                <i className="fas fa-solid fa-dolly"></i>
                                <span>Aset Masuk</span>
                            </Link>
                            <Link
                                className="nav-link"
                                href="/transaksi_aset_keluar"
                            >
                                <i className="fas fa-solid fa-dumpster"></i>
                                <span>Aset Keluar</span>
                            </Link>
                        </li>
                    </>
                )}

                {/* LAPORAN */}
                {auth.user.hak_akses == "sarpras" && (
                    <>
                        <hr className="sidebar-divider" />
                        <div className="sidebar-heading">LAPORAN </div>
                        <li className="nav-item">
                            <a
                                className="nav-link collapsed"
                                href="#"
                                data-toggle="collapse"
                                data-target="#laporan"
                                aria-expanded="true"
                                aria-controls="laporan"
                            >
                                {/* <i className="fas fa-fw fa-wrench"></i> */}
                                <i className="fas fa-solid fa-clipboard"></i>
                                <span>Laporan</span>
                            </a>

                            <div
                                id="laporan"
                                className="collapse"
                                aria-labelledby="headingUtilities"
                                data-parent="#accordionSidebar"
                            >
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <Link
                                        className="collapse-item"
                                        href="/laporan/list-perabot"
                                    >
                                        Semua Aset
                                    </Link>
                                    <Link
                                        className="collapse-item"
                                        href="/laporan/list-tkj"
                                    >
                                        Lab TKJ
                                    </Link>
                                    <Link
                                        className="collapse-item"
                                        href="/laporan/list-akl"
                                    >
                                        Lab AKL
                                    </Link>
                                    <Link
                                        className="collapse-item"
                                        href="/laporan/list-ap"
                                    >
                                        Lab AP
                                    </Link>
                                    <Link
                                        className="collapse-item"
                                        href="/laporan/list-bpd"
                                    >
                                        Lab BPD
                                    </Link>
                                </div>
                            </div>
                        </li>
                    </>
                )}

                {/* <hr className="sidebar-divider d-none d-md-block" />
                <div className="text-center d-none d-md-inline">
                    <button
                        className="rounded-circle border-0"
                        id="sidebarToggle"
                    />
                </div> */}
            </ul>
        </>
    );
};

const LogoDashboard = ({ LogoInstansi }) => {
    return (
        <Link
            href="/dashboard"
            className="sidebar-brand d-flex align-items-center justify-content-center"
        >
            {/* <img src="./img/logo1.png" alt="" style={{ width: "50px" }} /> */}
            <img src={LogoInstansi} alt="" style={{ width: "50px" }} />

            <div className="sidebar-brand-text mx-3">SB Admin</div>
        </Link>
    );
};

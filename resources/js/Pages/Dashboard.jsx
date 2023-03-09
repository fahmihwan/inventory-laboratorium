import React, { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

import { AuthenticatedLayout } from "./../Layouts/AuthenticatedLayout.jsx";

const Dashboard = (props) => {
    return (
        <div>
            <AuthenticatedLayout auth={props.auth}>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                </div>
                <div className="mb-4">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card " style={{ height: "500px" }}>
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">
                                        List Perabot
                                    </h6>
                                </div>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        width={500}
                                        height={300}
                                        data={props.list_perabot}
                                        margin={{
                                            top: 20,
                                            right: 30,
                                            left: 0,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar
                                            dataKey="total"
                                            stackId="a"
                                            fill="#4E73DF"
                                        />
                                        <Bar
                                            dataKey="baik"
                                            stackId="a"
                                            fill="#1CC88A"
                                        />
                                        <Bar
                                            dataKey="rusak_ringan"
                                            stackId="a"
                                            fill="#F6C23E"
                                        />
                                        <Bar
                                            dataKey="rusak_berat"
                                            stackId="a"
                                            fill="#E83E8C"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
};

export default Dashboard;

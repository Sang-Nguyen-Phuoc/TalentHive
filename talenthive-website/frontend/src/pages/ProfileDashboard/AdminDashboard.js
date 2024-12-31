import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";
import { getActivitiesData, getAppOverview, getLogs } from "../../services/adminServices";
import { useLoaderData } from "react-router";
import { LOG_ACTIONS, ROLES } from "../../utils/Constants";

export const adminDashboardLoader = async () => {
    let overviewData = null;
    try {
        overviewData = await getAppOverview();
    } catch (error) {
        console.error("Error fetching overview data:", error);
    }

    return { overviewData };
};

const AdminDashboard = () => {
    const { overviewData } = useLoaderData();
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ userRole: "", action: "", startDate: "", endDate: "" });
    const [search, setSearch] = useState("");

    const fetchLogs = async () => {
        try {
            const response = await getLogs(filters, search);
            setLogs(response?.logs || []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching activity data:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const handleFilter = async () => {
        setLoading(true);
        try {
            const response = await getLogs(filters, search);
            setLogs(response?.logs || []);
            setLoading(false);
        } catch (error) {
            console.error("Error filtering logs:", error);
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Admin Dashboard</h1>

            {/* Overview Section */}
            <section className="mb-5">
                <h2>Overview</h2>
                <div className="card p-3 mb-4">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={overviewData?.overview}>
                            <XAxis
                                dataKey="_id"
                                name="Action"
                                tick={{ textAnchor: "end" }}
                                margin={{ top: 20, bottom: 30 }}
                            />
                            <YAxis />
                            <Tooltip />
                            <Legend layout="horizontal" verticalAlign="top" wrapperStyle={{ top: -10 }} />
                            <Bar
                                dataKey="count"
                                fill="#8884d8"
                                name="Action Count"
                                label={{ position: "top", fill: "#000" }}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </section>

            {/* Filter Section */}
            <section className="mb-5">
                <h2>Filters</h2>
                <div className="row g-3 align-items-end">
                    <div className="col-md-2">
                        <select
                            className="form-select"
                            value={filters.userRole}
                            onChange={(e) => setFilters({ ...filters, userRole: e.target.value })}
                        >
                            <option value="">All Roles</option>
                            <option value={ROLES.CANDIDATE}>Candidate</option>
                            <option value={ROLES.EMPLOYER}>Employer</option>
                            <option value={ROLES.ADMIN}>Admin</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <select
                            className="form-select"
                            value={filters.action}
                            onChange={(e) => setFilters({ ...filters, action: e.target.value })}
                        >
                            <option value="">All Actions</option>
                            {Object.values(LOG_ACTIONS).map((action) => (
                                <option key={action} value={action}>
                                    {action}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2">
                        <input
                            type="date"
                            className="form-control"
                            value={filters.startDate}
                            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="date"
                            className="form-control"
                            value={filters.endDate}
                            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by User"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-primary w-100" onClick={handleFilter}>
                            Apply Filters
                        </button>
                    </div>
                </div>
            </section>

            {/* Logs Table Section */}
            <section>
                <h2>Log Details</h2>
                <div className="card p-3">
                    {loading ? (
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                    <th>Details</th>
                                    <th>Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map((log) => (
                                    <tr key={log._id}>
                                        <td>{log.user_email}</td>
                                        <td>{log.role}</td>
                                        <td>{log.action}</td>
                                        <td>
                                            {!log.details ? (
                                                <i>None</i>
                                            ) : typeof log.details === "object" ? (
                                                <ul>
                                                    {Object.entries(log.details).map(([key, value]) => (
                                                        <li key={key}>
                                                            <strong>{key}:</strong> {String(value)}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <span>{String(log.details)}</span>
                                            )}
                                        </td>
                                        <td>{new Date(log.timestamp).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>
        </div>
    );
};

export default AdminDashboard;

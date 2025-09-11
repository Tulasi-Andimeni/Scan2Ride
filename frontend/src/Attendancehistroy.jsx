import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Attendancehistroy.css";
import { BASE_URL } from "./config";

const AttendanceHistory = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/attendance?date=${date}`);
        setRecords(res.data);
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };

    fetchRecords();
  }, [date]);

  return (
    <div className="history-container">
      <h2 className="title">Attendance History</h2>
      <input
        type="date"
        className="date-input"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <table className="history-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Student ID</th>
            <th>Branch</th>
            <th>Bus No.</th>
            <th>Check-in</th>
            <th>Check-out</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, idx) => (
            <tr key={idx}>
              <td>{record.name}</td>
              <td>{record.studentid}</td>
              <td>{record.branch}</td>
              <td>{record.busNumber}</td>
              <td>{record.checkInTime ? new Date(record.checkInTime).toLocaleTimeString() : "—"}</td>
              <td>{record.checkOutTime ? new Date(record.checkOutTime).toLocaleTimeString() : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceHistory;







import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import "./homedata.css";
import BarChart from "../pages/Barchart";

const socket = io("http://localhost:5000"); // your backend server

function Homedata() {
  const [summary, setSummary] = useState({
    presentStudents: 0,
    totalStudents: 0,
    activeBuses: 0,
    totalBuses: 0,
  });
  const [lastScanned, setLastScanned] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const [attendanceRes, studentsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/attendance/summary"),
          axios.get("http://localhost:5000/api/students"),
        ]);

        const summaryData = attendanceRes.data;
        const students = studentsRes.data;

        const presentStudents = summaryData.reduce((sum, b) => sum + b.count, 0);
        const uniqueBuses = [...new Set(students.map(s => s.busNumber))];
        const activeBuses = summaryData.length;

        setSummary({
          presentStudents,
          totalStudents: students.length,
          activeBuses,
          totalBuses: uniqueBuses.length,
        });
      } catch (err) {
        console.error("❌ Failed to fetch summary data:", err);
      }
    };

    fetchSummary();

    socket.on("attendance-updated", (data) => {
      fetchSummary();
      setLastScanned(data);
    });

    return () => socket.disconnect();
  }, []);

  const { presentStudents, totalStudents, activeBuses, totalBuses } = summary;
  const attendancePercent = totalStudents > 0 ? Math.round((presentStudents / totalStudents) * 100) : 0;
  const busPercent = totalBuses > 0 ? Math.round((activeBuses / totalBuses) * 100) : 0;

  return (
    <div className="homedata-background">
      <div className="homedata-top-box">

        {/* Live Attendance Box */}
        <div className="homedata-box1">
          <div className="homdata-box1-matter">
            <div className="dot"></div>
            <Link to='/home/LiveAttendance'><h2>Live Attendance</h2></Link>
            <h1>{attendancePercent}%</h1>
            <p>{presentStudents} of {totalStudents} Students</p>
          </div>
          <div className="homdata-box1-circle">
            <div className="homedata-circle-icon1">
              <i className="fa-solid fa-circle-check"></i>
            </div>
          </div>
        </div>

        {/* Live Buses Box */}
        <div className="homedata-box1">
          <div className="homdata-box2-matter">
            <div className="dot"></div>
            <Link to='/home/buslist'><h2>Live Buses</h2></Link>
            <h1>{busPercent}%</h1>
            <p>{activeBuses} of {totalBuses} Buses Active</p>
          </div>
          <div className="homedata-box2-circle">
            <div className="homedata-circle-icon2">
              <i className="fa-solid fa-bus"></i>
            </div>
          </div>
        </div>

        {/* Scanner Status */}
        <div className="homedata-box1">
          <div className="homdata-box3-matter">
            <div className="dot"></div>
            <Link to='/scanpage'><h2>Live Scanner</h2></Link>
            <h1>{lastScanned ? lastScanned.status : "Awaiting"}</h1>
            <p>Last scanned: {lastScanned ? lastScanned.time : "--"}</p>
          </div>
          <div className="homedata-box3-circle">
            <div className="homedata-circle-icon3">
              <i className="fa-solid fa-qrcode"></i>
            </div>
          </div>
        </div>

      </div>

      {/* Bar Chart Section */}
      <div className="homedata-last-box">
        <div className="homedata-lastbox-middle">
          <BarChart />
        </div>
      </div>
    </div>
  );
}

export default Homedata;

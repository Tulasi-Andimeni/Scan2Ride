import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend
} from "recharts";
import { FaHourglassHalf } from "react-icons/fa";
import "./Side.css";

// Sample Data
const dataBar = [
  { name: "Mon", attendance: 80 },
  { name: "Tue", attendance: 75 },
  { name: "Wed", attendance: 90 },
  { name: "Thu", attendance: 70 },
  { name: "Fri", attendance: 85 },
];

// 100 Buses Data
// const studentBusData = Array.from({ length: 15 }, (_, i) => ({
//   bus: `Bus ${i + 1}`,
//   students: Math.floor(Math.random() * 50 + 1),
// }));

const busNumbers = [201, 203, 205, 207, 209, 211, 213, 215, 217, 219, 221, 223, 225, 227, 229];

const studentBusData = busNumbers.map((num) => ({
  bus: ` ${num}`,
  students: Math.floor(Math.random() * 50 + 1),
}));


const dataPie = [
  { name: "Occupied", value: 34 },
  { name: "Available", value: 11 },
];

const COLORS = ["#FFDC52", "#efe5d8"];

const dataLine = [
  { day: "Mon", attendance: 80 },
  { day: "Tue", attendance: 75 },
  { day: "Wed", attendance: 90 },
  { day: "Thu", attendance: 70 },
  { day: "Fri", attendance: 85 },
];


const Side = () => {
  return (
    <div className="side">
      <div className="side-sub">
        <div className="side-sub1">Scan2Ride</div>
        <div className="side-sub6">
      <div className="side-sub2"></div>
      <p>David Mallis</p>
      </div>
        <div className="side-sub3">
          <div className="side-sub4"><i className="fa-solid fa-house"></i></div>
          <div className="side-sub5">Home</div>
        </div>

        <div className="side-sub3">
          <div className="side-sub4"><i className="fa-solid fa-qrcode"></i></div>
          <div className="side-sub5">ScanQR</div>
        </div>

        <div className="side-sub3">
          <div className="side-sub4"><i className="fa-solid fa-users"></i></div>
          <div className="side-sub5">Students</div>
        </div>

        <div className="side-sub3">
          <div className="side-sub4"><i className="fa-solid fa-truck"></i></div>
          <div className="side-sub5">Buses</div>
        </div>

        <div className="side-sub3">
          <div className="side-sub4"><i className="fa-solid fa-id-card"></i></div>
          <div className="side-sub5">Drivers</div>
        </div>

        <div className="side-sub3">
          <div className="side-sub4"><i className="fa-solid fa-bars"></i></div>
          <div className="side-sub5">Reports</div>
        </div>

        <div className="side-sub3">
          <div className="side-sub4"><i className="fa-solid fa-gears"></i></div>
          <div className="side-sub5">Settings</div>
        </div>

        <div className="side-sub7">
           <div className="side-sub8">
          <div className="side-sub4"><i class="fa-solid fa-circle-info"></i></div>
          <div className="side-sub5">Help</div>
        </div>
        <div className="side-sub8">
          <div className="side-sub4"><i className="fa-solid fa-arrow-right-from-bracket"></i></div>
          <div className="side-sub5">Logout</div>
        </div>
        </div>
      </div>

        <div className="dash">
        <div className="dash-sub1">
          <div className="dash1-sub1">
            <div className="dash1-sub4">
              <i class="fa-solid fa-circle-check"></i>
            </div>
            <h2>Live Attendence</h2>
            <h1>82%</h1>
            <p>34 of 45 Students</p>
          </div>
          <div className="dash1-sub2">
            <div className="dash1-sub5">
              <i class="fa-solid fa-bus"></i>
            </div>
            <h2>Live Buses</h2>
            <h1>82%</h1>
            <p>34 of 45 Students</p>
          </div>
          <div className="dash1-sub3">
            <div className="dash1-sub6">
              <i class="fa-solid fa-qrcode"></i>
            </div>
            <h2>Scanner</h2>
            <h1>Awaiting Scan</h1>
            <p>Last Scanned at: 10:32 AM</p>
          </div>
        </div>
<div style={{
  width: "90%",
  maxHeight: 400,
  backgroundColor: "white",
  padding: "30px",
  position: "relative",
  left: "2.5%",
  top: "-3%",
  // borderRadius: "10px",
  overflowX: "hidden",
  overflowY: "hidden",
  boxShadow: "3px 3px 16px 0px rgba(66, 68, 90, 1)"
}}>
  <h3 style={{ color: "#1C1127", textAlign: "center", marginBottom: "10px",fontSize: "30px",}}>
    Students Per Bus
  </h3>
  <div style={{ width: "100%" }}>
    <ResponsiveContainer width="100%" height={310}>
      <BarChart data={studentBusData}>
        <XAxis dataKey="bus" stroke="#1C1127" />
        <YAxis stroke="#1C1127" />
        <Tooltip />
        <Bar dataKey="students" fill="#ff8100" />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>


        </div>
    </div>
  );
};

export default Side;

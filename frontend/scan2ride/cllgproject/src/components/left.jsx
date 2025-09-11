import React from "react";
import "./Left.css";
import { Outlet } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend
} from "recharts";
import { FaHourglassHalf } from "react-icons/fa";
import "./Side.css";

const dataBar = [
  { name: "Mon", attendance: 80 },
  { name: "Tue", attendance: 75 },
  { name: "Wed", attendance: 90 },
  { name: "Thu", attendance: 70 },
  { name: "Fri", attendance: 85 },
];

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

const Left=()=>{
    return(
        <>
        <div className="left">
         <div className="nav2">
          <div className="nav2-sub3">
            <i className="fa-solid fa-house"></i>
          </div>
          <div className="nav2-sub1">
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="nav2-sub1">
            <i className="fa-solid fa-message"></i>
          </div>
          <div className="nav2-sub1">
            <i className="fa-solid fa-bell"></i>
          </div>
          <div className="nav2-sub1">
            <i className="fa-solid fa-gears"></i>
          </div>
           <div className="nav2-sub2">
            <i class="fa-solid fa-circle-info"></i>
          </div>
          <div className="nav2-sub2">
            <i className="fa-solid fa-right-from-bracket"></i>
          </div> 

          <div className="ddash">
                  <div className="dash-ssub1">
                    <div className="dash1-ssub1">
                      <div className="dash1-ssub4">
                        <i class="fa-solid fa-circle-check"></i>
                      </div>
                      <h2>Live Attendence</h2>
                      <h1>82%</h1>
                      <p>34 of 45 Students</p>
                    </div>
                    <div className="dash1-ssub2">
                      <div className="dash1-ssub5">
                        <i class="fa-solid fa-bus"></i>
                      </div>
                      <h2>Live Buses</h2>
                      <h1>82%</h1>
                      <p>34 of 45 Students</p>
                    </div>
                    <div className="dash1-ssub3">
                      <div className="dash1-ssub6">
                        <i class="fa-solid fa-qrcode"></i>
                      </div>
                      <h2>Scanner</h2>
                      <h1>Awaiting Scan</h1>
                      <p>Last Scanned at: 10:32 AM</p>
                    </div>
                  </div>
          <div style={{
            width: "90.5%",
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
          <Outlet/>
        </div>
        </div>
        </>
    )
}
export default Left;

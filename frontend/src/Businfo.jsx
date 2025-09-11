// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import styles from "./styles/Businfo.module.css";
// import { io } from "socket.io-client";

// // ⚡ Initialize socket (outside the component to avoid re-initialization)
// const socket = io("http://localhost:5000");

// const Businfo = () => {
//   const { busNumber } = useParams();
//   const [busData, setBusData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selected, setSelected] = useState(null);

//   const closeModal = () => setSelected(null);

//   const formatTime = (timeString) => {
//     if (!timeString) return "-";
//     const date = new Date(timeString);
//     return date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const fetchBusData = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`http://localhost:5000/api/attendance/bus-students/${busNumber}`);
//       setBusData(response.data);
//       setLoading(false);
//     } catch (err) {
//       setError("Error fetching bus data");
//       setLoading(false);
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchBusData();

//     // ✅ Listen to real-time updates
//     socket.on("attendance-updated", (data) => {
//       if (data?.student?.busNumber === busNumber) {
//         fetchBusData(); // Update only if the update is for this bus
//       }
//     });

//     // Cleanup on unmount
//     return () => {
//       socket.off("attendance-updated");
//     };
//   }, [busNumber]);

//   if (loading) {
//     return <div className={styles.businfoMain}>Loading bus information...</div>;
//   }

//   if (error) {
//     return <div className={styles.businfoMain}>{error}</div>;
//   }





//   return (
//     <div className={styles.businfoMain}>
//       <div className={styles.buspageMainbox}>
//         <div className={styles.buspageTopbox}>
//           <div className={styles.buspageTopboxOne}>
//             <div className={styles.buspageOneTop}>{busData?.busNumber || "---"}</div>
//             <div className={styles.buspageOneDown}><i className="fa-solid fa-bus"></i></div>
//           </div>

//           <div className={styles.buspageTopboxThird}>
//             <div className={styles.buspageThirdPhoto}>
//               <div className={styles.buspagePhotoBox}>
//                 {busData?.driverImage ? (
//                   <img src={`http://localhost:5000${busData.driverImage}`} alt="Driver" className={styles.driverImg} />
//                 ) : <div className={styles.noImg}>No Image</div>}
//               </div>
//             </div>
//             <div className={styles.buspageThirdRight}>
//               <div className={styles.buspageRightBox}>{busData?.driver || "Driver not available"}</div>
//               <div className={styles.buspageRightBox}>{busData?.driverPhone || "---"}</div>
//               <div className={styles.buspageRightBox}>{busData?.busNumber || "---"}</div>
//             </div>
//           </div>

//           <div className={styles.buspageTopboxTwo}>
//             <div className={styles.buspageTwoRight}>
//               <div className={styles.buspageStatus}>Today :</div>
//               <div className={styles.buspageDay}>{new Date().toLocaleDateString("en-US", { weekday: "long" })}</div>
//               <div className={styles.buspageDate}>{new Date().toLocaleDateString("en-US")}</div>
//             </div>
//             <div className={styles.buspageTwoLeft}>
//               <div className={styles.buspageLeftCircle}><i className="fa-solid fa-calendar-days"></i></div>
//             </div>
//           </div>
//         </div>

//         <div className={styles.buspageLastbox}>
//           <div className={styles.buspageLastTitle1}>STUDENT DETAILS :</div>
//           <div className={styles.buspageLastTable}>
//             <table>
//               <thead>
//                 <tr>
//                   <th>S.No</th>
//                   <th>Student ID</th>
//                   <th>Name</th>
//                   <th>Branch</th>
//                   <th>Check-in</th>
//                   <th>Checkout</th>
//                   <th>Details</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {busData?.students?.length > 0 ? (
//                   busData.students.map((student, index) => (
//                     <tr key={student._id}>
//                       <td>{index + 1}</td>
//                       <td>{student.studentid}</td>
//                       <td>{student.name}</td>
//                       <td>{student.branch}</td>
//                       <td title={formatTime(student.checkInTime)}>{student.checkIn ? "✔" : "❌"}</td>
//                       <td title={formatTime(student.checkOutTime)}>{student.checkOut ? "✔" : "❌"}</td>
//                       <td>
//                         <button className={styles.viewBtn} onClick={() => setSelected(student)}>View</button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr><td colSpan="7">No students found for this bus</td></tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {selected && (
//         <div className={styles.modalOverlay} onClick={closeModal}>
//           <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
//             <h3>{selected.name}</h3>
//             <p><strong>ID:</strong> {selected.studentid}</p>
//             <p><strong>Branch:</strong> {selected.branch}</p>
//             <p><strong>Bus No:</strong> {selected.busNumber}</p>
//             <p><strong>Check-in:</strong> {formatTime(selected.checkInTime)}</p>
//             <p><strong>Check-out:</strong> {formatTime(selected.checkOutTime)}</p>
//             <button className={styles.closeBtn} onClick={closeModal}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Businfo;




import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./styles/Businfo.module.css";
import { io } from "socket.io-client";
import { BASE_URL } from "./config"; // adjust path

// ⚡ Initialize socket once
const socket = io(BASE_URL);

const Businfo = () => {
  const { busNumber } = useParams();
  const [busData, setBusData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  const closeModal = () => setSelected(null);

  const formatTime = (timeString) => {
    if (!timeString) return "-";
    const date = new Date(timeString);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  const fetchBusData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/attendance/bus-students/${busNumber}`);
      setBusData(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching bus data");
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBusData();

    socket.on("attendance-updated", (data) => {
      if (data?.student?.busNumber === busNumber) {
        fetchBusData();
      }
    });

    return () => socket.off("attendance-updated");
  }, [busNumber]);

  if (loading) return <div className={styles.businfoMain}>Loading bus information...</div>;
  if (error) return <div className={styles.businfoMain}>{error}</div>;

  return (
    <div className={styles.businfoMain}>
      <div className={styles.buspageMainbox}>
        {/* Top Box */}
        <div className={styles.buspageTopbox}>
          <div className={styles.buspageTopboxOne}>
            <div className={styles.buspageOneTop}>{busData?.busNumber || "---"}</div>
            <div className={styles.buspageOneDown}><i className="fa-solid fa-bus"></i></div>
          </div>

          <div className={styles.buspageTopboxThird}>
            <div className={styles.buspageThirdPhoto}>
              <div className={styles.buspagePhotoBox}>
                {busData?.driverImage ? (
                  <img src={busData.driverImage.startsWith("http") ? busData.driverImage : `${BASE_URL}${busData.driverImage}`} alt="Driver" className={styles.driverImg} />
                ) : <div className={styles.noImg}>No Image</div>}
              </div>
            </div>
            <div className={styles.buspageThirdRight}>
              <div className={styles.buspageRightBox}>{busData?.driver || "Driver not available"}</div>
              <div className={styles.buspageRightBox}>{busData?.driverPhone || "---"}</div>
              <div className={styles.buspageRightBox}>{busData?.busNumber || "---"}</div>
            </div>
          </div>

          <div className={styles.buspageTopboxTwo}>
            <div className={styles.buspageTwoRight}>
              <div className={styles.buspageStatus}>Today :</div>
              <div className={styles.buspageDay}>{new Date().toLocaleDateString("en-US", { weekday: "long" })}</div>
              <div className={styles.buspageDate}>{new Date().toLocaleDateString("en-US")}</div>
            </div>
            <div className={styles.buspageTwoLeft}>
              <div className={styles.buspageLeftCircle}><i className="fa-solid fa-calendar-days"></i></div>
            </div>
          </div>
        </div>

        {/* Student Table */}
        <div className={styles.buspageLastbox}>
          <div className={styles.buspageLastTitle1}>STUDENT DETAILS :</div>
          <div className={styles.buspageLastTable}>
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Branch</th>
                  <th>Check-in</th>
                  <th>Checkout</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {busData?.students?.length > 0 ? (
                  busData.students.map((student, index) => (
                    <tr key={student._id}>
                      <td>{index + 1}</td>
                      <td>{student.studentid}</td>
                      <td>{student.name}</td>
                      <td>{student.branch}</td>
                      <td title={formatTime(student.checkInTime)}>{student.checkIn ? "✔" : "❌"}</td>
                      <td title={formatTime(student.checkOutTime)}>{student.checkOut ? "✔" : "❌"}</td>
                      <td><button className={styles.viewBtn} onClick={() => setSelected(student)}>View</button></td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="7">No students found for this bus</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3>{selected.name}</h3>
            <p><strong>ID:</strong> {selected.studentid}</p>
            <p><strong>Branch:</strong> {selected.branch}</p>
            <p><strong>Bus No:</strong> {selected.busNumber}</p>
            <p><strong>Check-in:</strong> {formatTime(selected.checkInTime)}</p>
            <p><strong>Check-out:</strong> {formatTime(selected.checkOutTime)}</p>
            <button className={styles.closeBtn} onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Businfo;

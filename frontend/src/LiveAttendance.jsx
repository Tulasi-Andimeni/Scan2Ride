// import React, { useState } from "react";
// import styles from "./styles/liveAttendance.module.css";


// const PAGE_SIZE = 5;

// const seedData = [
//   { id: 1, rollNo: "20231001", name: "Luffy", branch: "CSE", section: "A", timestamp: "10:15 AM", checkin: true, checkout: false },
//   { id: 2, rollNo: "20231002", name: "Roronoa Zoro", branch: "IT", section: "B", timestamp: "10:20 AM", checkin: true, checkout: false },
//   { id: 3, rollNo: "20231003", name: "Nami", branch: "ECE", section: "A", timestamp: "10:25 AM", checkin: true, checkout: false },
//   { id: 4, rollNo: "20231004", name: "Usop", branch: "MECH", section: "C", timestamp: "10:30 AM", checkin: true, checkout: true },
//   { id: 5, rollNo: "20231005", name: "Sanji", branch: "EEE", section: "B", timestamp: "10:35 AM", checkin: true, checkout: true },
//   { id: 6, rollNo: "20231006", name: "Chopper", branch: "CSE", section: "A", timestamp: "10:40 AM", checkin: true, checkout: false },
//   { id: 7, rollNo: "20231007", name: "Nico Robin", branch: "IT", section: "B", timestamp: "10:45 AM", checkin: true, checkout: false },
//   { id: 8, rollNo: "20231008", name: "Franky", branch: "ECE", section: "C", timestamp: "10:50 AM", checkin: true, checkout: true },
//   { id: 9, rollNo: "20231009", name: "Brook", branch: "MECH", section: "A", timestamp: "10:55 AM", checkin: true, checkout: true },
//   { id: 10, rollNo: "20231010", name: "Jinbe", branch: "EEE", section: "B", timestamp: "11:00 AM", checkin: true, checkout: false },
// ];

// const LiveAttendance = () => {
//   const [allRecords, setAllRecords] = useState(seedData);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [selected, setSelected] = useState(null);

//   const filtered = allRecords.filter((r) =>
//     Object.values(r).some((v) =>
//       v.toString().toLowerCase().includes(search.toLowerCase())
//     )
//   );
//   const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
//   const paginatedRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

//   const goToPage = (n) => setPage(n);
//   const closeModal = () => setSelected(null);

//   return (
//     <div className={styles.container}>
//       <div className={styles.contentWrapper}>
//         <h2 className={styles.heading}>Live Attendance</h2>

//         <input
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setPage(1);
//           }}
//           className={styles.searchInput}
//           placeholder="🔍 Search by name, ID, branch or section…"
//           type="text"
//         />

//         <div className={styles.tableWrapper}>
//           <table className={styles.table}>
//             <thead>
//               <tr className={styles.tableHeader}>
//                 <th className={styles.tableCell}>S.No</th>
//                 <th className={styles.tableCell}>Student ID</th>
//                 <th className={styles.tableCell}>Name</th>
//                 <th className={styles.tableCell}>Branch</th>
//                 <th className={styles.tableCell}>Section</th>
//                 <th className={styles.tableCell}>Time</th>
//                 <th className={styles.tableCell}>Check-in</th>
//                 <th className={styles.tableCell}>Checkout</th>
//                 <th className={styles.tableCell}>View</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedRows.length ? (
//                 paginatedRows.map((s, idx) => (
//                   <tr key={s.id} className={`${styles.tableRow} ${styles.rowAnim}`}>
//                     <td className={styles.tableCell}>{(page - 1) * PAGE_SIZE + idx + 1}</td>
//                     <td className={styles.tableCell}>{s.rollNo}</td>
//                     <td className={styles.tableCell}>{s.name}</td>
//                     <td className={styles.tableCell}>{s.branch}</td>
//                     <td className={styles.tableCell}>{s.section}</td>
//                     <td className={styles.tableCell}>{s.timestamp}</td>
//                     <td className={`${styles.tableCell} ${styles.checkin}`}>{s.checkin ? "✔️" : "-"}</td>
//                     <td className={`${styles.tableCell} ${styles.checkout}`}>{s.checkout ? "✔️" : "-"}</td>
//                     <td className={styles.tableCell}>
//                       <button className={styles.viewBtn} onClick={() => setSelected(s)}>
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="9" className={styles.noData}>No matching records</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination Controls */}
//         {pageCount > 1 && (
//           <div className={styles.pagination}>
//             <button onClick={() => goToPage(Math.max(1, page - 1))} disabled={page === 1}>
//               ‹ Prev
//             </button>
//             {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
//               <button
//                 key={n}
//                 onClick={() => goToPage(n)}
//                 className={n === page ? styles.activePage : ""}
//               >
//                 {n}
//               </button>
//             ))}
//             <button onClick={() => goToPage(Math.min(pageCount, page + 1))} disabled={page === pageCount}>
//               Next ›
//             </button>
//           </div>
//         )}

//         {/* Modal */}
//         {selected && (
//           <div className={styles.modalOverlay} onClick={closeModal}>
//             <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
//               <h3>{selected.name}</h3>
//               <p><strong>ID:</strong> {selected.rollNo}</p>
//               <p><strong>Branch:</strong> {selected.branch}</p>
//               <p><strong>Section:</strong> {selected.section}</p>
//               <p><strong>Time:</strong> {selected.timestamp}</p>
//               <p><strong>Check-in:</strong> {selected.checkin ? "Yes" : "No"}</p>
//               <p><strong>Checkout:</strong> {selected.checkout ? "Yes" : "No"}</p>
//               <button className={styles.closeBtn} onClick={closeModal}>Close</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LiveAttendance;



// import React, { useEffect, useState, useCallback } from "react";
// import io from "socket.io-client";
// import styles from "./styles/liveAttendance.module.css";

// // Establish Socket.IO connection outside the component to avoid re-creating on re-renders
// const socket = io("http://localhost:5000"); // Make sure this matches your backend URL

// const PAGE_SIZE = 5;

// const LiveAttendance = () => {
//   const [allRecords, setAllRecords] = useState([]);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [selected, setSelected] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Function to fetch today's attendance initially
//   const fetchTodayAttendance = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       // You need to fetch from your backend's attendance endpoint for today's data
//       const response = await fetch("http://localhost:5000/api/attendance/today");
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setAllRecords(data); // Set initial records from the API
//     } catch (err) {
//       console.error("Error fetching initial attendance:", err);
//       setError("Failed to load initial attendance data.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     // 1. Fetch initial attendance when the component mounts
//     fetchTodayAttendance();

//     // 2. Listen for real-time updates via Socket.IO
//     socket.on("attendance-updated", (data) => { // CHANGED EVENT NAME HERE
//       console.log("Socket.IO: Received new attendance update:", data);

//       // Update logic:
//       // If the student already exists for today (e.g., checking out), update their record.
//       // Otherwise, add the new record (e.g., new check-in).
//       setAllRecords((prevRecords) => {
//         const existingIndex = prevRecords.findIndex(
//           (record) => record.studentid === data.student.studentid && record.date === data.date
//         );

//         if (existingIndex > -1) {
//           // If record exists, update it (e.g., check-out time added)
//           const updatedRecords = [...prevRecords];
//           updatedRecords[existingIndex] = {
//             ...updatedRecords[existingIndex],
//             checkOutTime: data.checkOutTime ? new Date(data.checkOutTime) : updatedRecords[existingIndex].checkOutTime, // Update checkout time if present
//             status: data.status, // Update status too
//             time: data.time // Update display time
//           };
//           return updatedRecords;
//         } else {
//           // New check-in, add to the beginning of the list
//           return [{
//             _id: Date.now(), // Unique key for new entry (temp for display)
//             studentid: data.student.studentid,
//             name: data.student.name,
//             branch: data.student.branch,
//             busNumber: data.student.busNumber,
//             checkInTime: new Date(data.checkInTime || data.time), // Use current time or checkInTime
//             checkOutTime: null, // Initially null
//             date: new Date().toISOString().split("T")[0], // Today's date
//             status: data.status,
//             time: data.time // Current scan time
//           }, ...prevRecords];
//         }
//       });
//     });

//     socket.on("scan-error", (data) => {
//         console.error("Socket.IO: Received scan error:", data);
//         // You might want to display this error to the user in the UI
//         alert(`Scan Error: ${data.message} for Student ID: ${data.studentid}`);
//     });


//     // Cleanup function: disconnect socket when component unmounts
//     return () => {
//       socket.off("attendance-updated"); // Clean up specific listener
//       socket.off("scan-error");
//       socket.disconnect(); // Disconnect socket
//     };
//   }, [fetchTodayAttendance]); // Dependency array: run effect only when fetchTodayAttendance changes

//   const filtered = allRecords.filter((r) =>
//     Object.values(r).some((v) =>
//       v?.toString().toLowerCase().includes(search.toLowerCase())
//     )
//   );

//   const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
//   const paginatedRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

//   const goToPage = (n) => setPage(n);
//   const closeModal = () => setSelected(null);

//   // Helper to safely format time, handling potentially null dates
//   const formatTime = (time) => {
//     if (!time) return "—";
//     try {
//       // Ensure it's a Date object if it comes as a string from initial fetch
//       const dateObj = typeof time === 'string' ? new Date(time) : time;
//       return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     } catch (e) {
//       console.error("Error formatting time:", time, e);
//       return "Invalid Time";
//     }
//   };


//   return (
//     <div className={styles.container}>
//       <div className={styles.contentWrapper}>
//         <h2 className={styles.heading}>Live Attendance</h2>

//         <input
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setPage(1); // Reset page to 1 on new search
//           }}
//           className={styles.searchInput}
//           placeholder="🔍 Search by name, ID, branch or bus…"
//           type="text"
//         />

//         <div className={styles.tableWrapper}>
//           <table className={styles.table}>
//             <thead>
//               <tr className={styles.tableHeader}>
//                 <th className={styles.tableCell}>S.No</th>
//                 <th className={styles.tableCell}>Student ID</th>
//                 <th className={styles.tableCell}>Name</th>
//                 <th className={styles.tableCell}>Branch</th>
//                 <th className={styles.tableCell}>Bus No.</th>
//                 <th className={styles.tableCell}>Current Scan Time</th> {/* Changed label */}
//                 <th className={styles.tableCell}>Check-in</th>
//                 <th className={styles.tableCell}>Check-out</th>
//                 <th className={styles.tableCell}>View</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="9" className={styles.noData}>Loading attendance...</td>
//                 </tr>
//               ) : error ? (
//                 <tr>
//                   <td colSpan="9" className={styles.noData}>{error}</td>
//                 </tr>
//               ) : paginatedRows.length ? (
//                 paginatedRows.map((s, idx) => (
//                   <tr key={s._id || s.studentid + s.date} className={`${styles.tableRow} ${styles.rowAnim}`}> {/* Added fallback key */}
//                     <td className={styles.tableCell}>{(page - 1) * PAGE_SIZE + idx + 1}</td>
//                     <td className={styles.tableCell}>{s.studentid}</td>
//                     <td className={styles.tableCell}>{s.name}</td>
//                     <td className={styles.tableCell}>{s.branch}</td>
//                     <td className={styles.tableCell}>{s.busNumber}</td>
//                     <td className={styles.tableCell}>
//                        {s.time} {/* Display the 'time' sent from backend for current scan */}
//                     </td>
//                     <td className={`${styles.tableCell} ${s.checkInTime ? styles.checkedIn : ''}`}>
//                         {s.checkInTime ? formatTime(s.checkInTime) : "—"}
//                     </td>
//                     <td className={`${styles.tableCell} ${s.checkOutTime ? styles.checkedOut : ''}`}>
//                         {s.checkOutTime ? formatTime(s.checkOutTime) : "—"}
//                     </td>
//                     <td className={styles.tableCell}>
//                       <button className={styles.viewBtn} onClick={() => setSelected(s)}>
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="9" className={styles.noData}>No matching records</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {pageCount > 1 && (
//           <div className={styles.pagination}>
//             <button onClick={() => goToPage(Math.max(1, page - 1))} disabled={page === 1}>
//               ‹ Prev
//             </button>
//             {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
//               <button
//                 key={n}
//                 onClick={() => goToPage(n)}
//                 className={n === page ? styles.activePage : ""}
//               >
//                 {n}
//               </button>
//             ))}
//             <button onClick={() => goToPage(Math.min(pageCount, page + 1))} disabled={page === pageCount}>
//               Next ›
//             </button>
//           </div>
//         )}

//         {/* Modal */}
//         {selected && (
//           <div className={styles.modalOverlay} onClick={closeModal}>
//             <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
//               <h3>{selected.name}</h3>
//               <p><strong>ID:</strong> {selected.studentid}</p>
//               <p><strong>Branch:</strong> {selected.branch}</p>
//               <p><strong>Bus No:</strong> {selected.busNumber}</p>
//               <p><strong>Check-in Time:</strong> {selected.checkInTime ? formatTime(selected.checkInTime) : "—"}</p>
//               <p><strong>Check-out Time:</strong> {selected.checkOutTime ? formatTime(selected.checkOutTime) : "—"}</p>
//               <button className={styles.closeBtn} onClick={closeModal}>Close</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LiveAttendance;






import React, { useEffect, useState, useCallback } from "react";
import io from "socket.io-client";
import styles from "./styles/liveattendance.module.css";

const socket = io("http://localhost:5000");

const PAGE_SIZE = 7;

const LiveAttendance = () => {
  const [allRecords, setAllRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodayAttendance = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/attendance/today");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setAllRecords(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load attendance.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodayAttendance();

    socket.on("attendance-updated", (data) => {
      setAllRecords((prev) => {
        const idx = prev.findIndex(
          (r) => r.studentid === data.student.studentid && r.date === data.date
        );
        if (idx > -1) {
          const updated = [...prev];
          updated[idx] = {
            ...updated[idx],
            checkOutTime: data.checkOutTime ? new Date(data.checkOutTime) : updated[idx].checkOutTime,
            status: data.status,
            time: data.time,
          };
          return updated;
        } else {
          return [
            {
              _id: Date.now(),
              studentid: data.student.studentid,
              name: data.student.name,
              branch: data.student.branch,
              busNumber: data.student.busNumber,
              checkInTime: new Date(data.checkInTime || data.time),
              checkOutTime: null,
              date: new Date().toISOString().split("T")[0],
              status: data.status,
              time: data.time,
            },
            ...prev,
          ];
        }
      });
    });

    socket.on("scan-error", (data) => {
      alert(`Scan Error: ${data.message} (ID: ${data.studentid})`);
    });

    return () => {
      socket.off("attendance-updated");
      socket.off("scan-error");
      socket.disconnect();
    };
  }, [fetchTodayAttendance]);

  const filtered = allRecords.filter((r) =>
    Object.values(r).some((v) =>
      v?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const paginatedRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goToPage = (n) => setPage(n);
  const closeModal = () => setSelected(null);

  const formatTime = (time) => {
    if (!time) return "—";
    const dateObj = typeof time === "string" ? new Date(time) : time;
    return dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <h2 className={styles.heading}>Live Attendance</h2>
         <div className={styles.headingLine}></div>
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className={styles.searchInput}
          placeholder="🔍 Search by name, ID, branch or bus…"
          type="text"
        />

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <th>S.No</th>
                <th>ID</th>
                <th>Name</th>
                <th>Branch</th>
                <th>Bus No.</th>
                <th>Scan Time</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
  {loading ? (
    <tr>
      <td colSpan="9" className={styles.noData}>Loading attendance...</td>
    </tr>
  ) : error ? (
    <tr>
      <td colSpan="9" className={styles.noData}>{error}</td>
    </tr>
  ) : paginatedRows.length ? (
    paginatedRows.map((s, idx) => (
      <tr key={s._id || s.studentid + s.date} className={styles.rowAnim}>
        <td>{(page - 1) * PAGE_SIZE + idx + 1}</td>
        <td> {s.studentid}</td>
        <td>{s.name}</td>
        <td>{s.branch}</td>
        <td>{s.busNumber}</td>
        <td>{s.time}</td>
        <td className={styles.checkin}>{formatTime(s.checkInTime)}</td>
        <td className={styles.checkout}>{formatTime(s.checkOutTime)}</td>
        <td>
          <button className={styles.viewBtn} onClick={() => setSelected(s)}>
            View
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="9" className={styles.noData}>No matching records</td>
    </tr>
  )}
</tbody>

          </table>
        </div>

        {pageCount > 1 && (
          <div className={styles.pagination}>
            <button onClick={() => goToPage(Math.max(1, page - 1))} disabled={page === 1}>
              ‹ Prev
            </button>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => goToPage(n)}
                className={n === page ? styles.activePage : ""}
              >
                {n}
              </button>
            ))}
            <button onClick={() => goToPage(Math.min(pageCount, page + 1))} disabled={page === pageCount}>
              Next ›
            </button>
          </div>
        )}

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
    </div>
  );
};

export default LiveAttendance;

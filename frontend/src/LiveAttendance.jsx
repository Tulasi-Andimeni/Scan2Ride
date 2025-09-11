
import React, { useEffect, useState, useCallback } from "react";
import io from "socket.io-client";
import styles from "./styles/liveattendance.module.css";
import { BASE_URL } from "./config";

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
      const response = await fetch(`${BASE_URL}/api/attendance/today`);
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

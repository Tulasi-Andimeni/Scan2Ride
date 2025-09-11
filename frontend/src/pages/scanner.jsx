import React, { useState } from "react";
import BarcodeScanner from "../components/barcodescanner";
import axios from "axios";
import "./Scanpage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../config";

const ScanPage = () => {
  const [scanResult, setScanResult] = useState(null);

  const handleScan = async (id) => {
    const trimmedId = id.trim();

    if (!trimmedId) {
      toast.warning("Invalid scan detected. Please try again.");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/student/scan`, {
        studentid: trimmedId,
      });

      setScanResult(res.data);
      toast.success(res.data.message || "Scan successful!");

      // Play beep sound
      const audio = document.getElementById("beep");
      if (audio) audio.play();

      // Clear result after 5s
      setTimeout(() => setScanResult(null), 5000);
    } catch (err) {
      const message = err?.response?.data?.message || "Scan failed. Try again.";
      toast.error(message);
      console.error("❌ Scan error:", err);
    }
  };

  return (
    <div className="container">
      <div className="scanner-card">
        <div className="scanner-header">
          <h1 className="scanner-title">Scan2Ride Bar Code</h1>
        </div>
        <div className="scanner-subheader">
          <p>Scan the barcode to board your bus</p>
        </div>

        <BarcodeScanner onScan={handleScan} />

        {scanResult && (
          <div className="scan-result">
            <h3>Status: {scanResult.status}</h3>
            <p><strong>Name:</strong> {scanResult.student.name}</p>
            <p><strong>Branch:</strong> {scanResult.student.branch}</p>
            <p><strong>Student ID:</strong> {scanResult.student.studentid}</p>
            <p><strong>Time:</strong> {scanResult.time}</p>
          </div>
        )}
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />
      <audio id="beep" src="/beep.mp3" preload="auto"></audio>
    </div>
  );
};

export default ScanPage;

// import React, { useState } from "react";
// import BarcodeScanner from "../components/barcodescanner"; // Adjust path if needed

// const ScanPage = () => {
//   const [scannedData, setScannedData] = useState("");

//   return (
//     <div style={{ textAlign: "center", marginTop: "20px" }}>
//       <BarcodeScanner onScan={(data) => setScannedData(data)} />
//       <h3>Scanned Roll Number:</h3>
//       <p style={{ fontSize: "20px", color: "green" }}>{scannedData}</p>
//     </div>
//   );
// };

// export default ScanPage;


// import React, { useState } from "react";
// import BarcodeScanner from "../components/barcodescanner";
// import axios from "axios";

// const ScanPage = ({ onScanSuccess }) => {
//   const [scannedId, setScannedId] = useState("");
//   const [scanResult, setScanResult] = useState(null);

//   const handleScan = async (id) => {
//     setScannedId(id);
//     try {
//       const res = await axios.post("http://localhost:5000/api/scan", { studentid: id });
//       setScanResult(res.data);
//       console.log("Scanned ID:", id);
//       if (onScanSuccess) {
//         onScanSuccess(res.data); // Send to parent
//       }
//     } catch (err) {
//       console.error("Scan failed", err);
//     }
//   };

//   return (
//     <div>
//       <h2>Scan Student ID</h2>
//       <BarcodeScanner onScan={handleScan} />
//       {scanResult && (
//         <div>
//           <h3>Status: {scanResult.status}</h3>
//           <p>Name: {scanResult.student.name}</p>
//           <p>Branch: {scanResult.student.branch}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ScanPage;




// // src/pages/ScanPage.jsx
// import React, { useState } from "react";
// import BarcodeScanner from "../components/barcodescanner";
// import axios from "axios";

// const ScanPage = () => {
//   const [scanResult, setScanResult] = useState(null);

//   const handleScan = async (id) => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/student/scan", {
//         studentid: id,
//       });
//       setScanResult(res.data);
//     } catch (err) {
//       console.error("Scan failed", err);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>🎯 Scan Student ID</h2>
//       <BarcodeScanner onScan={handleScan} />

//       {scanResult && (
//         <div style={{ marginTop: "20px" }}>
//           <h3>Status: {scanResult.status}</h3>
//           <p><strong>Name:</strong> {scanResult.student.name}</p>
//           <p><strong>Branch:</strong> {scanResult.student.branch}</p>
//           <p><strong>Student Id:</strong> {scanResult.student.studentid}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ScanPage;



// // src/pages/ScanPage.jsx
// import React, { useState } from "react";
// import BarcodeScanner from "../components/barcodescanner";
// import axios from "axios";
// import "./Scanpage.css";
// const ScanPage = () => {
//   const [scanResult, setScanResult] = useState(null);

//   const handleScan = async (id) => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/student/scan", {
//         studentid: id,
//       });
//       setScanResult(res.data);
//     } catch (err) {
//       console.error("Scan failed", err);
//     }
//   };

//   return (
//     <div className="container">
//          <div className="scanner-card">
//              <div className="scanner-header">
//           <h1 className="scanner-title">Scan2Ride Bar Code</h1>
//         </div>
//          <div className="scanner-subheader">
//           <p>Scan the Bar code to board your bus Scan the Bar code to board your bus</p>
//         </div>
//     <div>
//       <BarcodeScanner onScan={handleScan} />
//       {scanResult && (
//         <div style={{ marginTop: "0px"}}>
//           <h3>Status: {scanResult.status}</h3>
//           <p><strong>Name:</strong> {scanResult.student.name}</p>
//           <p><strong>Branch:</strong> {scanResult.student.branch}</p>
//           <p><strong>Student Id:</strong> {scanResult.student.studentid}</p>
//         </div>
        
//       )}
//         {/* <div className="scanner-result">Clear Result</div> */}
//     </div>
//     </div>
//     </div>
//   );
// };

// export default ScanPage;








// // src/pages/ScanPage.jsx
// import React, { useState } from "react";
// import BarcodeScanner from "../components/BarcodeScanner";
// import axios from "axios";
// import "./Scanpage.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ScanPage = () => {
//   const [scanResult, setScanResult] = useState(null);

//   const handleScan = async (id) => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/student/scan", {
//         studentid: id,
//       });
//       setScanResult(res.data);
//       toast.success(res.data.message || "Scan successful!");

//       // Play sound
//       const audio = document.getElementById("beep");
//       if (audio) audio.play();

//       // Clear result after 5 seconds
//       setTimeout(() => setScanResult(null), 5000);
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Scan failed");
//       console.error("Scan failed", err);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="scanner-card">
//         <div className="scanner-header">
//           <h1 className="scanner-title">Scan2Ride Bar Code</h1>
//         </div>
//         <div className="scanner-subheader">
//           <p>Scan the Bar code to board your bus</p>
//         </div>

//         <BarcodeScanner onScan={handleScan} />

//         {scanResult && (
//           <div className="scan-result">
//             <h3>Status: {scanResult.status}</h3>
//             <p><strong>Name:</strong> {scanResult.student.name}</p>
//             <p><strong>Branch:</strong> {scanResult.student.branch}</p>
//             <p><strong>Student ID:</strong> {scanResult.student.studentid}</p>
//             <p><strong>Time:</strong> {scanResult.time}</p>
//           </div>
//         )}
//       </div>

//       {/* Toast & Sound */}
//       <ToastContainer position="bottom-right" autoClose={3000} />
//       <audio id="beep" src="/beep.mp3" preload="auto"></audio>
//     </div>
//   );
// };

// export default ScanPage;





// import React, { useState } from "react";
// import BarcodeScanner from "../components/barcodescanner";
// import axios from "axios";
// import "./Scanpage.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ScanPage = () => {
//   const [scanResult, setScanResult] = useState(null);

//   const handleScan = async (id) => {
//     try {
//       const trimmedId = id.trim();
//       const res = await axios.post("http://localhost:5000/api/student/scan", {
//         studentid: trimmedId,
//       });
//       setScanResult(res.data);
//       toast.success(res.data.message || "Scan successful!");

//       const audio = document.getElementById("beep");
//       if (audio) audio.play();

//       setTimeout(() => setScanResult(null), 5000);
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Scan failed");
//       console.error("Scan failed", err);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="scanner-card">
//         <div className="scanner-header">
//           <h1 className="scanner-title">Scan2Ride Bar Code</h1>
//         </div>
//         <div className="scanner-subheader">
//           <p>Scan the Bar code to board your bus</p>
//         </div>

//         <BarcodeScanner onScan={handleScan} />

//         {scanResult && (
//           <div className="scan-result">
//             <h3>Status: {scanResult.status}</h3>
//             <p><strong>Name:</strong> {scanResult.student.name}</p>
//             <p><strong>Branch:</strong> {scanResult.student.branch}</p>
//             <p><strong>Student ID:</strong> {scanResult.student.studentid}</p>
//             <p><strong>Time:</strong> {scanResult.time}</p>
//           </div>
//         )}
//       </div>

//       <ToastContainer position="bottom-right" autoClose={3000} />
//       <audio id="beep" src="/beep.mp3" preload="auto"></audio>
//     </div>
//   );
// };

// export default ScanPage;






import React, { useState } from "react";
import BarcodeScanner from "../components/barcodescanner";
import axios from "axios";
import "./Scanpage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ScanPage = () => {
  const [scanResult, setScanResult] = useState(null);

  const handleScan = async (id) => {
    const trimmedId = id.trim();

    if (!trimmedId) {
      toast.warning("Invalid scan detected. Please try again.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/student/scan", {
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

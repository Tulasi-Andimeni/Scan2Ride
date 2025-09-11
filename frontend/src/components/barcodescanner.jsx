// import React, { useEffect } from "react";
// import { BrowserMultiFormatReader } from "@zxing/library";

// const BarcodeScanner = ({ onScan }) => {
//   useEffect(() => {
//     const codeReader = new BrowserMultiFormatReader();
//     const videoElement = document.getElementById("video");

//     codeReader
//       .listVideoInputDevices()
//       .then((videoInputDevices) => {
//         const selectedDeviceId = videoInputDevices[0].deviceId;

//         codeReader.decodeFromVideoDevice(selectedDeviceId, videoElement, (result, err) => {
//           if (result) {
//             onScan(result.getText()); // Pass scanned text to parent
//           }
//         });
//       })
//       .catch((err) => console.error("Camera error:", err));

//     return () => {
//       codeReader.reset(); // Stop the scanner when component unmounts
//     };
//   }, [onScan]);

//   return (
//     <div>
//       <h2>Scan Your ID Card</h2>
//       <video id="video" width="300" height="200" style={{ border: "1px solid black" }} />
//     </div>
//   );
// };

// export default BarcodeScanner;



// import React, { useEffect } from "react";
// import { BrowserMultiFormatReader } from "@zxing/library";

// const BarcodeScanner = ({ onScan }) => {
//   useEffect(() => {
//     const codeReader = new BrowserMultiFormatReader();
//     const videoElement = document.getElementById("video");

//     codeReader.decodeFromVideoDevice(null, "video", (result, err) => {
//       if (result) {
//         const scannedValue = result.getText();
//         if (onScan) onScan(scannedValue);
//       }
//     });

//     return () => codeReader.reset();
//   }, [onScan]);

//   return (
//     <div>
//       <video id="video" width="300" height="200" />
//     </div>
//   );
// };

// export default BarcodeScanner;



// // src/components/BarcodeScanner.jsx
// import React, { useEffect, useRef } from "react";
// import { BrowserMultiFormatReader } from "@zxing/library";
// import './barcodescanner.css';

// const BarcodeScanner = ({ onScan }) => {
//   const lastScanned = useRef("");
//   const scanning = useRef(false);

//   useEffect(() => {
//     const codeReader = new BrowserMultiFormatReader();
//     const videoElement = document.getElementById("video");

//     // Start decoding from video device
//     codeReader.decodeFromVideoDevice(null, "video", (result, err) => {
//       if (result && !scanning.current) {
//         const scannedValue = result.getText();

//         // Prevent multiple triggers of same scan
//         if (scannedValue && scannedValue !== lastScanned.current) {
//           lastScanned.current = scannedValue;
//           scanning.current = true;

//           if (onScan) onScan(scannedValue);

//           // Reset scanning flag after 2 seconds
//           setTimeout(() => {
//             scanning.current = false;
//           }, 2000);
//         }
//       }
//     });

//     return () => {
//       codeReader.reset(); // Clean up camera
//     };
//   }, [onScan]);

//   return (
//     <div>
//       {/* <video id="video" width="300" height="200" /> */}
//       {/* <video id="video" className="video-feed" autoPlay playsInline /> */}
//        <div className="video-frame">
//         <video id="video" width="300" height="200" />
//       </div>


//     </div>
//   );
// };

// export default BarcodeScanner;




// // src/components/BarcodeScanner.jsx
// import React, { useEffect, useRef } from "react";
// import { BrowserMultiFormatReader } from "@zxing/library";
// import './barcodescanner.css';

// const BarcodeScanner = ({ onScan }) => {
//   const lastScanned = useRef("");
//   const scanning = useRef(false);

//   useEffect(() => {
//     const codeReader = new BrowserMultiFormatReader();
//     codeReader.decodeFromVideoDevice(null, "video", (result, err) => {
//       if (result && !scanning.current) {
//         const scannedValue = result.getText();

//         // Prevent duplicate scans
//         if (scannedValue && scannedValue !== lastScanned.current) {
//           lastScanned.current = scannedValue;
//           scanning.current = true;

//           if (onScan) onScan(scannedValue);

//           // Reset scan lock after 2 seconds
//           setTimeout(() => {
//             scanning.current = false;
//           }, 2000);
//         }
//       }
//     });

//     return () => {
//       codeReader.reset();
//     };
//   }, [onScan]);

//   return (
//     <div className="video-frame">
//       <video id="video" width="300" height="200" autoPlay playsInline />
//     </div>
//   );
// };

// export default BarcodeScanner;




// import React, { useEffect, useRef } from "react";
// import { BrowserMultiFormatReader } from "@zxing/library";
// import "./barcodescanner.css";

// const BarcodeScanner = ({ onScan }) => {
//   const lastScanned = useRef("");
//   const scanning = useRef(false);

//   useEffect(() => {
//     const codeReader = new BrowserMultiFormatReader();

//     codeReader.decodeFromVideoDevice(null, "video", (result, err) => {
//       if (result && !scanning.current) {
//         const scannedValue = result.getText().trim();
//         console.log("📷 Scanned:", scannedValue);

//         if (scannedValue && scannedValue !== lastScanned.current) {
//           lastScanned.current = scannedValue;
//           scanning.current = true;

//           if (onScan) onScan(scannedValue);

//           setTimeout(() => {
//             scanning.current = false;
//           }, 2000);
//         }
//       }
//     });

//     return () => {
//       codeReader.reset();
//     };
//   }, [onScan]);

//   return (
//     <div className="video-frame">
//       <video id="video" width="300" height="200" autoPlay playsInline />
//     </div>
//   );
// };

// export default BarcodeScanner;





import React, { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import "./barcodescanner.css";

const BarcodeScanner = ({ onScan }) => {
  const lastScanned = useRef("");
  const lastScanTime = useRef(Date.now());

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    codeReader.decodeFromVideoDevice(null, "video", (result, err) => {
      if (result) {
        const scannedValue = result.getText().trim();

        const now = Date.now();
        const timeSinceLast = now - lastScanTime.current;

        if (
          scannedValue &&
          (scannedValue !== lastScanned.current || timeSinceLast > 5000)
        ) {
          lastScanned.current = scannedValue;
          lastScanTime.current = now;

          console.log("✅ Scanned:", scannedValue);

          if (onScan) onScan(scannedValue);
        }
      }
    });

    return () => {
      codeReader.reset();
    };
  }, [onScan]);

  return (
    <div className="video-frame">
      <video id="video" width="300" height="200" autoPlay playsInline />
    </div>
  );
};

export default BarcodeScanner;

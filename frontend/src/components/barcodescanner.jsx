
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

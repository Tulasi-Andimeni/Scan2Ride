import React, { useState } from "react";
import styles from "./styles/busList.module.css";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";

const PAGE_SIZE = 10;
const TOTAL_BUSES = 30;

const COLLEGE = { name: "Aditya University", lat: 17.0894, lng: 82.0708 };
const HUBS = [
  { name: "Kakinada", lat: 16.9891, lng: 82.2475 },
  { name: "Peddapuram", lat: 17.0754, lng: 82.1409 },
  { name: "Samalkota", lat: 17.0537, lng: 82.1722 },
  { name: "Rajamahendravaram", lat: 17.0005, lng: 81.804 },
  { name: "Annavaram", lat: 17.2817, lng: 82.4016 },
];

/* 30 buses */
const buildBuses = () =>
  Array.from({ length: TOTAL_BUSES }, (_, i) => {
    const hub = HUBS[i % HUBS.length];
    const capacity = 60;
    const filled = 15 + Math.floor(Math.random() * 45);
    const isReturn = i >= TOTAL_BUSES / 2;

    const driverNames = ["Ravi", "Suresh", "Anil", "Kumar", "Manoj", "Vijay"];
    const driverPhotos = ["/images.jpeg", "/images.jpeg", "/images.jpg", "/images.jpg"];

    return {
      id: i + 1,
      busNo: 201 + i,
      hubName: hub.name,
      route: isReturn ? [hub, COLLEGE] : [COLLEGE, hub],
      direction: isReturn ? "Return" : "Outbound",
      capacity,
      filled,
      empty: capacity - filled,
      driver: {
        name: `${driverNames[i % driverNames.length]}`,
        img: driverPhotos[i % driverPhotos.length],
        phone: `+91 9876${100000 + i}`,
        experience: `${2 + (i % 4)} years`,
      },
      checkout: `${5 + Math.floor(Math.random() * 15)} students ${
        isReturn ? "from" : "at"
      } ${hub.name}`,
    };
  });

/* component */
const BusList = () => {
  const [buses] = useState(buildBuses());
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState(null);

  const filtered = buses.filter((b) =>
    `${b.busNo} ${b.driver.name} ${b.hubName} ${b.route[0].name} ${b.route[1].name}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const pageSafe = Math.min(page, pageCount || 1);
  const visible = filtered.slice(
    (pageSafe - 1) * PAGE_SIZE,
    pageSafe * PAGE_SIZE
  );

  const jump = (n) => setPage(n);

  return (
    <div className={styles.fullscreen}>
      <h1 className={styles.heading}>🚌 Aditya University — Bus Details</h1>

      <div className={styles.animationWrapper}>
        <img
          src="/adityabus-rightface.png"
          alt="Bus"
          className={styles.busAnim}
        />
        <div className={styles.clouds}></div>
        <div className={styles.trees}></div>
      </div>

      <input
        className={styles.search}
        placeholder="Search bus #, driver, hub…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1);
        }}
      />

      <div className={styles.busList}>
        {visible.map((b) => (
          <div
            key={b.id}
            className={`${styles.busCard} ${
              b.direction === "Return" ? styles.returnBus : ""
            }`}
          >
            <div className={styles.left}>
              <div className={styles.busNo}>#{b.busNo}</div>
              <div className={styles.route}>
                {b.route[0].name} → {b.route[1].name}
              </div>
              <div className={styles.capacityBar}>
                <div
                  className={styles.filledBar}
                  style={{ width: `${(b.filled / b.capacity) * 100}%` }}
                />
                <span>
                  {b.filled}/{b.capacity}
                </span>
              </div>
              <p className={styles.checkout}>{b.checkout}</p>
            </div>

            <div className={styles.right}>
              <img
                src={b.driver.img}
                alt={b.driver.name}
                className={styles.driverImg}
              />
              <p className={styles.driverName}>{b.driver.name}</p>
              <div className={styles.directionLabel}>
                {b.direction === "Return"
                  ? "⬅ Back to Campus"
                  : "➡ Leaving Campus"}
              </div>
              <button className={styles.viewBtn} onClick={() => setFocus(b)}>
                View
              </button>
            </div>
          </div>
        ))}
      </div>

  {pageCount > 1 && (
    <div className={styles.pagination}>
      <button disabled={pageSafe === 1} onClick={() => jump(pageSafe - 1)}>
        ‹ Prev
      </button>
      {Array.from({ length: pageCount }, (_, i) => (
        <button
          key={i}
          onClick={() => jump(i + 1)}
          className={pageSafe === i + 1 ? styles.active : ""}
        >
          {i + 1}
        </button>
      ))}
      <button
        disabled={pageSafe === pageCount}
        onClick={() => jump(pageSafe + 1)}
      >
        Next ›
      </button>
    </div>
  )}


{focus && (
  <div className={styles.modalOverlay} onClick={() => setFocus(null)}>
    <div className={`${styles.modal} ${styles.animateIn}`} onClick={(e) => e.stopPropagation()}>
      <div className={styles.driverProfile}>
        <div className={styles.driverContent}>
          <img
            src={focus.driver.img}
            alt={focus.driver.name}
            className={styles.driverLargeImg}
          />
          <div className={styles.driverInfo}>
            <p><strong>Name:</strong> {focus.driver.name}</p>
            <p><strong>Phone:</strong> {focus.driver.phone}</p>
            <p><strong>Experience:</strong> {focus.driver.experience}</p>
          </div>
        </div>
      </div>

      <div className={styles.mapBox}>
        <MapContainer
          center={[focus.route[0].lat, focus.route[0].lng]}
          zoom={9}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="© OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polyline positions={focus.route.map((pt) => [pt.lat, pt.lng])} />
          {focus.route.map((pt, idx) => (
            <Marker key={idx} position={[pt.lat, pt.lng]}>
              <Popup>{pt.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <button className={styles.closeBtn} onClick={() => setFocus(null)}>
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default BusList;

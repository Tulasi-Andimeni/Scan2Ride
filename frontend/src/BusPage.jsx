
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from './styles/BusPage.module.css';
import { BASE_URL } from "./config";

const buses = [218, 229, 215, 235, 446, 216, 204, 238];

const getStatus = (count) => {
  if (count > 10) return "Overloaded";
  if (count === 5) return "Required";
  return "Available";
};

const BusPage = () => {
  const [busSummary, setBusSummary] = useState({});

  useEffect(() => {
    axios.get(`${BASE_URL}/api/bus-summary`)
      .then(res => {
        const summaryMap = {};
        res.data.forEach(item => {
          summaryMap[item._id] = item.count;
        });
        setBusSummary(summaryMap);
      })
      .catch(err => console.error("Error fetching summary", err));
  }, []);

  const chunkSize = 4;
  const rows = [];
  for (let i = 0; i < buses.length; i += chunkSize) {
    rows.push(buses.slice(i, i + chunkSize));
  }

  return (
    <div className={styles.buspageMain}>
      <div className={styles.buspageHeadbox}>
        <div className={styles.buspageHeading}>Bus Overview – Click to Explore</div>
      </div>

      <div className={styles.buspageDownbox}>
        {rows.map((row, i) => (
          <div className={styles.row} key={i}>
            {row.map(busNumber => {
              const count = busSummary[busNumber] || 0;
              const status = getStatus(count);
              return (
                <Link to={`/home/bus/${busNumber}`} key={busNumber}>
                  <div className={styles.card}>
                    <div className={styles.imgContainer}>
                      <div className={styles.image}>
  <img src="/bus.png" alt="Description"/>
</div>

                      <div className={styles.description}>
                        <span className={styles.title}>Bus {busNumber}</span>
                        <span className={`${styles.status} ${styles[status.toLowerCase()]}`}>
                          {status} ({count})
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusPage;

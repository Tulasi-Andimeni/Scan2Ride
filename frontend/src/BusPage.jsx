// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./BusPage.css";
// import busImg from './assets/bus.png'; // Make sure this image exists or use a suitable SVG

// const busData = [
//   { number: 218, route: "Ameerpet - KPHB", status: "On Time" },
//   { number: 229, route: "Miyapur - Secunderabad", status: "Delayed" },
//   { number: 215, route: "LB Nagar - Uppal", status: "On Time" },
//   { number: 235, route: "Dilsukhnagar - Mehdipatnam", status: "On Time" },
//   { number: 446, route: "Kukatpally - Gachibowli", status: "Delayed" },
//   { number: 216, route: "Begumpet - Hitech City", status: "On Time" },
//   { number: 204, route: "Secunderabad - Tarnaka", status: "On Time" },
//   { number: 238, route: "Mehdipatnam - Jubilee Hills", status: "Delayed" },
// ];

// const BusPage = () => {
//   const [search, setSearch] = useState("");

//   const filteredBuses = busData.filter(
//     (bus) =>
//       bus.number.toString().includes(search) ||
//       bus.route.toLowerCase().includes(search.toLowerCase())
//   );

//   const rows = [];
//   const chunkSize = 4;
//   for (let i = 0; i < filteredBuses.length; i += chunkSize) {
//     rows.push(filteredBuses.slice(i, i + chunkSize));
//   }

//   return (
//     <div className="buspage-main">
//       <div className="buspage-headbox">
//         <div className="buspage-heading">Bus Overview – Click to Explore</div>
//       </div>
//       <div className="buspage-downbox">
//         {rows.length === 0 ? (
//           <div className="buspage-nobus">No buses found.</div>
//         ) : (
//           rows.map((busRow, rowIndex) => (
//             <div className="buspage-main2" key={rowIndex}>
//               {busRow.map((bus) => (
//                 <Link to={`/home/bus/${bus.number}`} key={bus.number} className="buspage-link">
//                   <div className="buspage-card1 glassmorph">
//                     <span className={`bus-status-badge ${bus.status === 'On Time' ? 'ontime' : 'delayed'}`}>
//                       {bus.status}
//                     </span>
//                     <div className="bus-img-wrap">
//                       <img src={busImg} alt="bus" className="bus-img-animate" />
//                     </div>
//                     <div className="bus-info">
//                       <div className="bus-number">{bus.number}</div>
//                       <div className="bus-route">{bus.route}</div>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default BusPage;





// import React from 'react';
// import styles from './styles/BusPage.module.css';

// const buses = [218, 229, 215, 235, 446, 216, 204, 238];

// const BusCard = ({ number }) => (
//   <div className={styles.card}>
//     <div className={styles.imgContainer}>
//       <div className={styles.img}></div>
//       <div className={styles.description}>
//         <span className={styles.title}>{number}</span>
//       </div>
//     </div>
//   </div>
// );

// const BusPage = () => {
//   const firstRow = buses.slice(0, 4);
//   const secondRow = buses.slice(4, 8);

//   return (
//     <div className={styles.buspageMain}>
//       <div className={styles.buspageHeadbox}>
//         <div className={styles.buspageHeading}>BUS OVERVIEW – CLICK TO EXPLORE</div>
//       </div>

//       <div className={styles.buspageDownbox}>
//         <div className={styles.row}>
//           {firstRow.map((busNumber) => (
//             <BusCard key={busNumber} number={busNumber} />
//           ))}
//         </div>
//         <div className={styles.row}>
//           {secondRow.map((busNumber) => (
//             <BusCard key={busNumber} number={busNumber} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BusPage;





// import React from "react";
// import { Link } from "react-router-dom";
// import styles from './styles/BusPage.module.css';

// const buses = [218, 229, 215, 235, 446, 216, 204, 238];

// const BusPage = () => {
//   const rows = [];
//   const chunkSize = 4;

//   for (let i = 0; i < buses.length; i += chunkSize) {
//     rows.push(buses.slice(i, i + chunkSize));
//   }

//   return (
//     <div className="buspageMain">
//       <div className="buspageHeadbox">
//         <div className="buspageHeading">Bus Overview – Click to Explore</div>
//       </div>

//       <div className="buspageDownbox">
//         {rows.map((row, rowIndex) => (
//           <div className="row" key={rowIndex}>
//             {row.map((busNumber) => (
//               <Link to={`/home/bus/${busNumber}`} key={busNumber}>
//                 <div className="card">
//                   <div className="imgContainer">
//                     <div className="img"></div>
//                     <div className="description">
//                       <span className="title">{busNumber}</span>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BusPage;





// import React from "react";
// import { Link } from "react-router-dom";
// import styles from './styles/BusPage.module.css';

// const buses = [218, 229, 215, 235, 446, 216, 204, 238];

// const BusPage = () => {
//   const rows = [];
//   const chunkSize = 4;

//   for (let i = 0; i < buses.length; i += chunkSize) {
//     rows.push(buses.slice(i, i + chunkSize));
//   }

//   return (
//     <div className={styles.buspageMain}>
//       <div className={styles.buspageHeadbox}>
//         <div className={styles.buspageHeading}>Bus Overview – Click to Explore</div>
//       </div>

//       <div className={styles.buspageDownbox}>
//         {rows.map((row, rowIndex) => (
//           <div className={styles.row} key={rowIndex}>
//             {row.map((busNumber) => (
//               <Link to={`/home/bus/${busNumber}`} key={busNumber}>
//                 <div className={styles.card}>
//                   <div className={styles.imgContainer}>
//                     <div className={styles.img}></div>
//                     <div className={styles.description}>
//                       <span className={styles.title}>{busNumber}</span>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BusPage;




// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import styles from './styles/BusPage.module.css';

// const buses = [218, 229, 215, 235, 446, 216, 204, 238];

// const getStatus = (count) => {
//   if (count > 10) return "Overloaded";
//   if (count === 5) return "Required";
//   return "Available";
// };

// const BusPage = () => {
//   const [busSummary, setBusSummary] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/bus-summary")
//       .then((res) => {
//         const summary = {};
//         res.data.forEach(item => {
//           summary[item._id] = item.studentCount;
//         });
//         setBusSummary(summary);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching bus summary:", err);
//         setLoading(false);
//       });
//   }, []);

//   const rows = [];
//   const chunkSize = 4;
//   for (let i = 0; i < buses.length; i += chunkSize) {
//     rows.push(buses.slice(i, i + chunkSize));
//   }

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className={styles.buspageMain}>
//       <div className={styles.buspageHeadbox}>
//         <div className={styles.buspageHeading}>Bus Overview – Click to Explore</div>
//       </div>

//       <div className={styles.buspageDownbox}>
//         {rows.map((row, rowIndex) => (
//           <div className={styles.row} key={rowIndex}>
//             {row.map((busNumber) => {
//               const count = busSummary[busNumber] || 0;
//               const status = getStatus(count);

//               return (
//                 <Link to={`/home/bus/${busNumber}`} key={busNumber}>
//                   <div className={styles.card}>
//                     <div className={styles.imgContainer}>
//                       <div className={styles.img}></div>
//                       <div className={styles.description}>
//                         <span className={styles.title}>Bus {busNumber}</span>
//                         <span className={`${styles.status} ${styles[status.toLowerCase()]}`}>
//                           {status} ({count})
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               );
//             })}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BusPage;



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from './styles/Buspage.module.css';

const buses = [218, 229, 215, 235, 446, 216, 204, 238];

const getStatus = (count) => {
  if (count > 10) return "Overloaded";
  if (count === 5) return "Required";
  return "Available";
};

const BusPage = () => {
  const [busSummary, setBusSummary] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/bus-summary")
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

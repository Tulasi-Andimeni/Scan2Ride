
import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import styles from "./piechart.module.css";

const data = [
  { name: "Availability", value: 15 },
  { name: "Required", value: 10 },
  { name: "Loaded", value: 7 },
];

const COLORS = ["#00C49F", "#FFBB28", "#FF4C4C"];

// Random number generator for tooltip (from previous)
const getRandomValue = (name) => {
  switch (name) {
    case "Availability":
      return Math.floor(Math.random() * 10);
    case "Required":
      return Math.floor(Math.random() * 9) + 10;
    case "Loaded":
      return Math.floor(Math.random() * 10) + 19;
    default:
      return 0;
  }
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name } = payload[0];
    const randomValue = getRandomValue(name);

    return (
      <div className={styles.tooltip}>
        <p><strong>{name}: {randomValue}</strong></p>
      </div>
    );
  }
  return null;
};

const LiveBusPieChart = () => {
  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}></h1>
      <div className={styles.chartContainer}>
        <PieChart width={550} height={340}>
          <Pie
            data={data}
            cx={250}
            cy={200}
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          {/* Removed Legend component */}
        </PieChart>

        {/* Custom legend next to pie chart */}
        <div className={styles.legend}>
          {data.map((entry, index) => (
            <div key={entry.name} className={styles.legendItem}>
              <span
                className={styles.legendColor}
                style={{ backgroundColor: COLORS[index] }}
              />
              <span>{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveBusPieChart;

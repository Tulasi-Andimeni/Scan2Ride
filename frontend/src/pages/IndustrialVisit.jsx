import React, { useState, useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import '../styles/IndustrialVisit.module.css';

function IndustrialVisit() {
  const [visits, setVisits] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [studentsCount, setStudentsCount] = useState('');
  const [file, setFile] = useState(null);

  const today = new Date();

  const handleAddVisit = () => {
    if (companyName && location && studentsCount) {
      const newVisit = {
        id: Date.now(),
        companyName,
        location,
        studentsCount: parseInt(studentsCount),
        date: new Date().toISOString().split('T')[0], // Store date as YYYY-MM-DD
      };
      setVisits([...visits, newVisit]);

      // Clear inputs
      setCompanyName('');
      setLocation('');
      setStudentsCount('');
      setFile(null);
    }
  };

  const totalStudents = visits.reduce((sum, visit) => sum + visit.studentsCount, 0);

  // Prepare heatmap data
  const heatmapData = visits.map((visit) => ({
    date: visit.date,
    count: 1, // You can also use visit.studentsCount if you want the heat intensity to reflect student numbers
  }));

  return (
    <div className="industrial-visit-page" style={{ padding: '20px' }}>
      <h1>Add Industrial Visit</h1>

      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <br />
      <input
        type="number"
        placeholder="Number of Students"
        value={studentsCount}
        onChange={(e) => setStudentsCount(e.target.value)}
      />
      <br />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <button onClick={handleAddVisit}>Add Visit</button>

      <div style={{ display: 'flex', marginTop: '20px', gap: '10px' }}>
        <div style={{ backgroundColor: '#FF8A00', padding: '20px', borderRadius: '10px', color: 'white', minWidth: '150px', textAlign: 'center' }}>
          <h2>Total Visits</h2>
          <p style={{ fontSize: '24px' }}>{visits.length}</p>
        </div>

        <div style={{ backgroundColor: '#FF8A00', padding: '20px', borderRadius: '10px', color: 'white', minWidth: '150px', textAlign: 'center' }}>
          <h2>Total Students</h2>
          <p style={{ fontSize: '24px' }}>{totalStudents}</p>
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h2>Industrial Visit Calendar Heatmap</h2>
        <CalendarHeatmap
          startDate={new Date(today.getFullYear(), today.getMonth() - 6, 1)} // Last 6 months
          endDate={today}
          values={heatmapData}
          classForValue={(value) => {
            if (!value) return 'color-empty';
            if (value.count >= 3) return 'color-github-4';
            if (value.count === 2) return 'color-github-3';
            if (value.count === 1) return 'color-github-2';
            return 'color-github-1';
          }}
          showWeekdayLabels={true}
        />
      </div>
    </div>
  );
}

export default IndustrialVisit;
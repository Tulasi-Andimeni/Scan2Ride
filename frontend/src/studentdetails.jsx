import React, { useState, useEffect } from "react";
import styles from './studentdetails.module.css';
import axios from "axios";
import {
  FaBus, FaIdBadge, FaUser, FaMapMarkerAlt,
  FaPhoneAlt, FaHashtag, FaEye, FaTrash, FaPlus
} from "react-icons/fa";

const StudentsDetail = () => {
  const [students, setStudents] = useState([]);
  const [deletedStudents, setDeletedStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleted, setShowDeleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    studentid: '',
    name: '',
    busNumber: '',
    location: '',
    branch: ''
  });

  const studentsPerPage = 30;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      const active = res.data.filter(s => !s.deleted);
      const deleted = res.data.filter(s => s.deleted);
      setStudents(active);
      setDeletedStudents(deleted);
    } catch (err) {
      console.error("Failed to fetch students:", err);
    }
  };

  const handleView = (student) => setSelectedStudent(student);
  const handleClose = () => setSelectedStudent(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await axios.put(`http://localhost:5000/api/students/soft-delete/${id}`);
      fetchStudents();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleAddStudent = async () => {
    const { studentid, name, busNumber, location, branch } = newStudent;
    if (!studentid.trim() || !name.trim() || !busNumber.trim() || !location.trim() || !branch.trim()) {
      alert("Please fill all fields");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/students", newStudent);
      alert("Student added successfully!");
      setShowModal(false);
      setNewStudent({ studentid: '', name: '', busNumber: '', location: '', branch: '' });
      fetchStudents();
    } catch (err) {
      alert(err.response?.data?.message || "Error adding student");
    }
  };

  const filteredStudents = (showDeleted ? deletedStudents : students).filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentid.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.busNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);
  const visiblePages = [pageGroup * 2 + 1, pageGroup * 2 + 2].filter(p => p <= totalPages);

  const goToPage = (num) => setCurrentPage(num);
  const nextGroup = () => {
    const maxGroup = Math.floor((totalPages - 1) / 2);
    if (pageGroup < maxGroup) {
      setPageGroup(pageGroup + 1);
      setCurrentPage((pageGroup + 1) * 2 + 1);
    }
  };
  const prevGroup = () => {
    if (pageGroup > 0) {
      setPageGroup(pageGroup - 1);
      setCurrentPage((pageGroup - 1) * 2 + 1);
    }
  };

  return (
    <div className={styles.studentTable}>
      <div className={styles.titleBar}>
        <h2 className={styles.titleText}>Student Information</h2>
           <div className={styles.headingLine}></div>
        <button className={styles.addBtn} onClick={() => setShowModal(true)}>
          <FaPlus /> Add Student
        </button>
      </div>

      <div className={styles.controlsWrapper}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className={styles.searchInput}
        />
        <div className={styles.toggleButtonGroup}>
          <button
            className={`${styles.toggleBtn} ${!showDeleted ? styles.activeToggle : ''}`}
            onClick={() => {
              setShowDeleted(false);
              setCurrentPage(1);
            }}
          >
            Active Students
          </button>
          <button
            className={`${styles.toggleBtn} ${showDeleted ? styles.activeToggle : ''}`}
            onClick={() => {
              setShowDeleted(true);
              setCurrentPage(1);
            }}
          >
            Deleted Students ({deletedStudents.length})
          </button>
        </div>
      </div>

      {/* Scrollable Table Container */}
      <div className={styles.tableContainer}>
        <table className={styles.detailTable}>
          <thead className={styles.fix}>
            {/* <tr>
              <th><FaHashtag /> S.No.</th>
              <th><FaBus /> Bus No</th>
              <th><FaIdBadge /> Student ID</th>
              <th><FaUser /> Name</th>
              <th><FaMapMarkerAlt /> Bus Stop</th>
              <th><FaPhoneAlt /> Branch</th>
              <th><FaEye /> Actions</th>
            </tr> */}
             <tr>
              <th> S.No.</th>
              <th> Bus No</th>
              <th> Student ID</th>
              <th> Name</th>
              <th> Bus Stop</th>
              <th> Branch</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student, index) => (
              <tr key={student._id}>
                <td>{indexOfFirst + index + 1}</td>
                <td>{student.busNumber}</td>
                <td>{student.studentid}</td>
                <td>{student.name}</td>
                <td>{student.location}</td>
                <td>{student.branch}</td>
                <td>
                  <button className={styles.viewBtn} onClick={() => handleView(student)}>View</button>
                  {!showDeleted && (
                    <button className={styles.deleteBtn} onClick={() => handleDelete(student._id)}>
                      <FaTrash />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <button onClick={prevGroup} disabled={pageGroup === 0}>Prev</button>
        {visiblePages.map((num) => (
          <button
            key={num}
            onClick={() => goToPage(num)}
            className={currentPage === num ? styles.activePage : ""}
          >
            {num}
          </button>
        ))}
        <button onClick={nextGroup} disabled={(pageGroup + 1) * 2 >= totalPages}>Next</button>
      </div>

      {/* View Student Modal */}
      {selectedStudent && (
        <div className={styles.modalOverlay} onClick={handleClose}>
          <div className={styles.studentCard} onClick={e => e.stopPropagation()}>
            <h3>Student Profile</h3>
            <p><strong>ID:</strong> {selectedStudent.studentid}</p>
            <p><strong>Name:</strong> {selectedStudent.name}</p>
            <p><strong>Bus:</strong> {selectedStudent.busNumber}</p>
            <p><strong>Stop:</strong> {selectedStudent.location}</p>
            <p><strong>Branch:</strong> {selectedStudent.branch}</p>
            <button className={styles.closeButton} onClick={handleClose}>Close</button>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3>Add New Student</h3>
            <input type="text" placeholder="Student ID" value={newStudent.studentid} onChange={(e) => setNewStudent({ ...newStudent, studentid: e.target.value })} />
            <input type="text" placeholder="Name" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} />
            <input type="text" placeholder="Bus Number" value={newStudent.busNumber} onChange={(e) => setNewStudent({ ...newStudent, busNumber: e.target.value })} />
            <input type="text" placeholder="Bus Stop" value={newStudent.location} onChange={(e) => setNewStudent({ ...newStudent, location: e.target.value })} />
            <input type="text" placeholder="Branch" value={newStudent.branch} onChange={(e) => setNewStudent({ ...newStudent, branch: e.target.value })} />
            <div className={styles.modalActions}>
              <button className={styles.savebtn} onClick={handleAddStudent}>Save</button>
              <button  className={styles.cancelbtn} onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsDetail;
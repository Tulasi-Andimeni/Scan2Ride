// import React, { useState } from 'react';
// import styles from './styles/Drivers.module.css';
// import DriverCard from './DriverCard';

// const initialDrivers = Array.from({ length: 30 }, (_, i) => ({
//   id: i + 1,
//   name: `Driver ${i + 1}`,
//   phone: `+91 98765 43${String(i).padStart(2, '0')}`,
//   busNo: `AP05Z 10${String(i).padStart(2, '0')}`,
//   experience: `${(i % 5) + 1} years`,
//   img: `/Drivers/driver${i + 1}.jpeg`,
// }));

// const Drivers = () => {
//   const [drivers, setDrivers] = useState(initialDrivers);
//   const [deletedDrivers, setDeletedDrivers] = useState([]);
  // const [showDeleted, setShowDeleted] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [newDriver, setNewDriver] = useState({ name: '', phone: '', busNo: '', experience: '' });
//   const [editingDriver, setEditingDriver] = useState(null);
//   const [imagePreview, setImagePreview] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
  // const [currentPage, setCurrentPage] = useState(1);
//   const cardsPerPage = 8;

//   const filteredDrivers = drivers.filter(driver =>
//     driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     driver.phone.includes(searchTerm) ||
//     driver.busNo.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const pageData = showDeleted ? deletedDrivers : filteredDrivers;
//   const pages = Math.ceil(pageData.length / cardsPerPage);
//   const currentData = pageData.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);

//   const handleDelete = (id) => {
//     const toDelete = drivers.find(d => d.id === id);
//     setDeletedDrivers([...deletedDrivers, toDelete]);
//     setDrivers(drivers.filter(d => d.id !== id));
//   };

//   const handleRestore = (id) => {
//     const toRestore = deletedDrivers.find(d => d.id === id);
//     setDrivers([...drivers, toRestore]);
//     setDeletedDrivers(deletedDrivers.filter(d => d.id !== id));
//   };

//   const handleAddDriver = () => {
//     const maxId = Math.max(...drivers.map(d => d.id), 0);
//     const driverWithImage = {
//       ...newDriver,
//       id: maxId + 1,
//       img: imagePreview || '/driver.png',
//     };
//     setDrivers([...drivers, driverWithImage]);
//     resetForm();
//   };

//   const resetForm = () => {
//     setNewDriver({ name: '', phone: '', busNo: '', experience: '' });
//     setImagePreview('');
//     setShowModal(false);
//   };

//   const resetEditForm = () => {
//     setEditingDriver(null);
//     setImagePreview('');
//     setShowEditModal(false);
//   };

//   const openEditModal = (driver) => {
//     setEditingDriver(driver);
//     setImagePreview(driver.img);
//     setShowEditModal(true);
//   };

//   const handleEditSave = () => {
//     setDrivers(drivers.map(d => d.id === editingDriver.id ? { ...editingDriver, img: imagePreview } : d));
//     resetEditForm();
//   };

//   const handleImageChange = e => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = e => {
//       setImagePreview(e.target.result);
//       if (editingDriver) setEditingDriver({ ...editingDriver, img: e.target.result });
//       else setNewDriver({ ...newDriver, img: e.target.result });
//     };
//     reader.readAsDataURL(file);
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.heading}>🧍 Our Drivers</h1>

      // <div className={styles.searchContainer}>
      //   <input
      //     type="text"
      //     className={styles.searchInput}
      //     placeholder="Search by name, phone, or bus number..."
      //     value={searchTerm}
      //     onChange={e => {
      //       setSearchTerm(e.target.value);
      //       setCurrentPage(1);
      //     }}
      //   />
      // </div>

      // <div className={styles.toggleContainer}>
      //   <button className={`${styles.toggleBtn} ${!showDeleted ? styles.activeToggle : ''}`} onClick={() => setShowDeleted(false)}>Active Drivers</button>
      //   <button className={`${styles.toggleBtn} ${showDeleted ? styles.activeToggle : ''}`} onClick={() => setShowDeleted(true)}>Deleted Drivers ({deletedDrivers.length})</button>
      // </div>

//       <div className={styles.grid}>
//         {currentData.map(driver => (
//           <DriverCard
//             key={driver.id}
//             driver={driver}
//             showDeleted={showDeleted}
//             onDelete={() => handleDelete(driver.id)}
//             onRestore={() => handleRestore(driver.id)}
//             onEdit={() => openEditModal(driver)}
//           />
//         ))}
//         {!showDeleted && currentPage === pages && (
//           <div className={styles.card} onClick={() => setShowModal(true)}>
//             <div className={styles.plusCard}>➕</div>
//           </div>
//         )}
//       </div>

//       <div className={styles.pagination}>
//         <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
//         {Array.from({ length: pages }, (_, i) => (
//           <button
//             key={i}
//             className={currentPage === i + 1 ? styles.activePage : ''}
//             onClick={() => setCurrentPage(i + 1)}
//           >
//             {i + 1}
//           </button>
//         ))}
//         <button disabled={currentPage === pages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
//       </div>

      // {/* Add/Edit Modals */}
      // {showModal && (
      //   <div className={styles.modalOverlay} onClick={resetForm}>
      //     <div className={styles.modal} onClick={e => e.stopPropagation()}>
      //       <h3>Add New Driver</h3>
      //       {imagePreview && <div className={styles.imagePreview}><img src={imagePreview} alt="Preview" /></div>}
      //       <input type="text" placeholder="Name" value={newDriver.name} onChange={e => setNewDriver({ ...newDriver, name: e.target.value })} />
      //       <input type="tel" placeholder="Phone" value={newDriver.phone} onChange={e => setNewDriver({ ...newDriver, phone: e.target.value })} />
      //       <input type="text" placeholder="Bus No" value={newDriver.busNo} onChange={e => setNewDriver({ ...newDriver, busNo: e.target.value })} />
      //       <input type="number" placeholder="Experience (years)" value={newDriver.experience} onChange={e => setNewDriver({ ...newDriver, experience: e.target.value })} />
      //       <input type="file" accept="image/*" onChange={handleImageChange} />
      //       <div className={styles.modalActions}>
      //         <button onClick={handleAddDriver}>Save</button>
      //         <button onClick={resetForm}>Cancel</button>
      //       </div>
      //     </div>
      //   </div>
      // )}
      // {showEditModal && (
      //   <div className={styles.modalOverlay} onClick={resetEditForm}>
      //     <div className={styles.modal} onClick={e => e.stopPropagation()}>
      //       <h3>Edit Driver</h3>
      //       {imagePreview && <div className={styles.imagePreview}><img src={imagePreview} alt="Preview" /></div>}
      //       <input type="text" placeholder="Name" value={editingDriver?.name || ''} onChange={e => setEditingDriver({ ...editingDriver, name: e.target.value })} />
      //       <input type="tel" placeholder="Phone" value={editingDriver?.phone || ''} onChange={e => setEditingDriver({ ...editingDriver, phone: e.target.value })} />
      //       <input type="text" placeholder="Bus No" value={editingDriver?.busNo || ''} onChange={e => setEditingDriver({ ...editingDriver, busNo: e.target.value })} />
      //       <input type="number" placeholder="Experience (years)" value={editingDriver?.experience || ''} onChange={e => setEditingDriver({ ...editingDriver, experience: e.target.value })} />
      //       <input type="file" accept="image/*" onChange={handleImageChange} />
      //       <div className={styles.modalActions}>
      //         <button onClick={handleEditSave}>Update</button>
      //         <button onClick={resetEditForm}>Cancel</button>
      //       </div>
      //     </div>
      //   </div>
      // )}
//     </div>
//   );
// };

// export default Drivers;





// // Drivers.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "./styles/Drivers.module.css";
// import DriverCard from "./DriverCard";

// const Drivers = () => {
//   const [drivers, setDrivers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [editingDriver, setEditingDriver] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [imagePreview, setImagePreview] = useState("");
//     // const [currentPage, setCurrentPage] = useState(1);
//       // const [showDeleted, setShowDeleted] = useState(false);
//   const [newDriver, setNewDriver] = useState({
//     name: "",
//     phoneNumber: "",
//     busNumber: "",
//     experienceYears: "",
//     assignedRoute: "",
//     image: null,
//   });

//   const fetchDrivers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/drivers");
//       setDrivers(res.data);
//     } catch (err) {
//       console.error("Failed to fetch drivers", err);
//     }
//   };

//   useEffect(() => {
//     fetchDrivers();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this driver?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/drivers/${id}`);
//       setDrivers(drivers.filter(driver => driver._id !== id));
//     } catch (err) {
//       console.error("Delete failed", err);
//     }
//   };

//   const openEditModal = (driver) => {
//     setEditingDriver(driver);
//     setImagePreview(driver.image);
//     setShowEditModal(true);
//   };

//   const handleEditSave = async () => {
//     try {
//       const formData = new FormData();
//       Object.entries(editingDriver).forEach(([key, value]) => formData.append(key, value));
//       if (imagePreview instanceof File) formData.append("image", imagePreview);

//       await axios.put(`http://localhost:5000/api/drivers/${editingDriver._id}`, formData);
//       setShowEditModal(false);
//       fetchDrivers();
//     } catch (err) {
//       console.error("Update failed", err);
//     }
//   };

//   const handleAddDriver = async () => {
//     try {
//       const formData = new FormData();
//       Object.entries(newDriver).forEach(([key, value]) => formData.append(key, value));
//       if (imagePreview instanceof File) formData.append("image", imagePreview);

//       await axios.post("http://localhost:5000/api/drivers", formData);
//       setShowAddModal(false);
//       setNewDriver({ name: "", phoneNumber: "", busNumber: "", experienceYears: "", assignedRoute: "", image: null });
//       setImagePreview("");
//       fetchDrivers();
//     } catch (err) {
//       console.error("Add failed", err);
//     }
//   };

//   const handleImageChange = (e, isEdit = false) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setImagePreview(file);
//     if (isEdit) setEditingDriver({ ...editingDriver, image: file });
//     else setNewDriver({ ...newDriver, image: file });
//   };

//   const filteredDrivers = drivers.filter(driver =>
//     driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     driver.phoneNumber.includes(searchTerm) ||
//     driver.busNumber.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.heading}>🧍 Drivers List</h1>

//       <input
//         type="text"
//         placeholder="Search by name, phone, or bus number"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className={styles.searchInput}
//       />
//       {/* <div className={styles.searchContainer}>
//         <input
//           type="text"
//           className={styles.searchInput}
//           placeholder="Search by name, phone, or bus number..."
//           value={searchTerm}
//           onChange={e => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1);
//           }}
//         />
//       </div>

//       <div className={styles.toggleContainer}>
//         <button className={`${styles.toggleBtn} ${!showDeleted ? styles.activeToggle : ''}`} onClick={() => setShowDeleted(false)}>Active Drivers</button>
//         <button className={`${styles.toggleBtn} ${showDeleted ? styles.activeToggle : ''}`} onClick={() => setShowDeleted(true)}>Deleted Drivers ({deletedDrivers.length})</button>
//       </div> */}

//       <div className={styles.grid}>
//         {filteredDrivers.map((driver) => (
//           <DriverCard
//             key={driver._id}
//             driver={{ ...driver, img: driver.image?.startsWith("http") ? driver.image : `http://localhost:5000${driver.image}` }}
//             showDeleted={false}
//             onDelete={() => handleDelete(driver._id)}
//             onEdit={() => openEditModal(driver)}
//           />
//         ))}
//         <div className={styles.card} onClick={() => setShowAddModal(true)}>
//           <div className={styles.plusCard}>➕</div>
//         </div>
//       </div>

//       {/* Add/Edit modals here (same as previous implementation) */}
//             {/* Add/Edit Modals */}
//       {showAddModal && (
//         <div className={styles.modalOverlay} onClick={resetForm}>
//           <div className={styles.modal} onClick={e => e.stopPropagation()}>
//             <h3>Add New Driver</h3>
//             {imagePreview && <div className={styles.imagePreview}><img src={imagePreview} alt="Preview" /></div>}
//             <input type="text" placeholder="Name" value={newDriver.name} onChange={e => setNewDriver({ ...newDriver, name: e.target.value })} />
//             <input type="tel" placeholder="Phone" value={newDriver.phone} onChange={e => setNewDriver({ ...newDriver, phone: e.target.value })} />
//             <input type="text" placeholder="Bus No" value={newDriver.busNo} onChange={e => setNewDriver({ ...newDriver, busNo: e.target.value })} />
//             <input type="number" placeholder="Experience (years)" value={newDriver.experience} onChange={e => setNewDriver({ ...newDriver, experience: e.target.value })} />
//             <input type="file" accept="image/*" onChange={handleImageChange} />
//             <div className={styles.modalActions}>
//               <button onClick={handleAddDriver}>Save</button>
//               <button onClick={resetForm}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//       {showEditModal && (
//         <div className={styles.modalOverlay} onClick={resetEditForm}>
//           <div className={styles.modal} onClick={e => e.stopPropagation()}>
//             <h3>Edit Driver</h3>
//             {imagePreview && <div className={styles.imagePreview}><img src={imagePreview} alt="Preview" /></div>}
//             <input type="text" placeholder="Name" value={editingDriver?.name || ''} onChange={e => setEditingDriver({ ...editingDriver, name: e.target.value })} />
//             <input type="tel" placeholder="Phone" value={editingDriver?.phone || ''} onChange={e => setEditingDriver({ ...editingDriver, phone: e.target.value })} />
//             <input type="text" placeholder="Bus No" value={editingDriver?.busNo || ''} onChange={e => setEditingDriver({ ...editingDriver, busNo: e.target.value })} />
//             <input type="number" placeholder="Experience (years)" value={editingDriver?.experience || ''} onChange={e => setEditingDriver({ ...editingDriver, experience: e.target.value })} />
//             <input type="file" accept="image/*" onChange={handleImageChange} />
//             <div className={styles.modalActions}>
//               <button onClick={handleEditSave}>Update</button>
//               <button onClick={resetEditForm}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Drivers;





import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles/Drivers.module.css";
import DriverCard from "./DriverCard";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [deletedDrivers, setDeletedDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingDriver, setEditingDriver] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [showDeleted, setShowDeleted] = useState(false);

  const [newDriver, setNewDriver] = useState({
    name: "",
    phoneNumber: "",
    busNumber: "",
    experienceYears: "",
    assignedRoute: "",
    image: null,
  });

  const fetchDrivers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/drivers");
      const active = res.data.filter(driver => !driver.deleted);
      const deleted = res.data.filter(driver => driver.deleted);
      setDrivers(active);
      setDeletedDrivers(deleted);
    } catch (err) {
      console.error("Failed to fetch drivers", err);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this driver?")) return;
    try {
      await axios.put(`http://localhost:5000/api/drivers/${id}/delete`);
      fetchDrivers();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleRestore = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/drivers/${id}/restore`);
      fetchDrivers();
    } catch (err) {
      console.error("Restore failed", err);
    }
  };

  const openEditModal = (driver) => {
    setEditingDriver(driver);
    setImagePreview(driver.image);
    setShowEditModal(true);
  };

  const resetEditForm = () => {
    setEditingDriver(null);
    setImagePreview("");
    setShowEditModal(false);
  };

  const handleEditSave = async () => {
    try {
      const formData = new FormData();
      Object.entries(editingDriver).forEach(([key, value]) => formData.append(key, value));
      if (imagePreview instanceof File) formData.append("image", imagePreview);

      await axios.put(`http://localhost:5000/api/drivers/${editingDriver._id}`, formData);
      setShowEditModal(false);
      fetchDrivers();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleAddDriver = async () => {
    try {
      const formData = new FormData();
      Object.entries(newDriver).forEach(([key, value]) => formData.append(key, value));
      if (imagePreview instanceof File) formData.append("image", imagePreview);

      await axios.post("http://localhost:5000/api/drivers", formData);
      setShowAddModal(false);
      setNewDriver({ name: "", phoneNumber: "", busNumber: "", experienceYears: "", assignedRoute: "", image: null });
      setImagePreview("");
      fetchDrivers();
    } catch (err) {
      console.error("Add failed", err);
    }
  };

  const resetForm = () => {
    setShowAddModal(false);
    setImagePreview("");
    setNewDriver({ name: "", phoneNumber: "", busNumber: "", experienceYears: "", assignedRoute: "", image: null });
  };

  const handleImageChange = (e, isEdit = false) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagePreview(file);
    if (isEdit) setEditingDriver({ ...editingDriver, image: file });
    else setNewDriver({ ...newDriver, image: file });
  };

  const filteredDrivers = (showDeleted ? deletedDrivers : drivers).filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.phoneNumber.includes(searchTerm) ||
    driver.busNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.heading} >Drivers List</h1>
      <div className={styles.headingLine}></div>

      <input
        type="text"
        placeholder="Search by name, phone, or bus number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />

      <div className={styles.toggleContainer}>
        <button
          className={`${styles.toggleBtn} ${!showDeleted ? styles.activeToggle : ''}`}
          onClick={() => setShowDeleted(false)}>Active Drivers </button>
        <button
          className={`${styles.toggleBtn} ${showDeleted ? styles.activeToggle : ''}`}
          onClick={() => setShowDeleted(true)}
        >
          Deleted Drivers ({deletedDrivers.length})
        </button>
      </div>

      <div className={styles.grid}>
        {filteredDrivers.map((driver) => (
          <DriverCard
            key={driver._id}
            driver={{ ...driver, img: driver.image?.startsWith("http") ? driver.image : `http://localhost:5000${driver.image}` }}
            showDeleted={showDeleted}
            onDelete={() => handleDelete(driver._id)}
            onRestore={() => handleRestore(driver._id)}
            onEdit={() => openEditModal(driver)}
          />
        ))}

        {!showDeleted && (
          <div className={styles.card} onClick={() => setShowAddModal(true)}>
            <div className={styles.plusCard}>➕</div>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className={styles.modalOverlay} onClick={resetForm}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h3>Add New Driver</h3>
            {imagePreview && <div className={styles.imagePreview}><img src={URL.createObjectURL(imagePreview)} alt="Preview" /></div>}
            <input type="text" placeholder="Name" value={newDriver.name} onChange={e => setNewDriver({ ...newDriver, name: e.target.value })} />
            <input type="tel" placeholder="Phone" value={newDriver.phoneNumber} onChange={e => setNewDriver({ ...newDriver, phoneNumber: e.target.value })} />
            <input type="text" placeholder="Bus No" value={newDriver.busNumber} onChange={e => setNewDriver({ ...newDriver, busNumber: e.target.value })} />
            <input type="number" placeholder="Experience (years)" value={newDriver.experienceYears} onChange={e => setNewDriver({ ...newDriver, experienceYears: e.target.value })} />
            <input type="text" placeholder="Assigned Route" value={newDriver.assignedRoute} onChange={e => setNewDriver({ ...newDriver, assignedRoute: e.target.value })} />
            <input type="file" accept="image/*" onChange={(e) => handleImageChange(e)} />
            <div className={styles.modalActions}>
              <button onClick={handleAddDriver}>Save</button>
              <button onClick={resetForm}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className={styles.modalOverlay} onClick={resetEditForm}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h3>Edit Driver</h3>
            {imagePreview && <div className={styles.imagePreview}><img src={imagePreview instanceof File ? URL.createObjectURL(imagePreview) : imagePreview} alt="Preview" /></div>}
            <input type="text" placeholder="Name" value={editingDriver?.name || ''} onChange={e => setEditingDriver({ ...editingDriver, name: e.target.value })} />
            <input type="tel" placeholder="Phone" value={editingDriver?.phoneNumber || ''} onChange={e => setEditingDriver({ ...editingDriver, phoneNumber: e.target.value })} />
            <input type="text" placeholder="Bus No" value={editingDriver?.busNumber || ''} onChange={e => setEditingDriver({ ...editingDriver, busNumber: e.target.value })} />
            <input type="number" placeholder="Experience (years)" value={editingDriver?.experienceYears || ''} onChange={e => setEditingDriver({ ...editingDriver, experienceYears: e.target.value })} />
            <input type="text" placeholder="Assigned Route" value={editingDriver?.assignedRoute || ''} onChange={e => setEditingDriver({ ...editingDriver, assignedRoute: e.target.value })} />
            <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, true)} />
            <div className={styles.modalActions}>
              <button onClick={handleEditSave}>Update</button>
              <button onClick={resetEditForm}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Drivers;
